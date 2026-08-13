# Waste Rule and Deposit Point Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiungere la regola autonoma sui rifiuti, rimuovere la frase duplicata dalla cura dell'immobile e separare il deposito nel check-out.

**Architecture:** Modificare esclusivamente gli array localizzati `rules.items` e `checkout.tasks` dentro `src/content.js`. La numerazione viene già calcolata dall'ordine degli array, quindi non servono modifiche ai componenti.

**Tech Stack:** JavaScript, React, Vite.

## Global Constraints

- Aggiornare italiano e inglese.
- Il nuovo punto sui rifiuti deve essere il secondo elemento delle regole.
- Non modificare componenti, stili o altri contenuti.
- Non eseguire test automatici.
- Non creare commit o push finché l'utente non dice `pubblica`.
- Quando richiesto, pubblicare soltanto `src/content.js` con commit `edit` su `main`.
- Escludere tutti i documenti non tracciati dentro `docs/superpowers`.

---

### Task 1: Aggiornare regole e check-out

**Files:**
- Modify: `src/content.js`

**Interfaces:**
- Consumes: gli array `rules.items` e `checkout.tasks` delle lingue `it` ed `en`.
- Produces: nuova regola numero 2, regola sulla cura senza testo duplicato e due punti separati nel check-out.

- [ ] **Step 1: Inserire la regola italiana come secondo elemento**

```js
{
  title: 'Raccolta dei rifiuti',
  text: 'La raccolta dei rifiuti deve essere effettuata correttamente seguendo il calendario indicato. Se non effettuata correttamente gli addetti alla raccolta del Comune di Roma potranno fare delle multe che verranno addebitate agli ospiti della casa indipendentemente da chi ha sbagliato, quindi ogni ospite è responsabile per la corretta raccolta.',
},
```

- [ ] **Step 2: Inserire la regola inglese come secondo elemento**

```js
{
  title: 'Waste collection',
  text: 'Waste must be collected correctly according to the indicated schedule. If it is not done correctly, Rome City Council waste collection staff may issue fines that will be charged to the guests of the house regardless of who made the mistake; therefore, every guest is responsible for correct waste collection.',
},
```

- [ ] **Step 3: Rimuovere la frase duplicata dalle regole sulla cura**

Nella versione italiana rimuovere soltanto:

```text
È obbligatorio rispettare le regole per la raccolta della spazzatura come da calendario.
```

Nella versione inglese rimuovere soltanto:

```text
You must follow the waste collection rules shown on the schedule.
```

- [ ] **Step 4: Separare le due istruzioni del check-out**

Versione italiana:

```js
tasks: [
  'Ricordati di lasciare le chiavi come concordato con l’Host.',
  'Il deposito ti verrà restituito entro 45 giorni dal check-out.',
],
```

Versione inglese:

```js
tasks: [
  'Remember to leave the keys as agreed with the Host.',
  'Your deposit will be returned within 45 days of check-out.',
],
```

- [ ] **Step 5: Controllare il diff senza test automatici**

```powershell
git diff -- src/content.js
```

Verificare che il diff includa soltanto i contenuti descritti nelle Step 1-4 e fermarsi prima di staging, commit e push.
