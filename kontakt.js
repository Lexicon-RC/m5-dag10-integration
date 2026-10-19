// Dag 5: FACIT.
import { valideraNamn, valideraEpost, valideraTelefon, valideraDatum, valideraAntal, valideraFormular, dagensDatum } from "./validering.js";

const form = document.querySelector("#bokningsform");
const bekraftelse = document.querySelector("#bekraftelse");

const regler = {
  namn: valideraNamn,
  epost: valideraEpost,
  telefon: valideraTelefon,
  datum: (text) => valideraDatum(text, dagensDatum()),
  antal: valideraAntal,
};

function visaFel(falt, meddelande) {
  const felId = `${falt.name}-fel`;
  let fel = document.getElementById(felId);
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
  const falt = form.elements[namn];
  falt.addEventListener("blur", () => visaFel(falt, regel(falt.value)));
  falt.addEventListener("input", () => {
    if (falt.getAttribute("aria-invalid") === "true") {
      visaFel(falt, regel(falt.value));
    }
  });
}

form.addEventListener("submit", (handelse) => {
  handelse.preventDefault();
  const varden = Object.fromEntries(new FormData(form));
  const fel = valideraFormular(varden, dagensDatum());
  const felNamn = Object.keys(fel);
  if (felNamn.length > 0) {
    for (const namn of Object.keys(regler)) {
      visaFel(form.elements[namn], fel[namn] || "");
    }
    form.elements[felNamn[0]].focus();
    bekraftelse.textContent = "";
    return;
  }
  bekraftelse.textContent = "Tack! Vi bekräftar din bokning inom ett dygn.";
  form.reset();
});
