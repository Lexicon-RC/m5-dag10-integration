// Städerna vi kan visa väder för. Färdig. Ändra inte.
import type { Stad } from "./typer";

export const STADER: Record<string, Stad> = {
  stockholm: { namn: "Stockholm", lat: 59.33, lon: 18.07 },
  goteborg: { namn: "Göteborg", lat: 57.71, lon: 11.97 },
  malmo: { namn: "Malmö", lat: 55.6, lon: 13.0 },
  kiruna: { namn: "Kiruna", lat: 67.86, lon: 20.23 },
};

export function hittaStad(nyckel: string): Stad {
  const stad = STADER[nyckel];
  if (!stad) {
    throw new Error(`Okänd stad: ${nyckel}`);
  }
  return stad;
}
