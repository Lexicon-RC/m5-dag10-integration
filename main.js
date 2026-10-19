// Dag 10: koppla ihop allt: stad -> väder -> rekommendation -> markering på menyn.
// Du har färdiga delar från dag 5–9. Läs hela filen först. Gör TODO 1–4 i ordning och testa i webbläsaren.
import { visaMeny, uppdateraRubrik, markeraDagensRatt, visaOrder } from "./ui.js";
import { billigast } from "./meny.js";
import { filtreraMeny } from "./filter.js";
import { kopplaFilter, kopplaLaggTill } from "./events.js";
import { laggTillIOrder, rensaOrder } from "./order.js";
import { hamtaMeny, hamtaVader } from "./api.js";
import { laddaMeny, laddaData } from "./tillstand.js";
import { visaTillstand, visaVader } from "./tillstand-ui.js";
import { hittaStad } from "./stader.js";
import { rekommendera } from "./rekommendera.js";
import { markeraRekommenderade, visaRekommendation } from "./rek-ui.js";
import { senasteVinner } from "./senaste.js";

// Sätt till true om väder-API:et inte fungerar (till exempel på skolans nät).
const ANVAND_RESERVDATA = false;

const lista = document.querySelector("#meny-lista");
const rubrik = document.querySelector("#meny-rubrik");
const filterGrupp = document.querySelector("#filter");
const vaderForm = document.querySelector("#vader-form");
const stadVal = document.querySelector("#stad");
const vaderKnapp = vaderForm.querySelector("button[type=submit]");
const vaderResultat = document.querySelector("#vader-resultat");

let meny = [];
let aktivtFilter = "alla";
let aktuellRekommendation = null; // { rubrik, ratter } eller null

// ---- Menyn ----
function ritaMeny() {
  const ratter = filtreraMeny(meny, aktivtFilter);
  visaMeny(lista, ratter);
  uppdateraRubrik(rubrik, ratter.length);
  const lunch = ratter.filter((ratt) => ratt.kategori === "lunch");
  if (lunch.length > 0) {
    markeraDagensRatt(lista, billigast(lunch).id);
  }
  // Rekommendationen ska överleva att menyn ritas om (filter, ny hämtning).
  if (aktuellRekommendation) {
    markeraRekommenderade(lista, aktuellRekommendation.ratter.map((r) => r.id));
  }
}

function laddaMenyn() {
  laddaMeny(() => hamtaMeny(), (tillstand) => {
    visaTillstand(lista, tillstand, {
      vidForsokIgen: laddaMenyn,
      visaKlar: (container, t) => {
        meny = t.ratter;
        ritaMeny();
        visaOrder(orderRef, order, meny);
        // Kom vädret före menyn? Räkna om rekommendationen nu när menyn finns.
        if (senastVader) {
          tillampaRekommendation(senastVader);
        }
      },
    });
  });
}

kopplaFilter(filterGrupp, (filter) => {
  aktivtFilter = filter;
  if (meny.length > 0) {
    ritaMeny();
  }
});

// ---- Beställningen ----
let order = [];
const orderRef = {
  lista: document.querySelector("#order-lista"),
  summa: document.querySelector("#order-summa"),
  tom: document.querySelector("#order-tom"),
};
kopplaLaggTill(lista, (id) => {
  order = laggTillIOrder(order, id);
  visaOrder(orderRef, order, meny);
});
document.querySelector("#rensa-order").addEventListener("click", () => {
  order = rensaOrder();
  visaOrder(orderRef, order, meny);
});

// ---- Vädret och rekommendationen ----
const vaderFetch = ANVAND_RESERVDATA ? () => fetch("data/vader-stockholm.json") : fetch;
// TODO 1: senasteVinner finns i senaste.js. Skriv den klart så att den här raden fungerar.
const hamtaVaderSenaste = senasteVinner((stad) => hamtaVader(stad.lat, stad.lon, vaderFetch));
let senastVader = null;

// TODO 2: Skriv tillampaRekommendation(vader).
//   - Räkna ut rekommendationen: aktuellRekommendation = rekommendera(vader, meny).
//   - Visa texten med visaRekommendation(vaderResultat, aktuellRekommendation.rubrik).
//   - Markera korten med markeraRekommenderade(lista, <id:n för rekommenderade rätter>).
function tillampaRekommendation(vader) {
}

// TODO 3: Skriv laddaVader. Hämta staden med hittaStad(stadVal.value). Visa tillstånd "laddar" (och stäng av
//   knappen, vaderKnapp.disabled). Anropa hamtaVaderSenaste(stad) i try/catch.
//   - Är svaret gammalt (svar.gammal): gör ingenting, ett nyare anrop är på väg.
//   - Annars: visa "klar". Spara vädret i senastVader, visa det med visaVader(container, stad.namn, vader)
//     och anropa tillampaRekommendation(vader).
//   - Fel: visa tillståndet "fel" med knappen Försök igen (vidForsokIgen: laddaVader).
//   Tips: titta på hur laddaMenyn gör för menyn. Skapa en liten hjälpfunktion tillstand(t) som anropar visaTillstand.
async function laddaVader() {
}
vaderForm.addEventListener("submit", (handelse) => {
  handelse.preventDefault();
  laddaVader();
});
// Byter användaren stad hämtas vädret direkt. Då kan två anrop vara på väg samtidigt.
// TODO 4: byter användaren stad hämtas vädret direkt. Lyssna på "change" på stadVal och anropa laddaVader.

// ---- Start ----
visaOrder(orderRef, order, meny);
laddaMenyn();
laddaVader();
