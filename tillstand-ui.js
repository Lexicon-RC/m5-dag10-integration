// Dag 8: FACIT.
import { tolkaVaderkod } from "./api.js";

export function visaTillstand(container, tillstand, alternativ) {
  container.replaceChildren();
  if (tillstand.typ === "laddar") {
    const p = document.createElement("p");
    p.className = "laddar";
    p.setAttribute("role", "status");
    p.textContent = "Laddar...";
    container.append(p);
  } else if (tillstand.typ === "tomt") {
    const p = document.createElement("p");
    p.className = "tom";
    p.textContent = "Inga rätter hittades.";
    container.append(p);
  } else if (tillstand.typ === "fel") {
    const ruta = document.createElement("div");
    ruta.className = "fel";
    ruta.setAttribute("role", "alert");
    const p = document.createElement("p");
    p.textContent = `Något gick fel: ${tillstand.meddelande}`;
    const knapp = document.createElement("button");
    knapp.type = "button";
    knapp.className = "forsok-igen";
    knapp.textContent = "Försök igen";
    knapp.addEventListener("click", () => alternativ.vidForsokIgen());
    ruta.append(p, knapp);
    container.append(ruta);
  } else if (tillstand.typ === "klar") {
    alternativ.visaKlar(container, tillstand);
  }
}

export function visaVader(container, stad, vader) {
  container.replaceChildren();
  const p = document.createElement("p");
  p.className = "vader-rad";
  p.textContent = `${stad}: ${vader.temperatur} °C, ${tolkaVaderkod(vader.kod)}, vind ${vader.vindhastighet} km/h`;
  container.append(p);
}
