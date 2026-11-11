// Funktionen från igår, nu som modul. Den exporteras så att andra filer kan importera den.
export function formateraPris(pris: number): string {
  if (Number.isInteger(pris)) {
    return `${pris} kr`;
  }
  return `${pris.toFixed(2).replace(".", ",")} kr`;
}
