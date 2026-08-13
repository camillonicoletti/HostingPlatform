# Rules, Glass Notice, Review Link and Address Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiornare il titolo delle regole, evidenziare vetro/glass, collegare Housing Anywhere e mostrare l'indirizzo sotto il titolo.

**Architecture:** Conservare i componenti e i flussi esistenti, aggiornando i dati localizzati in `src/content.js`. Estendere `Header` con il valore `brand.location`; riutilizzare `RecyclingNotice` e `.glass-warning` già esistenti, aggiungendo solo la trasformazione maiuscola.

**Tech Stack:** React, JSX, JavaScript, CSS.

## Global Constraints

- Aggiornare italiano e inglese dove previsto.
- Usare esattamente il collegamento Housing Anywhere fornito.
- Evidenziare in rosso soltanto `IL VETRO` / `GLASS`.
- Mostrare l'indirizzo in piccolo corsivo sotto `LA MIA CASA`.
- Non aggiungere dipendenze.
- Non eseguire test automatici.
- Non creare commit o push finché l'utente non dice `pubblica`.
- Quando richiesto, pubblicare soltanto i file di produzione con commit `edit` su `main`.
- Escludere tutti i documenti non tracciati dentro `docs/superpowers`.

---

### Task 1: Aggiornare i contenuti e il collegamento

**Files:**
- Modify: `src/content.js`

**Interfaces:**
- Consumes: `content.brand`, `content.links`, `rules.title`, `checkout.reviewPrompt`, `checkout.reviewHouse`, `recycling.demoNote`.
- Produces: testi e URL definitivi consumati dai componenti esistenti.

- [ ] **Step 1: Impostare indirizzo e link recensione**

```js
brand: {
  name: 'LA MIA CASA',
  location: 'Via Tullio Ascarelli, 99 - Roma',
},
```

```js
review: 'https://housinganywhere.com/it/room/ut1483360/it/Rome/via-tullio-ascarelli',
```

- [ ] **Step 2: Aggiornare il titolo italiano delle regole**

```js
title: 'Regole della casa',
```

La versione inglese `House rules` resta invariata.

- [ ] **Step 3: Aggiornare il testo della recensione**

Italiano:

```js
reviewPrompt: 'Se hai prenotato tramite Housing Anywhere clicca qui per lasciare una recensione.',
reviewHouse: 'Lascia recensione su Housing Anywhere',
```

Inglese:

```js
reviewPrompt: 'If you booked through Housing Anywhere, click here to leave a review.',
reviewHouse: 'Leave a review on Housing Anywhere',
```

- [ ] **Step 4: Rendere maiuscolo il riferimento al vetro nei dati**

Italiano:

```text
IL VETRO non viene raccolto porta a porta
```

Inglese:

```text
GLASS is not collected door to door
```

Mantenere invariato il resto delle due frasi.

### Task 2: Mostrare l'indirizzo sotto il titolo

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `brand.name` e `brand.location`.
- Produces: gruppo `.hero__brand` contenente titolo e indirizzo.

- [ ] **Step 1: Raggruppare titolo e indirizzo in Header**

Sostituire l'`h1` isolato con:

```jsx
<div className="hero__brand">
  <h1>{brand.name}</h1>
  <address>{brand.location}</address>
</div>
```

- [ ] **Step 2: Aggiungere gli stili del gruppo e dell'indirizzo**

```css
.hero__brand {
  min-width: 0;
}

.hero__brand address {
  margin-top: 2px;
  color: var(--night-soft);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 0.72rem;
  font-style: italic;
  line-height: 1.25;
}
```

Conservare tutti gli stili esistenti dell'`h1`.

### Task 3: Garantire l'evidenza rossa di vetro/glass

**Files:**
- Modify: `src/components/RecyclingPanel.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `recycling.demoNote` con `IL VETRO` / `GLASS`.
- Produces: `<strong className="glass-warning">` attorno alla parola e resa rossa maiuscola.

- [ ] **Step 1: Conservare il riconoscimento esistente**

Mantenere `RecyclingNotice` con la regex attuale, che riconosce `vetro|glass` senza distinzione tra maiuscole e minuscole. Non modificare il resto della frase.

- [ ] **Step 2: Rendere esplicitamente maiuscola la parola evidenziata**

Aggiungere alla classe esistente:

```css
.glass-warning {
  color: #c52f2f;
  font-weight: 900;
  text-transform: uppercase;
}
```

### Task 4: Controllo finale senza test

**Files:**
- Review: `src/content.js`
- Review: `src/components/Header.jsx`
- Review: `src/components/RecyclingPanel.jsx`
- Review: `src/styles.css`

**Interfaces:**
- Consumes: tutte le modifiche delle Task 1-3.
- Produces: quattro file di produzione pronti per la pubblicazione su richiesta.

- [ ] **Step 1: Controllare il diff**

```powershell
git diff -- src/content.js src/components/Header.jsx src/components/RecyclingPanel.jsx src/styles.css
```

Verificare titolo, indirizzo, testi Housing Anywhere, URL e resa `IL VETRO` / `GLASS`. Fermarsi senza staging, commit o push.
