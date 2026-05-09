# Afbeeldingen — Overzicht & Upload-instructies

## 📸 Welke afbeeldingen heb je nodig?

Je contactpagina gebruikt **slechts één afbeelding**: het logo.

### Logo (origineel — staat al op je WordPress!)

| Onderdeel | Waarde |
|---|---|
| **Bestandsnaam** | `Color-logo-no-background-1024x627.png` |
| **Volledige URL** | `https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png` |
| **Status** | ✅ Staat al online op je WordPress (sinds nov 2023) |
| **Actie nodig?** | **Nee** — kan direct gebruikt worden |

### Hoe is het logo nu gekoppeld?

In de HTML staat:
```html
<img class="lats-logo"
     src="https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png"
     alt="L.A. Technische Service">
```

Het logo wordt direct vanaf jouw eigen WordPress-bestandsmap geladen — geen externe servers, geen derde partijen. Snel en betrouwbaar.

---

## 🔄 Wil je het logo vervangen?

Als je een nieuwere/andere versie van het logo wil gebruiken (bijv. een hoger-resolutie variant of een andere kleurversie):

### Stap 1 — Upload nieuwe afbeelding in WordPress

1. Ga naar `https://ludoaloserij.nl/wp-admin`
2. Klik op **Media** → **Nieuwe toevoegen**
3. Sleep je nieuwe logo-bestand in het uploadvak
4. Wacht tot upload klaar is
5. Klik op de zojuist geüploade afbeelding → in het zijpaneel staat **"Bestands-URL"**
6. Klik op **URL kopiëren naar klembord**

### Stap 2 — Vervang URL in de HTML

1. Open `wordpress-embed.html` in Kladblok / Notepad
2. Zoek met `Ctrl + F` naar: `Color-logo-no-background`
3. Vervang de **volledige URL** door je nieuw gekopieerde URL
4. Sla het bestand op
5. Plak de aangepaste HTML opnieuw in de Elementor HTML-widget (zie INSTALLATIE.md stap 3)

---

## ⚙️ Aanbevolen logo-eigenschappen

Wil je een **nieuwe versie** van het logo uploaden voor optimale weergave?

| Eigenschap | Aanbeveling |
|---|---|
| **Formaat** | PNG met transparante achtergrond |
| **Breedte** | 1024px tot 2048px (Retina-ready) |
| **Hoogte** | proportioneel — geen specifieke ratio nodig |
| **Bestandsgrootte** | Liefst onder 200 KB voor snelle laadtijd |
| **Naam** | beschrijvend, bijv. `lats-logo-2026.png` |

> 💡 **Tip**: Een SVG-versie van je logo zou nog beter zijn (oneindig schaalbaar, super klein bestand). Heb je een SVG van je ontwerper? Upload die en gebruik de URL — werkt identiek in de HTML.

---

## 📋 Geen andere afbeeldingen nodig

De pagina gebruikt verder **geen** andere afbeeldingen:

- ❌ Geen achtergrond-foto's
- ❌ Geen icoon-afbeeldingen (alle iconen in de footer en op de knop zijn **inline SVG** — geladen vanuit de HTML zelf, geen losse files)
- ❌ Geen decoratieve elementen

Dit maakt de pagina:
- ✅ **Heel snel** — minder HTTP-verzoeken
- ✅ **Bestendig** — geen broken images
- ✅ **Onderhoudsvriendelijk** — alleen het logo om te beheren
