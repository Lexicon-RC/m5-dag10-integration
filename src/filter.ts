// Dag 5: FACIT.
import type { Ratt, Filter } from "./typer";
// filter är "alla", "vegetarisk" eller en kategori ("bakverk", "dryck", "lunch").
export function filtreraMeny(meny: Ratt[], filter: Filter): Ratt[] {
  if (filter === "alla") {
    return meny;
  }
  if (filter === "vegetarisk") {
    return meny.filter((ratt) => ratt.vegetarisk === true);
  }
  return meny.filter((ratt) => ratt.kategori === filter);
}
