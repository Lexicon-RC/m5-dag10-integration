// Dag 10: en ren funktion som väljer vad kaféet ska rekommendera utifrån vädret.
// Ren betyder: samma indata ger alltid samma utdata, och den rör varken DOM eller nätet.
// Därför är den enkel att testa.
//
// rekommendera(vader, meny) returnerar { rubrik, ratter }
//   vader  = { temperatur, vindhastighet, kod }
//   meny   = lista av rätter (varje rätt har kategori och servering: "varm", "kall" eller "rumstemp")
//
// Reglerna (i den här ordningen):
//   1. Saknas vader (null eller undefined): kasta new Error("Väder saknas").
//   2. temperatur < 10:  rubrik "Kyligt ute: något varmt i koppen?",
//                        ratter = alla rätter med kategori "dryck" och servering "varm".
//   3. temperatur >= 20: rubrik "Varmt ute: något kallt?",
//                        ratter = alla rätter med kategori "dryck" och servering "kall".
//   4. annars:           rubrik "Skönt väder: ett bakverk till fikat?",
//                        ratter = alla rätter med kategori "bakverk".
//   5. Är det nederbörd (kod >= 51): lägg till ALLA rätter med kategori "lunch" och servering "varm"
//      sist i ratter, och lägg till " Det är dåligt väder ute, så en varm lunch passar också." sist i rubriken.
//   Ordningen i ratter ska vara samma som i menyn. Är menyn tom blir ratter en tom lista (inget fel).
export function rekommendera(vader, meny) {
  // TODO
}
