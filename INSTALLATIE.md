# Installatiehandleiding — L.A. Technische Service contactpagina

## 📦 Wat zit er in dit pakket?

| Bestand | Wat is het? |
|---|---|
| `wordpress-embed.html` | Het complete contact-pagina bestand: HTML + inline CSS + inline JS in één file |
| `INSTALLATIE.md` | Dit bestand — stap-voor-stap handleiding |
| `IMAGES.md` | Overzicht van afbeeldingen die je in WordPress moet hebben |

---

## ⚡ Snelle installatie via Elementor (5 minuten)

### Stap 1 — Open de pagina in Elementor

1. Log in op WordPress: `https://ludoaloserij.nl/wp-admin`
2. Klik op **Pagina's** → **Nieuwe toevoegen** (of bewerk een bestaande)
3. Geef een titel (bijv. "Contact")
4. Klik op **"Bewerken met Elementor"**

### Stap 2 — Voeg een HTML widget toe

1. In de Elementor zijbalk links: zoek naar **"HTML"**
2. Sleep de **HTML widget** naar het canvas
3. Klik op de widget → in de zijbalk verschijnt een tekstvak

### Stap 3 — Plak de HTML code

1. Open `wordpress-embed.html` in Kladblok / Notepad
2. Selecteer **alles** (`Ctrl + A`) en kopieer (`Ctrl + C`)
3. Plak het in het HTML widget tekstvak
4. Klik **Bijwerken** rechtsonder
5. Klik **Voorbeeld** om te testen

### Stap 4 — Maak de pagina full-width (belangrijk!)

De contactpagina werkt het mooist als de Elementor sectie **geen padding/marge** heeft. Pas aan:

1. Klik in Elementor op de **sectie** (de container rond de HTML widget)
2. Tab **Layout** → **Inhoud breedte**: zet op **"Full Width"**
3. Tab **Layout** → **Hoogte**: zet op **"Pas aan inhoud aan"**
4. Tab **Geavanceerd** → **Marge & opvulling**: zet alle waarden op **0**
5. Eventueel: **Pagina-opties** (linkonder) → **Pagina indeling**: kies **"Elementor Canvas"** voor een volledig blanco pagina zonder header/footer (alleen jouw contactpagina)

### Stap 5 — Publiceer

1. Klik op **Publiceren**
2. Klaar! Je nieuwe contactpagina is live

---

## 🧪 Test het formulier

1. Open je nieuwe pagina in een private/incognito venster
2. Vul het formulier in met je eigen gegevens en stuur het
3. Je wordt heel even doorgestuurd naar Web3Forms en daarna **automatisch terug** naar je pagina met een groene melding *"Bericht verzonden — ik neem zo snel mogelijk contact op."*
4. Check je inbox op `info@ludoaloserij.nl` — daar moet de mail binnen 1-2 minuten verschijnen

> 💡 **Eerste keer test?** Bij de allereerste inzending na het maken van je Web3Forms account stuurt Web3Forms een eenmalige verificatie-mail — klik daarop om je account te activeren.

---

## 🛠️ Aanpassingen achteraf

### E-mailtekst in onderwerpregel veranderen
Zoek in de HTML naar:
```html
<input type="hidden" name="subject" value="Nieuw contactbericht via ludoaloserij.nl">
```
Pas de `value` aan naar wat jij wilt zien staan in je inbox.

### Logo vervangen
Zoek naar:
```html
src="https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png"
```
Vervang de URL door een nieuw logo (zie IMAGES.md voor uploadinstructies).

### Tekst aanpassen
- **Slogan**: zoek `Alles met` en `Techniek` in de HTML.
- **Contact-titel**: zoek `<h2>Contact</h2>`.
- **Subtekst**: zoek `Vul hieronder uw gegevens in`.
- **Footer**: zoek `Ludo Aloserij`, `KVK: 80568173`, `info@ludoaloserij.nl`.

---

## ⚠️ Troubleshooting

### "Ik krijg geen mails binnen"
1. **Check spam/ongewenste mail map** — eerste verificatiemail van Web3Forms gaat vaak daarheen.
2. **Check Web3Forms dashboard** op https://web3forms.com/dashboard — staat je access key gekoppeld aan `info@ludoaloserij.nl`?
3. **Verzenden-knop test** — kijk of je een groene melding krijgt na verzending. Geen melding = formulier-probleem. Wel melding maar geen mail = Web3Forms verificatie-issue.

### "De pagina ziet er anders uit dan op de preview"
- Mogelijk vecht je WordPress thema met de styling. Oplossing: zet pagina indeling op **"Elementor Canvas"** (linkonder in Elementor → Pagina-instellingen → Pagina indeling).
- Als alternatief: verwijder de globale header/footer voor deze pagina.

### "Het formulier doet niets"
- Check of je `wordpress-embed.html` **volledig** hebt gekopieerd, inclusief de `<script>` aan het einde.
- Open browser console (F12) en check op JavaScript-fouten.

### "Logo wordt niet getoond"
- Check of de logo-URL nog werkt: open https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png direct in browser.
- Als logo verplaatst is: upload opnieuw via WordPress Media en pas de URL aan in de HTML.

---

## 📞 Wat als je een Elementor template (.json) wil?

Een **echte Elementor template export (.json)** is bewust **niet bijgeleverd** — hier de reden:

- Elementor JSON-templates zijn afhankelijk van je **exacte Elementor-versie en pluginset**. Een handgeschreven JSON kan importfouten geven of er anders uitzien.
- De **HTML widget aanpak** (deze installatie) werkt **universeel**: in elke Elementor-versie, met of zonder Elementor Pro, met elk thema — en je behoudt 100% controle over de styling.
- Wil je toch een Elementor template-versie? Dan moet die **per hand in Elementor** gebouwd worden door alle elementen los te slepen. Niet aan te raden tenzij je echt Elementor sectie-controls nodig hebt.

De HTML-widget versie is **net zo responsive** als een native Elementor sectie omdat de CSS al alle media queries bevat.
