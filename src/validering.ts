// Dag 5: FACIT.
export function valideraNamn(text: string): string {
  const namn = text.trim();
  if (namn === "") {
    return "Fyll i ditt namn.";
  }
  if (namn.length < 2) {
    return "Namnet måste vara minst 2 tecken.";
  }
  return "";
}

export function valideraEpost(text: string): string {
  const epost = text.trim();
  if (epost === "") {
    return "Fyll i din e-postadress.";
  }
  if (!epost.includes("@")) {
    return "E-postadressen måste innehålla @.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost)) {
    return "Ange en giltig e-postadress, till exempel namn@exempel.se.";
  }
  return "";
}

export function valideraTelefon(text: string): string {
  const tel = text.trim();
  if (tel === "") {
    return "";
  }
  if (!/^[0-9 +-]+$/.test(tel)) {
    return "Telefonnumret får bara innehålla siffror, mellanslag, plus och bindestreck.";
  }
  const siffror = tel.replace(/[^0-9]/g, "");
  if (siffror.length < 7) {
    return "Telefonnumret är för kort.";
  }
  return "";
}

export function valideraDatum(text: string, idag: string): string {
  if (text === "") {
    return "Välj ett datum.";
  }
  if (text < idag) {
    return "Datumet kan inte vara i det förflutna.";
  }
  return "";
}

export function valideraAntal(text: string): string {
  if (text === "") {
    return "Välj antal personer.";
  }
  return "";
}

export function dagensDatum(): string {
  return new Date().toLocaleDateString("sv-SE");
}

export function valideraFormular(varden: Record<string, string>, idag: string): Record<string, string> {
  const fel: Record<string, string> = {};
  const kontroller = {
    namn: valideraNamn(varden.namn),
    epost: valideraEpost(varden.epost),
    telefon: valideraTelefon(varden.telefon),
    datum: valideraDatum(varden.datum, idag),
    antal: valideraAntal(varden.antal),
  };
  for (const [falt, meddelande] of Object.entries(kontroller)) {
    if (meddelande !== "") {
      fel[falt] = meddelande;
    }
  }
  return fel;
}
