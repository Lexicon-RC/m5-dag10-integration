# Dag 10 · Integration: stad, väder och rekommendation

*Modul 5, UI/UX & Frontendutveckling (JavaScript), Lexicon IT-Proffs*

## Vad du ska göra idag

Du bygger en **integrationsfunktion** som kopplar ihop flera delar: användaren väljer en stad, vädret hämtas (med tre tillstånd), en ren funktion `rekommendera` räknar ut vad kaféet ska rekommendera, och rätterna markeras på menyn. Du hanterar också att svar kan komma i **fel ordning** (race condition).

## Bakgrund

Hittills har varje övning handlat om en del: ett filter, ett formulär, ett nätanrop. Det svåra i riktiga program är att få delarna att fungera tillsammans. Idag gör du det. Strategin: håll logiken ren och testbar (`rekommendera`), håll gränssnittet för sig (`rek-ui.js`) och låt `main.js` vara limmet. Du får nu använda AI mer fritt, men du ansvarar för varje rad. Planera först, bygg, och granska sedan.

## Så arbetar du (samma som alltid)

1. **Forka** dagens repo på GitHub (*Fork → Create fork*).
2. **Klona din fork:** *Code → HTTPS → kopiera adressen*. I terminalen (Ctrl+ö i VS Code): `git clone <adressen>`. Öppna den nya mappen i VS Code och starta *Live Server*.
3. **Gör uppgiften.** Spara och kontrollera i webbläsaren och Console (F12) efter varje steg. Gör en commit efter varje avslutat steg: `git add .` och `git commit -m "Beskriv vad du gjorde"`.
4. **Skicka upp** när du är klar: `git push`.
5. **Fortsätt i `mitt-projekt`** med dagens projektsteg (längre ned).
6. **Lämna in i Microsoft Forms.**

Fastnar du: skriv ner exakt var och vad du försökt (och vilket felmeddelande du fick), och ta det först i nästa handledda pass.

Filer som använder `import` fungerar bara när sidan öppnas med *Live Server*. Dubbelklickar du på en HTML-fil hamnar du på `file://` och får ett CORS-fel i Console.

## Uppgiften steg för steg

### Steg 1. Klona, kör testerna och starta sidan

Forka repot, kör `git clone`, öppna i VS Code, starta Live Server på `tests.html`. Testerna från dag 8 är gröna, de nya röda. Öppna `index.html`: menyn och vädret fungerar redan (dag 8). Läs igenom `main.js` och `stader.js` (färdig).

### Steg 2. Skriv en plan i tre steg (innan du kodar)

Skapa `docs/plan-integration.md`. Skriv en plan i tre delar: (1) händelse: vad användaren gör, (2) hämtning: vilka anrop och i vilken ordning, (3) uppdatering: vad som ändras på sidan. Rita gärna ett litet flöde. Planen är det du senare jämför AI:s förslag mot.

### Steg 3. rekommendera: en ren funktion

Skriv `rekommendera(vader, meny)` i `rekommendera.js`. Reglerna står i kommentaren. Gör ett villkor i taget och kör testerna. Gränsfallen (10 och 20 grader, kod 51) är de som oftast blir fel.

### Steg 4. markeraRekommenderade och visaRekommendation

Skriv de två funktionerna i `rek-ui.js`. Båda ska kunna anropas om och om igen utan att duplicera något. Använd `textContent`.

### Steg 5. senasteVinner: svar i fel ordning

Skriv `senasteVinner` i `senaste.js`. Läs problemet i kommentaren först. Rita en tidslinje för Stockholm (långsam) och Kiruna (snabb). Kör testerna.

### Steg 6. Koppla ihop i main.js

Gör TODO 1 till 4 i `main.js`. När du är klar ska det gå att byta stad i listan, se *Laddar...*, sedan vädret, en rekommendationsrad och markerade rätter på menyn. Byter du filter ska markeringen finnas kvar. Ändrar du stad snabbt två gånger ska sidan visa den sista valda staden.

### Steg 7. Prova de svåra fallen

Testa i webbläsaren: (1) byt stad flera gånger snabbt (Network: Slow 3G hjälper), (2) Offline i Network och byt stad: du ska få felrutan med *Försök igen*, (3) filtrera på *lunch* medan en rekommendation är aktiv, (4) ladda om. Skriv i `docs/plan-integration.md` vad som fungerade och vad du fick rätta.

### Steg 8. Granska din egen kod (och AI:s)

Gå igenom `main.js` rad för rad. Kan du förklara varje rad? Skriv en kommentar på varje rad du är osäker på. Om AI hjälpt dig: logga hur stor del som är din och vilka delar du ändrade (se AI-spåret).

### Steg 9. Fördjupning (frivillig): AbortController

`senasteVinner` ignorerar gamla svar men avbryter inte anropet. Läs om `AbortController` och `fetch(url, { signal })` och försök avbryta det gamla anropet på riktigt. Skriv vad som händer med felet (`AbortError`).

## AI-spåret (nivå 3: Styr och ansvara)

**Planera, bygg, granska** (cirka 30 minuter, efter att du gjort din egen lösning)

Fri användning, full loggning. Du granskar varje rad AI föreslår och bär ansvaret för allt du lämnar in. Nu får du fri användning. Skillnaden mellan en bra och en dålig användning är hur väl du granskar.

Regler: egen lösning först, du ska kunna förklara varje rad, och du loggar i `docs/ai-logg.md` i `mitt-projekt` under rubriken *Modul 5*. Reglerna står i `AI-REGLER-MODUL5.md`.

1. Skriv en plan i tre steg för din integrationsfunktion (händelse, hämtning, uppdatering).
2. Låt AI skapa ett första skelett utifrån din plan.
3. Gå igenom skelettet rad för rad. Skriv en kommentar på varje rad du inte förstod innan du behåller den.
4. Skriv om minst en tredjedel med egna ord eller bättre struktur.
5. Logga hur stor del av koden som är din.

Prompt att utgå från:

```
Här är min plan för en funktion:
[planen i tre steg]
Skriv ett skelett i JavaScript med async/await.
Lämna TODO-kommentarer där jag ska fylla i
och förklara vad varje TODO ska göra.
```

**Kontrollera med:**

- Kör med alla tre tillstånden.
- Kan du förklara varje rad?
- Tester och Console, inte magkänsla.

**I ditt projekt:** Bygg en integrationsfunktion i ditt eget case (händelse → hämtning → uppdaterat gränssnitt) och logga din AI-användning.

## Kontrollista: så vet du att du är klar

- [ ] Alla tester på `tests.html` är gröna (både dag 8 och dag 10).
- [ ] Du kan byta stad och se väder, rekommendationsrad och markerade rätter.
- [ ] Rekommendationen finns kvar när du byter filter.
- [ ] Byter du stad snabbt två gånger visas den sista valda staden.
- [ ] Offline ger felrutan med *Försök igen*, och försök igen fungerar när nätet är tillbaka.
- [ ] `docs/plan-integration.md` finns med plan och testnoteringar.
- [ ] Du kan förklara varje rad i `main.js`.
- [ ] Du har gjort minst sex commits.
- [ ] Du har gjort AI-uppgiften och skrivit en post i `docs/ai-logg.md` i `mitt-projekt`.

## Tips om du fastnar

- Fastnar du på en regel: skriv ett test-case på papper med konkreta tal innan du kodar.
- Markeringen försvinner när du filtrerar? Menyn ritas om. Kolla att `ritaMeny` anropar `markeraRekommenderade`.
- `dataset.id` är en sträng, ids är tal. Jämför med `Number(...)`.
- Vill du se race condition? Sätt Network till Slow 3G och byt stad två gånger snabbt. Provkör utan `senasteVinner` först så ser du felet.
- Gå i små steg: få `rekommendera` grön först, sedan UI-delarna, sist `main.js`.
- Misstänker du att AI missat något: byt stad medan något laddar och prova Offline. Det är där AI-kod brukar gå sönder.

## Ditt projekt: Integrera delarna i ditt projekt

Efter övningen jobbar du vidare i `mitt-projekt`, samma repo som i modul 4. Övningen här är träningsbanan, projektet är det som växer. Dagens steg står också i `PROJEKTSTEG-MODUL5.md` (som du kopierar till ditt projekt dag 1), under **Dag 10**.

1. Skriv en plan i tre steg (händelse, hämtning, uppdatering) för en integrationsfunktion i ditt projekt i `docs/plan-integration.md`.
2. Skriv en ren funktion för den logik som beror på hämtad data (som `rekommendera`), med minst fem tester inklusive gränsfall.
3. Koppla ihop i din `main.js`: användarens val, hämtning med tre tillstånd, den rena funktionen och uppdatering av sidan.
4. Hantera svar i fel ordning, till exempel med en egen version av `senasteVinner`.
5. Gör i en feature-gren och en pull request till din egen main (Git från dag 9).
6. Commit och push.

**Klart när:** Projektet har en integrationsfunktion som kopplar ihop användarens val, hämtad data och en ren, testad funktion, och hanterar fel och svar i fel ordning.

## Inlämning

**Deadline: imorgon klockan 09.00.** Allt lämnas in i Microsoft Forms. Du behöver inte redovisa något muntligt.

I formuläret fyller du i:

1. Länk till din fork av det här repot.
2. Länk till ditt `mitt-projekt`.
3. Reflektion: Varför är `rekommendera` en ren funktion och inte skriven direkt i `main.js`? Vad händer om svaren kommer i fel ordning och hur löser `senasteVinner` det?

## Vill du mer? (frivilligt)

- Lägg till en femte stad med egna koordinater och testa.
- Lägg till regeln "kraftig vind (över 30 km/h): rekommendera något att dricka inomhus" med tester.
- Spara senast valda stad i `localStorage` och återställ vid sidladdning.
