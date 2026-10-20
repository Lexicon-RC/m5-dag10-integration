# Dag 10 · Integration: stad, väder och rekommendation

*Modul 5, UI/UX & Frontendutveckling (JavaScript), Lexicon IT-Proffs*

## Vad du ska göra idag

Du bygger en **integrationsfunktion** som kopplar ihop flera delar: användaren väljer en stad, vädret hämtas (med tre tillstånd), en ren funktion `rekommendera` räknar ut vad kaféet ska rekommendera, och rätterna markeras på menyn. Du hanterar också att svar kan komma i **fel ordning** (race condition).

## Bakgrund

Hittills har varje övning handlat om en del: ett filter, ett formulär, ett nätanrop. Det svåra i riktiga program är att få delarna att fungera tillsammans. Idag gör du det. Strategin: håll logiken ren och testbar (`rekommendera`), håll gränssnittet för sig (`rek-ui.js`) och låt `main.js` vara limmet. Planera först, bygg, och granska sedan.

## Så arbetar du (samma som alltid)

1. **Forka** dagens repo på GitHub (*Fork → Create fork*).
2. **Klona din fork:** *Code → HTTPS → kopiera adressen*. I terminalen (Ctrl+ö i VS Code): `git clone <adressen>`. Öppna den nya mappen i VS Code och starta *Live Server*.
3. **Gör uppgiften.** Spara och kontrollera i webbläsaren och Console (F12) efter varje steg. Gör en commit efter varje avslutat steg: `git add .` och `git commit -m "Beskriv vad du gjorde"`.
4. **Skicka upp** när du är klar: `git push`.
5. **Lämna in i Microsoft Forms.**

Fastnar du: skriv ner exakt var och vad du försökt (och vilket felmeddelande du fick), och ta det först i nästa handledda pass.

Filer som använder `import` fungerar bara när sidan öppnas med *Live Server*. Dubbelklickar du på en HTML-fil hamnar du på `file://` och får ett CORS-fel i Console.

## Uppgiften steg för steg

### Steg 1. Klona, kör testerna och starta sidan

Forka repot, kör `git clone`, öppna i VS Code, starta Live Server på `tests.html`. Testerna från dag 8 är gröna, de nya röda. Öppna `index.html`: menyn och vädret fungerar redan (dag 8). Läs igenom `main.js` och `stader.js` (färdig).

### Steg 2. Skriv en plan i tre steg (innan du kodar)

Skapa `docs/plan-integration.md`. Skriv en plan i tre delar: (1) händelse: vad användaren gör, (2) hämtning: vilka anrop och i vilken ordning, (3) uppdatering: vad som ändras på sidan. Rita gärna ett litet flöde. Planen är det du håller din kod mot när du är klar.

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

### Steg 8. Granska din egen kod

Gå igenom `main.js` rad för rad. Kan du förklara varje rad? Skriv en kommentar på varje rad du är osäker på och läs just de raderna en gång till.

### Steg 9. Fördjupning (frivillig): AbortController

`senasteVinner` ignorerar gamla svar men avbryter inte anropet. Läs om `AbortController` och `fetch(url, { signal })` och försök avbryta det gamla anropet på riktigt. Skriv vad som händer med felet (`AbortError`).

## Kontrollista: så vet du att du är klar

- [ ] Alla tester på `tests.html` är gröna (både dag 8 och dag 10).
- [ ] Du kan byta stad och se väder, rekommendationsrad och markerade rätter.
- [ ] Rekommendationen finns kvar när du byter filter.
- [ ] Byter du stad snabbt två gånger visas den sista valda staden.
- [ ] Offline ger felrutan med *Försök igen*, och försök igen fungerar när nätet är tillbaka.
- [ ] `docs/plan-integration.md` finns med plan och testnoteringar.
- [ ] Du kan förklara varje rad i `main.js`.
- [ ] Du har gjort minst sex commits.

## Tips om du fastnar

- Fastnar du på en regel: skriv ett test-case på papper med konkreta tal innan du kodar.
- Markeringen försvinner när du filtrerar? Menyn ritas om. Kolla att `ritaMeny` anropar `markeraRekommenderade`.
- `dataset.id` är en sträng, ids är tal. Jämför med `Number(...)`.
- Vill du se race condition? Sätt Network till Slow 3G och byt stad två gånger snabbt. Provkör utan `senasteVinner` först så ser du felet.
- Gå i små steg: få `rekommendera` grön först, sedan UI-delarna, sist `main.js`.
- Misstänker du att något missats: byt stad medan något laddar och prova Offline. Det är där integration brukar gå sönder.

## Inlämning

**Deadline: imorgon klockan 09.00.** Allt lämnas in i Microsoft Forms. Du behöver inte redovisa något muntligt.

I formuläret fyller du i:

1. Länk till din fork av det här repot.
2. Reflektion: Varför är `rekommendera` en ren funktion och inte skriven direkt i `main.js`? Vad händer om svaren kommer i fel ordning och hur löser `senasteVinner` det?

## Vill du mer? (frivilligt)

- Lägg till en femte stad med egna koordinater och testa.
- Lägg till regeln "kraftig vind (över 30 km/h): rekommendera något att dricka inomhus" med tester.
- Spara senast valda stad i `localStorage` och återställ vid sidladdning.
