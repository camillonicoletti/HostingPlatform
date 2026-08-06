# CASA BAIOCCO Mobile Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trasformare la home in una schermata mobile compatta con titolo CASA BAIOCCO, otto categorie in griglia 2 × 4 e barra azioni sotto la griglia.

**Architecture:** La struttura React esistente resta invariata. `src/content.js` fornisce le otto sezioni bilingui; `SectionContent` rende le due nuove tipologie; il CSS dispone header, griglia e azioni in tre righe del viewport mobile, con scorrimento solo come sicurezza sugli schermi eccezionalmente bassi.

**Tech Stack:** React, Vite, Vitest, Testing Library e CSS nativo.

## Global Constraints

- Titolo visibile esatto: `CASA BAIOCCO`.
- Ordine sezioni: Check-in, Wi-Fi, Regole casa, Dove mangiare, Trasporti vicini, Cosa vedere, Supermercati, Check-out.
- Griglia mobile 2 × 4 e barra WhatsApp–Posizione–Emergenze nel flusso sotto la griglia.
- Home senza scorrimento a 360 × 740, 390 × 844 e 430 × 900 px; scorrimento consentito come sicurezza sotto 740 px di altezza.
- Controlli non inferiori a 44 × 44 px e tutti i nuovi dati in `src/content.js` in italiano e inglese.

---

### Task 1: Contratto delle otto sezioni

**Files:**
- Modify: `src/content.test.js`, `src/content.js`

**Interfaces:**
- Produces: `getLocalizedContent(language).sections` con ID `checkin`, `wifi`, `rules`, `food`, `transport`, `explore`, `groceries`, `checkout`.
- Consumes: il contratto esistente di `getLocalizedContent(language)`.

- [ ] **Step 1: Aggiornare il test con gli otto ID nell’ordine richiesto**

```js
expect(it.sections.map(({ id }) => id)).toEqual([
  'checkin', 'wifi', 'rules', 'food',
  'transport', 'explore', 'groceries', 'checkout',
]);
```

- [ ] **Step 2: Eseguire il test e confermare il fallimento sugli ID attuali**

Run: `npm test -- --run src/content.test.js`
Expected: FAIL mostrando sei ID anziché otto.

- [ ] **Step 3: Rinominare le sezioni e aggiungere trasporti e supermercati bilingui**

Ogni nuova sezione espone `items`, massimo cinque elementi, e ogni elemento contiene `name`, `description`, `distance`, `map` con dati `[DA PERSONALIZZARE]`.

- [ ] **Step 4: Eseguire il test e confermare il passaggio**

Run: `npm test -- --run src/content.test.js`
Expected: PASS.

### Task 2: Schede e titolo CASA BAIOCCO

**Files:**
- Modify: `src/App.test.jsx`, `src/App.jsx`, `src/components/Header.jsx`, `src/components/Icon.jsx`, `src/components/SectionContent.jsx`

**Interfaces:**
- Consumes: gli otto ID prodotti dal Task 1.
- Produces: otto pulsanti accessibili e schede renderizzabili per `transport` e `groceries`.

- [ ] **Step 1: Scrivere test fallimentari per ordine, titolo e nuove schede**

```jsx
expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('CASA BAIOCCO');
expect(screen.getAllByTestId('guide-card').map((button) => button.dataset.sectionId)).toEqual([
  'checkin', 'wifi', 'rules', 'food',
  'transport', 'explore', 'groceries', 'checkout',
]);
```

Il test parametrico di apertura include `Trasporti vicini` e `Supermercati`.

- [ ] **Step 2: Eseguire il test e confermare il fallimento sui nuovi controlli**

Run: `npm test -- --run src/App.test.jsx`
Expected: FAIL perché titolo, ID e nuove schede non corrispondono.

- [ ] **Step 3: Aggiornare componenti, icone e renderer**

`Header` mostra soltanto titolo e lingue. `GuideGrid` assegna `data-testid="guide-card"`. `SectionContent` riusa una lista di luoghi per `transport` e `groceries`, con distanza e collegamento Maps.

- [ ] **Step 4: Eseguire l’intera suite e confermare il passaggio**

Run: `npm test -- --run`
Expected: tutti i test PASS.

### Task 3: Home mobile senza sovrapposizioni

**Files:**
- Modify: `src/styles.css`, `README.md`

**Interfaces:**
- Consumes: `.app-shell`, `.hero`, `.guide-main`, `.guide-grid`, `.guide-card`, `.quick-actions`.
- Produces: home a tre righe nel viewport e layout mobile centrato anche su schermi più larghi.

- [ ] **Step 1: Rendere la home una griglia verticale header–categorie–azioni**

```css
.app-shell {
  width: min(100%, 430px);
  min-height: 100svh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.guide-grid {
  height: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(4, minmax(0, 1fr));
}

.quick-actions { position: static; }
```

- [ ] **Step 2: Aggiungere adattamento per altezza e mantenere i target da 44 px**

Sotto 760 px si riducono spazi, icone e testi secondari; sotto 740 px resta consentito lo scorrimento. Nessun breakpoint introduce più di due colonne.

- [ ] **Step 3: Aggiornare README con nome e ordine delle nuove categorie**

Documentare la home mobile e indicare che trasporti e supermercati si modificano in `src/content.js`.

- [ ] **Step 4: Verificare test, build e browser**

Run: `npm test -- --run && npm run build`
Expected: test PASS e build exit 0. Nel browser, a 360 × 740, 390 × 844 e 430 × 900: `scrollHeight <= innerHeight`, barra sotto la griglia e nessun overflow orizzontale.
