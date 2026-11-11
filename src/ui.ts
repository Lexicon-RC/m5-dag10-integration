// Dag 4–5: FACIT.
import { formateraPris } from "./pris";
import type { Ratt, OrderRad } from "./typer";

// De tre elementen som visar beställningen.
export interface OrderRef {
  lista: HTMLElement;
  summa: HTMLElement;
  tom: HTMLElement;
}
import { hittaRatt, totalPris } from "./meny";

export function skapaRattKort(ratt: Ratt): HTMLElement {
  const kort = document.createElement("article");
  kort.dataset.id = String(ratt.id);

  const bild = document.createElement("img");
  bild.src = ratt.bild ?? "";
  bild.alt = `Illustration av ${ratt.namn.toLowerCase()}`;

  const rubrik = document.createElement("h3");
  rubrik.textContent = ratt.namn;

  const text = document.createElement("p");
  text.textContent = ratt.beskrivning ?? "";

  const pris = document.createElement("p");
  pris.className = "pris";
  pris.textContent = formateraPris(ratt.pris);

  const knapp = document.createElement("button");
  knapp.type = "button";
  knapp.className = "lagg-i-order";
  knapp.dataset.id = String(ratt.id);
  knapp.textContent = "Lägg i beställning";
  knapp.setAttribute("aria-label", `Lägg ${ratt.namn} i beställningen`);

  kort.append(bild, rubrik, text, pris, knapp);
  return kort;
}

export function visaMeny(container: HTMLElement, ratter: Ratt[]): void {
  container.replaceChildren();
  if (ratter.length === 0) {
    const tom = document.createElement("p");
    tom.className = "tom";
    tom.textContent = "Inga rätter hittades.";
    container.append(tom);
    return;
  }
  for (const ratt of ratter) {
    container.append(skapaRattKort(ratt));
  }
}

export function uppdateraRubrik(element: HTMLElement, antal: number): void {
  const ord = antal === 1 ? "rätt" : "rätter";
  element.textContent = `Meny (${antal} ${ord})`;
}

export function markeraDagensRatt(container: HTMLElement, id: number): void {
  for (const kort of container.querySelectorAll<HTMLElement>("article")) {
    kort.classList.toggle("dagens", kort.dataset.id === String(id));
  }
}

// ref = { lista, summa, tom } är tre element. order är [{ id, antal }].
export function visaOrder(ref: OrderRef, order: OrderRad[], meny: Ratt[]): void {
  ref.lista.replaceChildren();
  ref.tom.classList.toggle("dold", order.length > 0);
  for (const rad of order) {
    const ratt = hittaRatt(meny, rad.id);
    if (!ratt) {
      continue;
    }
    const li = document.createElement("li");
    const namn = document.createElement("span");
    namn.textContent = `${rad.antal} × ${ratt.namn}`;
    const pris = document.createElement("span");
    pris.textContent = formateraPris(ratt.pris * rad.antal);
    li.append(namn, pris);
    ref.lista.append(li);
  }
  ref.summa.textContent = formateraPris(totalPris(order, meny));
}
