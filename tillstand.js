// Tillståndsmaskinen från dag 7. Färdig. Ändra inte.
// laddaMeny: för listor (klar, tomt, fel). laddaData: för ett enskilt svar (klar, fel).
export async function laddaMeny(hamtaFn, vidTillstand) {
  vidTillstand({ typ: "laddar" });
  try {
    const ratter = await hamtaFn();
    if (ratter.length === 0) {
      vidTillstand({ typ: "tomt" });
      return;
    }
    vidTillstand({ typ: "klar", ratter });
  } catch (fel) {
    vidTillstand({ typ: "fel", meddelande: fel.message });
  }
}

export async function laddaData(hamtaFn, vidTillstand) {
  vidTillstand({ typ: "laddar" });
  try {
    const data = await hamtaFn();
    vidTillstand({ typ: "klar", data });
  } catch (fel) {
    vidTillstand({ typ: "fel", meddelande: fel.message });
  }
}
