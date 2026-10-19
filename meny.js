// Dag 3: FACIT.
import { formateraPris } from "./pris.js";

export function vegetariskaRatter(meny) {
  return meny.filter(ratt => ratt.vegetarisk === true);
}

export function rattNamn(meny) {
  return meny.map(ratt => ratt.namn);
}

export function prislista(meny) {
  return meny.map(ratt => `${ratt.namn} – ${formateraPris(ratt.pris)}`);
}

export function hittaRatt(meny, id) {
  return meny.find(ratt => ratt.id === id);
}

export function billigast(meny) {
  if (meny.length === 0) {
    return undefined;
  }
  return meny.reduce((billigaste, ratt) => (ratt.pris < billigaste.pris ? ratt : billigaste));
}

export function sorteraEfterPris(meny) {
  return [...meny].sort((a, b) => a.pris - b.pris);
}

export function totalPris(order, meny) {
  return order.reduce((summa, rad) => {
    const ratt = hittaRatt(meny, rad.id);
    const pris = ratt ? ratt.pris : 0;
    return summa + pris * rad.antal;
  }, 0);
}

export function perKategori(meny) {
  return meny.reduce((antal, ratt) => {
    antal[ratt.kategori] = (antal[ratt.kategori] || 0) + 1;
    return antal;
  }, {});
}

export function medNyttPris(ratt, nyttPris) {
  return { ...ratt, pris: nyttPris };
}
