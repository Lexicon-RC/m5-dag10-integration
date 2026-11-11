// Dag 8: FACIT.
import type { Ratt, Vader, FetchFn } from "./typer";

// Det vi använder ur väder-API:ets svar. Fler fält finns, men vi beskriver bara det vi läser.
interface VaderSvar {
  current?: { temperature_2m: number; weather_code: number; wind_speed_10m: number };
}

export async function hamtaJson(url: string, fetchFn: FetchFn = fetch): Promise<unknown> {
  let svar: Awaited<ReturnType<FetchFn>>;
  try {
    svar = await fetchFn(url);
  } catch (fel) {
    throw new Error("Kunde inte nå servern. Kontrollera din anslutning.");
  }
  if (!svar.ok) {
    throw new Error(`Servern svarade ${svar.status}`);
  }
  return await svar.json();
}

export async function hamtaMeny(fetchFn: FetchFn = fetch): Promise<Ratt[]> {
  const data = await hamtaJson("data/meny.json", fetchFn);
  if (!Array.isArray(data)) {
    throw new Error("Menyn hade ett oväntat format");
  }
  return data;
}

export async function hamtaVader(lat: number, lon: number, fetchFn: FetchFn = fetch): Promise<Vader> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;
  const data = (await hamtaJson(url, fetchFn)) as VaderSvar;
  if (!data.current) {
    throw new Error("Oväntat svar från väder-API:et");
  }
  return {
    temperatur: data.current.temperature_2m,
    vindhastighet: data.current.wind_speed_10m,
    kod: data.current.weather_code,
  };
}

export function tolkaVaderkod(kod: number): string {
  if (kod === 0) return "klart";
  if (kod >= 1 && kod <= 3) return "mest klart eller molnigt";
  if (kod === 45 || kod === 48) return "dimma";
  if (kod >= 51 && kod <= 57) return "duggregn";
  if (kod >= 61 && kod <= 67) return "regn";
  if (kod >= 71 && kod <= 77) return "snö";
  if (kod >= 80 && kod <= 82) return "regnskurar";
  if (kod === 85 || kod === 86) return "snöbyar";
  if (kod >= 95 && kod <= 99) return "åska";
  return "okänt väder";
}
