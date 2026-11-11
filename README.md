# Dag 10 · Integration: stad, väder och rekommendation

*Modul 5, UI/UX & Frontendutveckling (TypeScript), Lexicon IT-Proffs*

## Vad du ska göra idag

Du bygger en **integrationsfunktion** som kopplar ihop flera delar: användaren väljer en stad, vädret hämtas (med tre tillstånd), en ren funktion `rekommendera` räknar ut vad kaféet ska rekommendera, och rätterna markeras på menyn. Du hanterar också att svar kan komma i **fel ordning** (race condition).

## Bakgrund

Hittills har varje övning handlat om en del: ett filter, ett formulär, ett nätanrop. Det svåra i riktiga program är att få delarna att fungera tillsammans. Idag gör du det. Strategin: håll logiken ren och testbar (`rekommendera`), håll gränssnittet för sig (`src/rek-ui.ts`) och låt `src/main.ts` vara limmet. Planera först, bygg, och granska sedan.

## TypeScript idag: allt hänger ihop

- **Fler typer för samma data:** `Servering` (`"varm" | "kall" | "rumstemp"`), `Stad` och `Rekommendation` ligger i `src/typer.ts`. När en typ ändras visar TypeScript direkt vilka ställen som påverkas. Det är det största skälet till att använda det i ett växande projekt.
- **`T | null`:** `let senastVader: Vader | null = null;`. Innan du använder värdet måste du kontrollera `null`.
- **Generiska funktioner:** `senasteVinner` tar vilken async-funktion som helst och ger tillbaka en ny med samma argument. Resultatet är `{ gammal: true } | { gammal: false; data: T }`: du måste kolla `gammal` innan du läser `data`.
- **`catch (fel)` är `unknown`:** `fel instanceof Error ? fel.message : String(fel)`.
- **Race conditions upptäcks inte av typer.** TypeScript hjälper inte mot två anrop som kommer i fel ordning. Det är därför `senasteVinner` finns, och därför testerna behövs.

## Så arbetar du (samma som alltid)

1. **Forka** dagens repo på GitHub (*Fork → Create fork*).
2. **Klona din fork:** *Code → HTTPS → kopiera adressen*. I terminalen (Ctrl+ö i VS Code): `git clone <adressen>`. Öppna den nya mappen i VS Code.
3. **Installera verktygen, en gång per repo:** `npm install` i terminalen.
4. **Starta servern:** `npm run dev`. Öppna adressen den skriver ut (oftast `http://localhost:5173/`). Tryck F12 och välj fliken *Console*. Stoppa med Ctrl+C. Testsidan öppnar du på samma server: `http://localhost:5173/tests.html` (lägg till `/tests.html` efter adressen).
5. **Gör uppgiften.** Spara och kontrollera i webbläsaren och Console efter varje steg. Gör en commit efter varje avslutat steg: `git add .` och `git commit -m "Beskriv vad du gjorde"`.
6. **Kontrollera typerna:** `npm run typecheck`. Tyst betyder att alla typer stämmer. Röda understrykningar i VS Code är TypeScript som varnar.
7. **Skicka upp** när du är klar: `git push`.
8. **Lämna in i Microsoft Forms.**

Fastnar du: skriv ner exakt var och vad du försökt (och vilket felmeddelande du fick), och ta det först i nästa handledda pass. Problem med `npm` eller Node? Läs *Elevguide: Node, Vite och TypeScript*.

> Vite tar bara bort typerna och kör koden. Den kontrollerar dem inte. Sidan kan alltså köras trots röda understrykningar.

## Uppgiften steg för steg

### Steg 1. Klona, kör testerna och starta sidan

Forka repot, kör `git clone`, öppna i VS Code, starta Vite-servern på `tests.html`. Testerna från dag 8 är gröna, de nya röda. Öppna `index.html`: menyn och vädret fungerar redan (dag 8). Läs igenom `src/main.ts` och `src/stader.ts` (färdig).

### Steg 2. Skriv en plan i tre steg (innan du kodar)

Skapa `docs/plan-integration.md`. Skriv en plan i tre delar: (1) händelse: vad användaren gör, (2) hämtning: vilka anrop och i vilken ordning, (3) uppdatering: vad som ändras på sidan. Rita gärna ett litet flöde. Planen är det du håller din kod mot när du är klar.

### Steg 3. rekommendera: en ren funktion

Skriv `rekommendera(vader, meny)` i `src/rekommendera.ts`. Reglerna står i kommentaren. Gör ett villkor i taget och kör testerna. Gränsfallen (10 och 20 grader, kod 51) är de som oftast blir fel.

### Steg 4. markeraRekommenderade och visaRekommendation

Skriv de två funktionerna i `src/rek-ui.ts`. Båda ska kunna anropas om och om igen utan att duplicera något. Använd `textContent`.

### Steg 5. senasteVinner: svar i fel ordning

Skriv `senasteVinner` i `src/senaste.ts`. Läs problemet i kommentaren först. Rita en tidslinje för Stockholm (långsam) och Kiruna (snabb). Kör testerna.

### Steg 6. Koppla ihop i main.js

Gör TODO 1 till 4 i `src/main.ts`. När du är klar ska det gå att byta stad i listan, se *Laddar...*, sedan vädret, en rekommendationsrad och markerade rätter på menyn. Byter du filter ska markeringen finnas kvar. Ändrar du stad snabbt två gånger ska sidan visa den sista valda staden.

### Steg 7. Prova de svåra fallen

Testa i webbläsaren: (1) byt stad flera gånger snabbt (Network: Slow 3G hjälper), (2) Offline i Network och byt stad: du ska få felrutan med *Försök igen*, (3) filtrera på *lunch* medan en rekommendation är aktiv, (4) ladda om. Skriv i `docs/plan-integration.md` vad som fungerade och vad du fick rätta.

### Steg 8. Granska din egen kod

Gå igenom `src/main.ts` rad för rad. Kan du förklara varje rad? Skriv en kommentar på varje rad du är osäker på och läs just de raderna en gång till.

### Steg 9. Fördjupning (frivillig): AbortController

`senasteVinner` ignorerar gamla svar men avbryter inte anropet. Läs om `AbortController` och `fetch(url, { signal })` och försök avbryta det gamla anropet på riktigt. Skriv vad som händer med felet (`AbortError`).

## Kontrollista: så vet du att du är klar

- [ ] Alla tester på `tests.html` är gröna (både dag 8 och dag 10).
- [ ] Du kan byta stad och se väder, rekommendationsrad och markerade rätter.
- [ ] Rekommendationen finns kvar när du byter filter.
- [ ] Byter du stad snabbt två gånger visas den sista valda staden.
- [ ] Offline ger felrutan med *Försök igen*, och försök igen fungerar när nätet är tillbaka.
- [ ] `docs/plan-integration.md` finns med plan och testnoteringar.
- [ ] Du kan förklara varje rad i `src/main.ts`.
- [ ] Du har gjort minst sex commits.

## Tips om du fastnar

- Fastnar du på en regel: skriv ett test-case på papper med konkreta tal innan du kodar.
- Markeringen försvinner när du filtrerar? Menyn ritas om. Kolla att `ritaMeny` anropar `markeraRekommenderade`.
- `dataset.id` är en sträng, ids är tal. Jämför med `Number(...)`.
- Vill du se race condition? Sätt Network till Slow 3G och byt stad två gånger snabbt. Provkör utan `senasteVinner` först så ser du felet.
- Gå i små steg: få `rekommendera` grön först, sedan UI-delarna, sist `src/main.ts`.
- Misstänker du att något missats: byt stad medan något laddar och prova Offline. Det är där integration brukar gå sönder.

## Inlämning

**Deadline: imorgon klockan 09.00.** Allt lämnas in i Microsoft Forms. Du behöver inte redovisa något muntligt.

I formuläret fyller du i:

1. Länk till din fork av det här repot.
2. Reflektion: Varför är `rekommendera` en ren funktion och inte skriven direkt i `src/main.ts`? Vad händer om svaren kommer i fel ordning och hur löser `senasteVinner` det? Hur hjälper typen `T | null` dig att inte glömma att kolla?

## Vill du mer? (frivilligt)

- Lägg till en femte stad med egna koordinater och testa.
- Lägg till regeln "kraftig vind (över 30 km/h): rekommendera något att dricka inomhus" med tester.
- Spara senast valda stad i `localStorage` och återställ vid sidladdning.
