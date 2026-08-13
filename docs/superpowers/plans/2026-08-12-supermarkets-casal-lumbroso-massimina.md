# Casal Lumbroso–Massimina Supermarkets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Italian and English supermarket placeholders with five real supermarkets in Casal Lumbroso and Massimina.

**Architecture:** Preserve the existing `groceries` section identifier and `items` data interface consumed by `PlaceList`. Change only localized content in `src/content.js`; existing components and styles continue rendering the cards and Google Maps actions.

**Tech Stack:** JavaScript, React content data, Google Maps search URLs.

## Global Constraints

- Modify only `src/content.js`.
- Preserve section order, the `groceries` identifier, and the `items` shape `{ name, description, distance, map }`.
- Use exactly five cards in this order: Elite Supermercati, Eurospin, Lidl, Conad, Heaven Supermarket.
- Show the street address as `description` and the neighborhood as `distance`.
- Do not show opening hours or travel times.
- Provide equivalent Italian and English sections.
- Do not run automated tests or builds.
- Do not commit or push until the user says `pubblica`; the eventual commit message is `edit`.

---

### Task 1: Replace localized supermarket placeholders

**Files:**
- Modify: `src/content.js:236-263`
- Modify: `src/content.js:486-494`

**Interfaces:**
- Consumes: the existing `PlaceList` contract for `section.items`.
- Produces: five Italian and five English `{ name, description, distance, map }` records.

- [ ] **Step 1: Replace the Italian subtitle and items**

Set the subtitle to `Supermercati a Casal Lumbroso e Massimina` and use:

```js
items: [
  {
    name: 'Elite Supermercati',
    description: 'Via della Massimilla, 4/6/8 - Roma',
    distance: 'Massimina',
    map: 'https://www.google.com/maps/search/?api=1&query=Elite%20Supermercati%20Via%20della%20Massimilla%204%206%208%20Roma',
  },
  {
    name: 'Eurospin',
    description: 'Via Aurelia, 1303 - Roma',
    distance: 'Massimina',
    map: 'https://www.google.com/maps/search/?api=1&query=Eurospin%20Via%20Aurelia%201303%20Roma',
  },
  {
    name: 'Lidl',
    description: 'Via Aurelia, 1311 - Roma',
    distance: 'Massimina',
    map: 'https://www.google.com/maps/search/?api=1&query=Lidl%20Via%20Aurelia%201311%20Roma',
  },
  {
    name: 'Conad',
    description: 'Via Vittorino Cannavina, 5 - Roma',
    distance: 'Massimina',
    map: 'https://www.google.com/maps/search/?api=1&query=Conad%20Via%20Vittorino%20Cannavina%205%20Roma',
  },
  {
    name: 'Heaven Supermarket',
    description: 'Via della Massimilla, 59/61 - Roma',
    distance: 'Casal Lumbroso–Massimina',
    map: 'https://www.google.com/maps/search/?api=1&query=Heaven%20Supermarket%20Via%20della%20Massimilla%2059%2061%20Roma',
  },
]
```

- [ ] **Step 2: Replace the English subtitle and items**

Set the subtitle to `Supermarkets in Casal Lumbroso and Massimina`. Use the same five records, names, addresses, zones, ordering, and Maps URLs as the Italian section; street names and commercial names remain unchanged.

- [ ] **Step 3: Perform static verification only**

Run:

```powershell
git diff --check -- src/content.js
rg -n "Elite Supermercati|Eurospin|Lidl|Conad|Heaven Supermarket|DA PERSONALIZZARE.*Supermercato|DA PERSONALIZZARE.*Grocery|DA PERSONALIZZARE.*Market" src/content.js
git diff --stat -- src/content.js
```

Expected: no whitespace errors; all five stores appear twice; no previous supermarket placeholder remains; only `src/content.js` has a production change for this task. Do not run tests or builds, and do not commit.
