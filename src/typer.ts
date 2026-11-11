// Typerna för kaféets meny. Ändra INTE den här filen.
// En "interface" beskriver hur ett objekt ser ut: vilka egenskaper det har och vilken typ varje egenskap har.

// En union av exakta texter: bara dessa tre värden är tillåtna.
export type Kategori = "bakverk" | "dryck" | "lunch";

// Hur rätten serveras. Används för att rekommendera efter väder.
export type Servering = "varm" | "kall" | "rumstemp";

export interface Ratt {
  id: number;
  namn: string;
  pris: number;
  kategori: Kategori;
  vegetarisk: boolean;
  bild?: string;          // frågetecknet betyder att egenskapen är valfri
  beskrivning?: string;
  servering?: Servering;  // varm, kall eller rumstemp
}

// En rad i en order: vilken rätt (id) och hur många.
export interface OrderRad {
  id: number;
  antal: number;
}

// Filtret på menyn: alla rätter, bara vegetariska, eller en kategori.
export type Filter = "alla" | "vegetarisk" | Kategori;

// Tillståndet för en laddning av en lista (menyn). "typ" avgör vilka övriga egenskaper som finns.
export type KlarMeny = { typ: "klar"; ratter: Ratt[] };
export type Tillstand =
  | { typ: "laddar" }
  | { typ: "tomt" }
  | KlarMeny
  | { typ: "fel"; meddelande: string };

// Tillståndet för ett enskilt svar (vädret). T är typen på datan.
export type DataTillstand<T> =
  | { typ: "laddar" }
  | { typ: "klar"; data: T }
  | { typ: "fel"; meddelande: string };

// Det vi använder av ett svar från fetch. Testerna skickar in en falsk version.
export type FetchFn = (url: string) => Promise<Pick<Response, "ok" | "status" | "json">>;

export interface Vader {
  temperatur: number;
  vindhastighet: number;
  kod: number;
}

export interface Stad {
  namn: string;
  lat: number;
  lon: number;
}

// Rubriken som visas och de rätter som rekommenderas.
export interface Rekommendation {
  rubrik: string;
  ratter: Ratt[];
}
