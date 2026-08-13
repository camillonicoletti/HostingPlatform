# Compact Check-in Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Compattare esclusivamente testi e spazi verticali del Check-in affinché il pulsante Google Maps sia interamente visibile nella prima schermata mobile.

**Architecture:** `Arrival` riceve un contenitore `.arrival-panel`, che delimita gli override CSS e impedisce effetti sulle altre sezioni. Il comportamento, l’asset e la struttura interna restano invariati; il browser misura il risultato finale a 320×700 e 430×932.

**Tech Stack:** React 19, JSX, CSS, Vitest, React Testing Library, Vite, verifica browser responsive.

## Global Constraints

- Il lavoro viene svolto direttamente sul branch `main` del worktree principale.
- Gli stili compatti si applicano soltanto a `.arrival-panel`.
- `.detail dd` usa `font-size: 0.86rem` e `line-height: 1.38`.
- `.detail` usa `padding: 10px 0` e `gap: 4px`; la prima riga conserva `padding-top: 0`.
- `.checkin-photo` usa `margin: 10px 0` e conserva rapporto 4:3 e ritaglio sul portone.
- Il pulsante Maps conserva `min-height: 52px` e usa soltanto `margin-top: 10px`.
- Titolo, etichette, asset, testi e comportamento non cambiano.
- A 320×700 e 430×932 il pulsante Maps deve essere interamente visibile senza scorrimento e non deve esserci overflow orizzontale.

---

## File Structure

- `src/components/SectionContent.jsx`: aggiunge il confine semantico e stilistico `.arrival-panel` attorno al contenuto Check-in.
- `src/App.test.jsx`: verifica che il contenuto Check-in usi il contenitore dedicato senza perdere immagine o link Maps.
- `src/styles.css`: contiene esclusivamente override discendenti da `.arrival-panel`.

---

### Task 1: Isolare e compattare il contenuto Check-in

**Files:**
- Modify: `src/components/SectionContent.jsx:32-51`
- Modify: `src/App.test.jsx:145-180`
- Modify: `src/styles.css:507-524`

**Interfaces:**
- Consumes: `Arrival({ section, guide })`, `.detail`, `.checkin-photo` e `.action-link` esistenti.
- Produces: contenitore `.arrival-panel` e override CSS circoscritti.

- [ ] **Step 1: Scrivere il test che richiede il contenitore dedicato**

Nel test `places the real house photo before the entry instructions`, aggiungere:

```jsx
const arrivalPanel = photo.closest('.arrival-panel');

expect(arrivalPanel).toBeInTheDocument();
expect(arrivalPanel).toContainElement(instructions);
expect(arrivalPanel).toContainElement(
  screen.getByRole('link', { name: 'Apri in Google Maps' }),
);
```

Il test protegge il confine necessario affinché le regole compatte non possano diventare globali.

- [ ] **Step 2: Eseguire il test e confermare il fallimento**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL perché `photo.closest('.arrival-panel')` restituisce `null`.

- [ ] **Step 3: Aggiungere il contenitore minimo**

In `Arrival`, sostituire il frammento con:

```jsx
return (
  <div className="arrival-panel">
    <dl className="details-list">
      <Detail label={section.addressLabel}>{section.address}</Detail>
      <Detail label={section.checkInLabel}>{section.checkIn}</Detail>
    </dl>
    <CheckinPhoto
      src={section.housePhoto}
      alt={section.housePhotoAlt}
      fallback={section.housePhotoFallback}
    />
    <dl className="details-list">
      <Detail label={section.instructionsLabel}>
        {section.instructions}
      </Detail>
    </dl>
    <ExternalLink href={guide.links.propertyMap}>{guide.maps}</ExternalLink>
  </div>
);
```

- [ ] **Step 4: Aggiungere gli override CSS circoscritti**

In `src/styles.css`, dopo le regole della foto aggiungere:

```css
.arrival-panel .detail {
  padding: 10px 0;
  gap: 4px;
}

.arrival-panel .detail:first-child {
  padding-top: 0;
}

.arrival-panel .detail dd {
  font-size: 0.86rem;
  line-height: 1.38;
}

.arrival-panel .checkin-photo {
  margin: 10px 0;
}

.arrival-panel > .action-link {
  margin-top: 10px;
}
```

- [ ] **Step 5: Eseguire test e build**

Run: `npm test -- --run`, poi `npm run build`, infine `git diff --check`.

Expected: 30 test PASS, build Vite conclusa e nessun errore di whitespace.

- [ ] **Step 6: Verificare a 320×700**

Nell’app locale, aprire Check-in e verificare:

- `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- Il rettangolo del pulsante Maps soddisfa `top >= 0` e `bottom <= 700` senza scorrimento.
- Lo stile calcolato del testo descrittivo è `13.76px` (0.86rem con radice 16px) e l’interlinea è circa `18.99px`.
- Testo, foto e pulsante conservano distanze visivamente chiare.

- [ ] **Step 7: Verificare a 430×932**

Ripetere la Step 6 a 430×932, verificando che il pulsante Maps sia interamente visibile e che la scheda non mostri overflow orizzontale.

- [ ] **Step 8: Committare l’implementazione**

```bash
git add src/components/SectionContent.jsx src/App.test.jsx src/styles.css
git commit -m "style: compact check-in content"
```

- [ ] **Step 9: Verificare lo stato Git finale**

Run: `git status --short` e `git log -4 --oneline`.

Expected: worktree pulito e commit della compattazione sopra specifica e piano.
