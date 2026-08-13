# Checkout Text and WhatsApp Icon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Accorciare l'istruzione di check-out e mostrare un'icona WhatsApp SVG riconoscibile.

**Architecture:** Aggiornare i due testi localizzati in `src/content.js`. Gestire il caso `whatsapp` direttamente in `Icon.jsx`, restituendo un SVG che eredita colore e dimensioni dal contenitore esistente.

**Tech Stack:** React, JSX, JavaScript, SVG inline.

## Global Constraints

- Non modificare il collegamento o l'etichetta `WhatsApp host`.
- Non aggiungere dipendenze o stili.
- Non eseguire test automatici.
- Pubblicare soltanto i due file di produzione con commit `edit` su `main`.
- Escludere tutti i documenti non tracciati in `docs/superpowers`.

---

### Task 1: Aggiornare testo e icona

**Files:**
- Modify: `src/content.js`
- Modify: `src/components/Icon.jsx`

**Interfaces:**
- Consumes: `checkout.time` e `Icon({ name: 'whatsapp' })`.
- Produces: testo abbreviato IT/EN e SVG WhatsApp decorativo.

- [ ] **Step 1: Accorciare i testi del check-out**

```js
time: 'Ricordati di comunicare all’Host il giorno e l’ora in cui lascerai la casa.'
time: 'Remember to tell the Host the day and time you will leave the house.'
```

- [ ] **Step 2: Rendere l'icona WhatsApp come SVG**

In `Icon`, quando `name === 'whatsapp'`, mostrare un SVG con `viewBox="0 0 24 24"`, `fill="currentColor"`, larghezza e altezza `1em`, usando il tracciato del simbolo WhatsApp. Per gli altri nomi conservare i glifi esistenti.

- [ ] **Step 3: Controllare il diff senza test automatici**

```powershell
git diff -- src/content.js src/components/Icon.jsx
```

- [ ] **Step 4: Pubblicare**

```powershell
git add -- src/content.js src/components/Icon.jsx
git commit -m "edit"
git push origin main
```
