# Transport Line 906 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two placeholder transport lines with one bilingual card for Rome bus line 906, starting from Via Tullio Ascarelli.

**Architecture:** Preserve the existing `TransportPanel` and `section.lines` structure. Change only the Italian and English transport content in `src/content.js`, reducing each `lines` array to one real line.

**Tech Stack:** React 19, JavaScript, Vite

## Global Constraints

- Show only line 906.
- Use `Via Tullio Ascarelli` as the starting point and first route item.
- Show both termini: `Valle Aurelia (Metro A - FL3)` and `Casale Lumbroso-Fontebasso`.
- Use `Consulta i tempi reali` / `Check live times` instead of a fixed frequency.
- Provide matching Italian and English content.
- Preserve the existing visual component and styling.
- Do not run automated tests, as requested by the user.

---

### Task 1: Replace the Italian transport placeholders

**Files:**
- Modify: `src/content.js`

**Interfaces:**
- Consumes: the existing Italian transport section object.
- Produces: one `lines` entry consumed unchanged by `TransportPanel`.

- [ ] **Step 1: Update section labels**

Use:

```js
subtitle: 'Linea bus vicino casa',
stopLabel: 'Punto di partenza',
directionLabel: 'Direzione',
frequencyLabel: 'Passaggi',
moovit: 'Apri orari e fermate',
```

- [ ] **Step 2: Replace both placeholder lines with line 906**

Use exactly one entry:

```js
{
  name: 'Linea 906',
  color: '#a94e34',
  stop: 'Via Tullio Ascarelli',
  direction: 'Valle Aurelia (Metro A - FL3) / Casale Lumbroso-Fontebasso',
  frequency: 'Consulta i tempi reali',
  stops: [
    'Via Tullio Ascarelli',
    'Valle Aurelia (Metro A - FL3)',
    'Casale Lumbroso-Fontebasso',
  ],
  moovit: 'https://viaggiacon.atac.roma.it/?cercaLinee=1&lineCode=906&pathCode=906R',
  map: 'https://www.google.com/maps/search/?api=1&query=fermata%20bus%20906%20Via%20Tullio%20Ascarelli%20Roma',
},
```

### Task 2: Replace the English transport placeholders

**Files:**
- Modify: `src/content.js`

**Interfaces:**
- Consumes: the existing English transport section object.
- Produces: one matching `lines` entry consumed unchanged by `TransportPanel`.

- [ ] **Step 1: Update section labels**

Use:

```js
subtitle: 'Bus line near the house',
stopLabel: 'Starting point',
directionLabel: 'Direction',
frequencyLabel: 'Service times',
moovit: 'Open times and stops',
```

- [ ] **Step 2: Replace both placeholder lines with line 906**

Use exactly one entry:

```js
{
  name: 'Line 906',
  color: '#a94e34',
  stop: 'Via Tullio Ascarelli',
  direction: 'Valle Aurelia (Metro A - FL3) / Casale Lumbroso-Fontebasso',
  frequency: 'Check live times',
  stops: [
    'Via Tullio Ascarelli',
    'Valle Aurelia (Metro A - FL3)',
    'Casale Lumbroso-Fontebasso',
  ],
  moovit: 'https://viaggiacon.atac.roma.it/?cercaLinee=1&lineCode=906&pathCode=906R',
  map: 'https://www.google.com/maps/search/?api=1&query=bus%20906%20stop%20Via%20Tullio%20Ascarelli%20Rome',
},
```

### Task 3: Perform static verification

**Files:**
- Verify: `src/content.js`

**Interfaces:**
- Consumes: the exported `content` object.
- Produces: confirmation that both languages expose one line 906 entry.

- [ ] **Step 1: Check the data structure**

Run a Node import of `src/content.js` and require:

```text
Italian lines: 1, name: Linea 906, start: Via Tullio Ascarelli
English lines: 1, name: Line 906, start: Via Tullio Ascarelli
```

- [ ] **Step 2: Check the diff**

Run:

```powershell
git diff --check -- src/content.js
```

Expected: successful exit with no whitespace errors.

- [ ] **Step 3: Leave the change ready for publication**

Do not commit or push until the user says `pubblica`. At publication time, stage only `src/content.js`, create commit `edit`, and push `main` to `origin/main`.
