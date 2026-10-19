// Tester för dag 10. Ändra inte den här filen.
import { test, testAsync, assertEqual, assertTrue, assertThrows, visaResultat } from "./testlib.js";
const vanta = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
import { rekommendera } from "./rekommendera.js";
import { senasteVinner } from "./senaste.js";
import { markeraRekommenderade, visaRekommendation } from "./rek-ui.js";
import { hittaStad } from "./stader.js";

const meny = [
  { id: 1, namn: "Bulle", kategori: "bakverk", servering: "rumstemp" },
  { id: 2, namn: "Kaffe", kategori: "dryck", servering: "varm" },
  { id: 3, namn: "Macka", kategori: "lunch", servering: "rumstemp" },
  { id: 4, namn: "Latte", kategori: "dryck", servering: "varm" },
  { id: 5, namn: "Iskaffe", kategori: "dryck", servering: "kall" },
  { id: 6, namn: "Quiche", kategori: "lunch", servering: "varm" },
  { id: 7, namn: "Kanelbulle", kategori: "bakverk", servering: "rumstemp" },
];
const ids = (r) => r.ratter.map((x) => x.id);

// ---- rekommendera ----
test("rekommendera: kallt ger varma drycker", () => {
  const r = rekommendera({ temperatur: 3, vindhastighet: 5, kod: 1 }, meny);
  assertEqual(r.rubrik, "Kyligt ute: något varmt i koppen?");
  assertEqual(ids(r), [2, 4]);
});
test("rekommendera: varmt ger kalla drycker", () => {
  const r = rekommendera({ temperatur: 24, vindhastighet: 5, kod: 0 }, meny);
  assertEqual(r.rubrik, "Varmt ute: något kallt?");
  assertEqual(ids(r), [5]);
});
test("rekommendera: lagom väder ger bakverk", () => {
  const r = rekommendera({ temperatur: 15, vindhastighet: 5, kod: 2 }, meny);
  assertEqual(r.rubrik, "Skönt väder: ett bakverk till fikat?");
  assertEqual(ids(r), [1, 7]);
});
test("rekommendera: gränsen 10 grader räknas som lagom", () => {
  assertEqual(ids(rekommendera({ temperatur: 10, vindhastighet: 0, kod: 0 }, meny)), [1, 7]);
});
test("rekommendera: gränsen 9.9 grader räknas som kallt", () => {
  assertEqual(ids(rekommendera({ temperatur: 9.9, vindhastighet: 0, kod: 0 }, meny)), [2, 4]);
});
test("rekommendera: gränsen 20 grader räknas som varmt", () => {
  assertEqual(ids(rekommendera({ temperatur: 20, vindhastighet: 0, kod: 0 }, meny)), [5]);
});
test("rekommendera: nederbörd lägger till varm lunch och text", () => {
  const r = rekommendera({ temperatur: 5, vindhastighet: 5, kod: 63 }, meny);
  assertEqual(ids(r), [2, 4, 6]);
  assertEqual(r.rubrik, "Kyligt ute: något varmt i koppen? Det är dåligt väder ute, så en varm lunch passar också.");
});
test("rekommendera: kod 51 räknas som nederbörd, kod 48 (dimma) gör det inte", () => {
  assertEqual(ids(rekommendera({ temperatur: 15, vindhastighet: 0, kod: 51 }, meny)), [1, 7, 6]);
  assertEqual(ids(rekommendera({ temperatur: 15, vindhastighet: 0, kod: 48 }, meny)), [1, 7]);
});
test("rekommendera: tom meny ger tom lista, inget fel", () => {
  assertEqual(rekommendera({ temperatur: 5, vindhastighet: 0, kod: 0 }, []).ratter, []);
});
test("rekommendera: saknat väder kastar fel", () => {
  assertThrows(() => rekommendera(null, meny), "Väder saknas");
});
test("rekommendera: ändrar inte menyn", () => {
  const kopia = JSON.stringify(meny);
  rekommendera({ temperatur: 5, vindhastighet: 0, kod: 63 }, meny);
  assertEqual(JSON.stringify(meny), kopia);
});

// ---- senasteVinner ----
testAsync("senasteVinner: ett ensamt anrop är inte gammalt", async () => {
  const hamta = senasteVinner(async (x) => x * 2);
  assertEqual(await hamta(4), { gammal: false, data: 8 });
});
testAsync("senasteVinner: ett långsamt äldre anrop blir gammalt när ett nyare startats", async () => {
  const hamta = senasteVinner(async (namn, ms) => { await vanta(ms); return namn; });
  const forsta = hamta("Stockholm", 80);
  const andra = hamta("Kiruna", 10);
  assertEqual(await andra, { gammal: false, data: "Kiruna" });
  assertEqual(await forsta, { gammal: true });
});
testAsync("senasteVinner: ordningen i svaren spelar ingen roll, bara vilket anrop som var sist", async () => {
  const hamta = senasteVinner(async (namn, ms) => { await vanta(ms); return namn; });
  const forsta = hamta("A", 10);
  const andra = hamta("B", 80);
  assertEqual(await forsta, { gammal: true });
  assertEqual(await andra, { gammal: false, data: "B" });
});
testAsync("senasteVinner: fel i det senaste anropet kastas vidare", async () => {
  const hamta = senasteVinner(async () => { throw new Error("nej"); });
  let fel = null;
  try { await hamta(); } catch (e) { fel = e; }
  assertTrue(fel !== null, "förväntade ett fel");
  assertEqual(fel.message, "nej");
});
testAsync("senasteVinner: fel i ett gammalt anrop ignoreras", async () => {
  let nr = 0;
  const hamta = senasteVinner(async () => {
    nr++;
    if (nr === 1) { await vanta(30); throw new Error("gammalt fel"); }
    return "ok";
  });
  const forsta = hamta();
  const andra = hamta();
  assertEqual(await andra, { gammal: false, data: "ok" });
  assertEqual(await forsta, { gammal: true });
});

// ---- rek-ui ----
function kort() {
  const c = document.createElement("div");
  for (const id of [1, 2, 3]) {
    const a = document.createElement("article");
    a.dataset.id = String(id);
    c.append(a);
  }
  return c;
}
test("markeraRekommenderade: markerar rätt kort", () => {
  const c = kort();
  markeraRekommenderade(c, [1, 3]);
  const markerade = [...c.querySelectorAll("article.rekommenderad")].map((a) => a.dataset.id);
  assertEqual(markerade, ["1", "3"]);
});
test("markeraRekommenderade: anropas igen och ersätter förra markeringen", () => {
  const c = kort();
  markeraRekommenderade(c, [1, 3]);
  markeraRekommenderade(c, [2]);
  assertEqual([...c.querySelectorAll("article.rekommenderad")].map((a) => a.dataset.id), ["2"]);
});
test("markeraRekommenderade: tom lista tar bort alla markeringar", () => {
  const c = kort();
  markeraRekommenderade(c, [1, 2, 3]);
  markeraRekommenderade(c, []);
  assertEqual(c.querySelectorAll(".rekommenderad").length, 0);
});
test("visaRekommendation: lägger till en rad utan att tömma containern", () => {
  const c = document.createElement("div");
  c.innerHTML = "<p>Stockholm: 5 °C</p>";
  visaRekommendation(c, "Något varmt?");
  assertEqual(c.children.length, 2);
  assertEqual(c.querySelector("p.rekommendation").textContent, "Något varmt?");
});
test("visaRekommendation: aldrig två rekommendationer", () => {
  const c = document.createElement("div");
  visaRekommendation(c, "Första");
  visaRekommendation(c, "Andra");
  assertEqual(c.querySelectorAll(".rekommendation").length, 1);
  assertEqual(c.querySelector(".rekommendation").textContent, "Andra");
});
test("visaRekommendation: skriver text, inte HTML", () => {
  const c = document.createElement("div");
  visaRekommendation(c, "<b>fet</b>");
  assertEqual(c.querySelector("b"), null);
});

// ---- stader (färdig fil) ----
test("hittaStad: känd stad ger koordinater", () => {
  assertEqual(hittaStad("kiruna").namn, "Kiruna");
});
test("hittaStad: okänd stad kastar fel", () => {
  assertThrows(() => hittaStad("atlantis"), "Okänd stad: atlantis");
});

visaResultat();
