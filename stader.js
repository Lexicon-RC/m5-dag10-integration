// Städerna vi kan visa väder för. Färdig. Ändra inte.
export const STADER = {
  stockholm: { namn: "Stockholm", lat: 59.33, lon: 18.07 },
  goteborg: { namn: "Göteborg", lat: 57.71, lon: 11.97 },
  malmo: { namn: "Malmö", lat: 55.6, lon: 13.0 },
  kiruna: { namn: "Kiruna", lat: 67.86, lon: 20.23 },
};

export function hittaStad(nyckel) {
  const stad = STADER[nyckel];
  if (!stad) {
    throw new Error(`Okänd stad: ${nyckel}`);
  }
  return stad;
}
