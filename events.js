// Dag 5: FACIT.
export function kopplaFilter(grupp, vidVal) {
  grupp.addEventListener("click", (handelse) => {
    const knapp = handelse.target.closest("button[data-filter]");
    if (!knapp) {
      return;
    }
    for (const k of grupp.querySelectorAll("button[data-filter]")) {
      k.setAttribute("aria-pressed", String(k === knapp));
    }
    vidVal(knapp.dataset.filter);
  });
}

export function kopplaLaggTill(container, vidLaggTill) {
  container.addEventListener("click", (handelse) => {
    const knapp = handelse.target.closest("button.lagg-i-order");
    if (!knapp) {
      return;
    }
    vidLaggTill(Number(knapp.dataset.id));
  });
}
