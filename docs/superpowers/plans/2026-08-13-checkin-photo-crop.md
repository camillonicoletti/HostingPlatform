# Check-in Photo Crop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendere la foto del Check-in più bassa e rettangolare, concentrando il ritaglio sul portone.

**Architecture:** La modifica resta confinata alle regole CSS del componente esistente. Il rapporto diventa 4:3 e `object-position` ancora l’immagine al bordo inferiore; asset, contenuti e JSX non cambiano.

**Tech Stack:** CSS, React 19, Vitest, Vite, verifica browser responsive.

## Global Constraints

- Il lavoro viene svolto direttamente sul branch `main` del worktree principale.
- Il riquadro usa `aspect-ratio: 4 / 3`.
- L’immagine conserva `object-fit: cover` e usa `object-position: 50% 100%`.
- Portone e civico 99 devono restare visibili, con una fascia ridotta di verde.
- **Come entrare** e il collegamento Google Maps devono comparire prima rispetto al formato 6:7.
- `public/img_casa.jpg`, testi alternativi, fallback e componenti React non vengono modificati.
- Non viene aggiunto un test che legga il testo del CSS: rapporto e ritaglio vengono misurati nell’app reale tramite gli stili calcolati dal browser.

---

## File Structure

- `src/styles.css`: unico file modificato; controlla rapporto e punto di ritaglio della foto.
- `src/App.test.jsx`: suite di regressione esistente, eseguita senza modifiche.

---

### Task 1: Applicare e verificare il ritaglio 4:3

**Files:**
- Modify: `src/styles.css:507-523`
- Verify: `src/App.test.jsx`
- Verify: `public/img_casa.jpg`

**Interfaces:**
- Consumes: `.checkin-photo`, `.checkin-photo img` e l’asset `/img_casa.jpg`.
- Produces: riquadro 4:3 con immagine ancorata in basso e portone come soggetto principale.

- [ ] **Step 1: Registrare la baseline automatica**

Run: `npm test -- --run`

Expected: 30 test PASS prima della modifica, dimostrando che l’unica variazione prevista è visiva.

- [ ] **Step 2: Applicare la modifica CSS minima**

Aggiornare le due regole in `src/styles.css`:

```css
.checkin-photo {
  aspect-ratio: 4 / 3;
}

.checkin-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 100%;
}
```

Lasciare inalterati bordi, margini, sfondo e raggi del riquadro.

- [ ] **Step 3: Eseguire suite e build**

Run: `npm test -- --run`, poi `npm run build`, infine `git diff --check`.

Expected: 30 test PASS, build Vite conclusa e nessun errore di whitespace.

- [ ] **Step 4: Verificare il risultato a 320 px**

Nell’app locale:

1. Aprire **Check-in**.
2. Leggere con `getComputedStyle` `aspect-ratio: 4 / 3`, `object-fit: cover` e `object-position: 50% 100%`.
3. Verificare assenza di overflow orizzontale.
4. Controllare visivamente che portone e civico dominino il riquadro, con poco verde.
5. Confermare che **Come entrare** sia visibile nella prima schermata e che Google Maps richieda meno scorrimento.

- [ ] **Step 5: Verificare il risultato a 430 px**

Ripetere le verifiche della Step 4 a 430×932 e confermare che **Come entrare** e il pulsante Google Maps siano visibili nella prima schermata.

- [ ] **Step 6: Committare la modifica**

```bash
git add src/styles.css
git commit -m "style: focus check-in photo on entrance"
```

- [ ] **Step 7: Controllare lo stato Git finale**

Run: `git status --short` e `git log -4 --oneline`.

Expected: worktree pulito e commit del ritaglio sopra la specifica e il piano.
