# Checkout Instructions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sostituire i testi dimostrativi del check-out con le istruzioni approvate in italiano e inglese.

**Architecture:** Modificare esclusivamente i dati localizzati delle due sezioni `checkout` in `src/content.js`. La struttura e i componenti esistenti restano invariati.

**Tech Stack:** JavaScript, React, Vite.

## Global Constraints

- Inserire un solo punto nella sezione `Un ultimo controllo` / `One last check`.
- Non inserire la frase relativa a oggetti personali o cibo.
- Non modificare l'icona WhatsApp, componenti o stili.
- Non eseguire test automatici.
- Pubblicare su `main` con messaggio di commit esatto `edit`.
- Non includere i documenti non tracciati dentro `docs/superpowers`.

---

### Task 1: Aggiornare e pubblicare le istruzioni di check-out

**Files:**
- Modify: `src/content.js`

**Interfaces:**
- Consumes: le proprietà `time` e `tasks` delle sezioni `checkout` italiana e inglese.
- Produces: i testi approvati visualizzati dal componente `Checkout` esistente.

- [ ] **Step 1: Sostituire i testi italiani**

```js
time: 'Ricordati di comunicare all’Host il giorno e l’ora in cui lascerai la casa almeno una settimana prima.',
tasks: [
  'Ricordati di lasciare le chiavi come concordato con l’Host. Il deposito ti verrà restituito entro 45 giorni dal check-out.',
],
```

- [ ] **Step 2: Sostituire i testi inglesi**

```js
time: 'Remember to tell the Host the day and time you will leave the house at least one week in advance.',
tasks: [
  'Remember to leave the keys as agreed with the Host. Your deposit will be returned within 45 days of check-out.',
],
```

- [ ] **Step 3: Controllare il diff senza test automatici**

```powershell
git diff -- src/content.js
```

Verificare che il diff riguardi soltanto `time` e `tasks` delle due sezioni `checkout`.

- [ ] **Step 4: Pubblicare soltanto il file di produzione**

```powershell
git add -- src/content.js
git commit -m "edit"
git push origin main
```
