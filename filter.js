// Dag 5: FACIT.
// filter är "alla", "vegetarisk" eller en kategori ("bakverk", "dryck", "lunch").
export function filtreraMeny(meny, filter) {
  if (filter === "alla") {
    return meny;
  }
  if (filter === "vegetarisk") {
    return meny.filter((ratt) => ratt.vegetarisk === true);
  }
  return meny.filter((ratt) => ratt.kategori === filter);
}
