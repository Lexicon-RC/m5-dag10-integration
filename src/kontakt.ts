// Dag 5: FACIT.
import { valideraNamn, valideraEpost, valideraTelefon, valideraDatum, valideraAntal, valideraFormular, dagensDatum } from "./validering";

import { hamta } from "./dom";

type Falt = HTMLInputElement | HTMLSelectElement;

const form = hamta<HTMLFormElement>("#bokningsform");
const bekraftelse = hamta("#bekraftelse");

// elements.namedItem ger Element | RadioNodeList | null. Vi kollar att det är ett fält vi känner igen.
function hittaFalt(namn: string): Falt {
  const falt = form.elements.namedItem(namn);
  if (falt instanceof HTMLInputElement || falt instanceof HTMLSelectElement) {
    return falt;
  }
  throw new Error(`Fältet ${namn} saknas i formuläret`);
}

const regler: Record<string, (text: string) => string> = {
  namn: valideraNamn,
  epost: valideraEpost,
  telefon: valideraTelefon,
  datum: (text: string) => valideraDatum(text, dagensDatum()),
  antal: valideraAntal,
};

function visaFel(falt: Falt, meddelande: string): void {
  const felId = `${falt.name}-fel`;
  let fel: HTMLElement | null = document.getElementById(felId);
  if (!fel) {
    fel = document.createElement("p");
    fel.className = "falt-fel";
    fel.id = felId;
    falt.insertAdjacentElement("afterend", fel);
  }
  fel.textContent = meddelande;
  if (meddelande === "") {
    falt.removeAttribute("aria-invalid");
    falt.removeAttribute("aria-describedby");
  } else {
    falt.setAttribute("aria-invalid", "true");
    falt.setAttribute("aria-describedby", felId);
  }
}

for (const [namn, regel] of Object.entries(regler)) {
  const falt = hittaFalt(namn);
  falt.addEventListener("blur", () => visaFel(falt, regel(falt.value)));
  falt.addEventListener("input", () => {
    if (falt.getAttribute("aria-invalid") === "true") {
      visaFel(falt, regel(falt.value));
    }
  });
}

form.addEventListener("submit", (handelse) => {
  handelse.preventDefault();
  const varden: Record<string, string> = {};
  for (const [nyckel, varde] of new FormData(form)) {
    if (typeof varde === "string") {
      varden[nyckel] = varde;
    }
  }
  const fel = valideraFormular(varden, dagensDatum());
  const felNamn = Object.keys(fel);
  if (felNamn.length > 0) {
    for (const namn of Object.keys(regler)) {
      visaFel(hittaFalt(namn), fel[namn] ?? "");
    }
    hittaFalt(felNamn[0]).focus();
    bekraftelse.textContent = "";
    return;
  }
  bekraftelse.textContent = "Tack! Vi bekräftar din bokning inom ett dygn.";
  form.reset();
});
