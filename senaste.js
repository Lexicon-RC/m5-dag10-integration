// Dag 10: hantera att svar kan komma i fel ordning (race condition).
//
// Problem: användaren väljer Stockholm och sedan snabbt Kiruna. Svaret för Stockholm råkar komma
// SIST och skriver över Kiruna. Sidan visar fel stad.
//
// senasteVinner(fn) tar en async funktion och returnerar en ny async funktion som anropar fn med
// samma argument. Varje anrop får ett löpnummer. När svaret kommer ska den kolla om det
// fortfarande är det senaste anropet.
//   Svaret kom för det SENASTE anropet:  returnera { gammal: false, data }
//   Ett nyare anrop har startat sedan:   returnera { gammal: true }   (utan data)
//   fn kastar ett fel och anropet är det senaste: kasta felet vidare.
//   fn kastar ett fel och anropet är gammalt:     returnera { gammal: true } (felet spelar ingen roll längre)
// Tips: en variabel utanför den returnerade funktionen som räknar upp vid varje anrop.
export function senasteVinner(fn) {
  // TODO
}
