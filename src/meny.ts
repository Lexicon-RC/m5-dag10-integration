// Dag 3: FACIT.
import { formateraPris } from "./pris";
import type { Ratt, OrderRad } from "./typer";

export function vegetariskaRatter(meny: Ratt[]): Ratt[] {
  return meny.filter(ratt => ratt.vegetarisk === true);
}

export function rattNamn(meny: Ratt[]): string[] {
  return meny.map(ratt => ratt.namn);
}

export function prislista(meny: Ratt[]): string[] {
  return meny.map(ratt => `${ratt.namn} – ${formateraPris(ratt.pris)}`);
}

export function hittaRatt(meny: Ratt[], id: number): Ratt | undefined {
  return meny.find(ratt => ratt.id === id);
}

export function billigast(meny: Ratt[]): Ratt | undefined {
  if (meny.length === 0) {
    return undefined;
  }
  return meny.reduce((billigaste, ratt) => (ratt.pris < billigaste.pris ? ratt : billigaste));
}

export function sorteraEfterPris(meny: Ratt[]): Ratt[] {
  return [...meny].sort((a, b) => a.pris - b.pris);
}

export function totalPris(order: OrderRad[], meny: Ratt[]): number {
  return order.reduce((summa, rad) => {
    const ratt = hittaRatt(meny, rad.id);
    const pris = ratt ? ratt.pris : 0;
    return summa + pris * rad.antal;
  }, 0);
}

export function perKategori(meny: Ratt[]): Record<string, number> {
  return meny.reduce((antal, ratt) => {
    antal[ratt.kategori] = (antal[ratt.kategori] ?? 0) + 1;
    return antal;
  }, {} as Record<string, number>);
}

export function medNyttPris(ratt: Ratt, nyttPris: number): Ratt {
  return { ...ratt, pris: nyttPris };
}
