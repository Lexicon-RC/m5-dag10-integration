// Dag 5: FACIT.
import type { Filter } from "./typer";
export function kopplaFilter(grupp: HTMLElement, vidVal: (filter: Filter) => void): void {
  grupp.addEventListener("click", (handelse) => {
    // target kan vara vad som helst som klickades. Vi kollar att det är ett element.
    if (!(handelse.target instanceof HTMLElement)) {
      return;
    }
    const knapp = handelse.target.closest<HTMLButtonElement>("button[data-filter]");
    if (!knapp) {
      return;
    }
    for (const k of grupp.querySelectorAll("button[data-filter]")) {
      k.setAttribute("aria-pressed", String(k === knapp));
    }
    // dataset.filter är string | undefined. Vi vet att knapparna har ett giltigt filter, så vi säger det med "as".
    vidVal(knapp.dataset.filter as Filter);
  });
}

export function kopplaLaggTill(container: HTMLElement, vidLaggTill: (id: number) => void): void {
  container.addEventListener("click", (handelse) => {
    if (!(handelse.target instanceof HTMLElement)) {
      return;
    }
    const knapp = handelse.target.closest<HTMLButtonElement>("button.lagg-i-order");
    if (!knapp) {
      return;
    }
    vidLaggTill(Number(knapp.dataset.id));
  });
}
