# Useful Numbers and Apps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the restaurant placeholders in “Numeri e App Utili” with bilingual cards for Guardia medica, emergency services, taxi/ITTAXI, and the official ATAC Roma app.

**Architecture:** Keep the existing `food` section identifier so navigation remains unchanged, but replace its `places` payload with purpose-built `contacts`. Render those contacts through a dedicated component and reuse the current card visual language with small schedule/action additions.

**Tech Stack:** React, JavaScript, CSS, Vite.

## Global Constraints

- Preserve the current Italian/English language switch.
- Preserve the existing section order and internal `food` identifier.
- Use `tel:` links for 116117, 112, and 06 3570.
- Link ITTAXI to `https://www.ittaxi.it/`.
- Link ATAC Roma to the official page `https://www.atac.roma.it/biglietti-e-abbonamenti/app-atac-roma`, which provides App Store and Google Play downloads.
- Do not run automated tests, as explicitly requested by the user.
- Do not commit or push until the user says `pubblica`.

---

### Task 1: Replace restaurant data with bilingual useful contacts

**Files:**
- Modify: `src/content.js:115-156`
- Modify: `src/content.js:394-404`

**Interfaces:**
- Produces: `section.contacts`, an array of `{ name, badge, description, hours?, actions }` objects.
- Produces: each action as `{ label, href }`, consumed by `UsefulNumbersPanel`.

- [ ] **Step 1: Replace the Italian placeholders**

Use four contacts in this exact order:

```js
contacts: [
  {
    name: 'Guardia medica',
    badge: '116117',
    description: 'Servizio di continuità assistenziale.',
    hours: [
      'Notti feriali e festive: dalle 20:00 alle 08:00.',
      'Sabato e giorni prefestivi: dalle 10:00 alle 20:00.',
      'Domenica e giorni festivi: dalle 08:00 alle 20:00.',
    ],
    actions: [{ label: 'Chiama 116117', href: 'tel:116117' }],
  },
  {
    name: 'Emergenze',
    badge: '112',
    description: 'Numero unico europeo per le emergenze.',
    actions: [{ label: 'Chiama 112', href: 'tel:112' }],
  },
  {
    name: 'Taxi',
    badge: '06 3570',
    description: 'Chiama il radiotaxi oppure prenota dall’app.',
    actions: [
      { label: 'Chiama 06 3570', href: 'tel:063570' },
      { label: 'Scarica App ITTAXI', href: 'https://www.ittaxi.it/' },
    ],
  },
  {
    name: 'App ATAC Roma',
    badge: 'iOS · Android',
    description: 'Consulta trasporti pubblici, orari e tempi di arrivo a Roma.',
    actions: [{ label: 'Scarica App ATAC Roma', href: 'https://www.atac.roma.it/biglietti-e-abbonamenti/app-atac-roma' }],
  },
]
```

- [ ] **Step 2: Add the equivalent English contacts**

Translate only the visible copy: `Out-of-hours medical service`, `Emergencies`, `Taxi`, `ATAC Roma App`, the three schedule lines, descriptions, and actions (`Call`, `Download`). Keep all numbers, times, URLs, and app names unchanged.

- [ ] **Step 3: Update both subtitles**

Use `Contatti e servizi essenziali per il soggiorno` in Italian and `Essential contacts and services for your stay` in English.

### Task 2: Render useful-number cards

**Files:**
- Modify: `src/components/SectionContent.jsx:71-91`
- Modify: `src/components/SectionContent.jsx:163-164`

**Interfaces:**
- Consumes: `section.contacts` from Task 1.
- Produces: `UsefulNumbersPanel({ items })`.

- [ ] **Step 1: Add `UsefulNumbersPanel` next to `PlaceList`**

Render every contact as a `place-card`, show `badge` in the existing `distance` pill, render `hours` only when present, and map every action to an anchor. Add `target="_blank" rel="noopener noreferrer"` only when `href` starts with `http`; telephone links remain direct `tel:` links. Include the existing arrow icon in every action.

```jsx
function UsefulNumbersPanel({ items }) {
  return (
    <ul className="place-list useful-list">
      {items.map((item) => (
        <li className="place-card useful-card" key={item.name}>
          <div className="place-card__topline">
            <h3>{item.name}</h3>
            <span className="distance">{item.badge}</span>
          </div>
          <p>{item.description}</p>
          {item.hours && (
            <ul className="useful-hours">
              {item.hours.map((hours) => <li key={hours}>{hours}</li>)}
            </ul>
          )}
          <div className="useful-actions">
            {item.actions.map((action) => {
              const isExternal = action.href.startsWith('http');
              return (
                <a className="text-link" href={action.href} key={action.href} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span>{action.label}</span>
                  <Icon name="arrow" />
                </a>
              );
            })}
          </div>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: Route the section to the new component**

```jsx
case 'food':
  return <UsefulNumbersPanel items={section.contacts} />;
```

### Task 3: Add compact schedule and action styling

**Files:**
- Modify: `src/styles.css:900-944`

**Interfaces:**
- Consumes: `.useful-hours` and `.useful-actions` emitted by Task 2.

- [ ] **Step 1: Add schedule styles**

Add a compact, readable bulleted list using `var(--night-soft)`, `0.78rem` text, and `1.5` line height.

```css
.useful-hours {
  display: grid;
  gap: 5px;
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--night-soft);
  font-size: 0.78rem;
  line-height: 1.5;
}
```

- [ ] **Step 2: Add action layout styles**

```css
.useful-actions {
  display: grid;
  gap: 2px;
  margin-top: 8px;
}

.useful-actions .text-link {
  justify-content: space-between;
  margin-top: 0;
}
```

### Task 4: Perform static verification only

**Files:**
- Inspect: `src/content.js`
- Inspect: `src/components/SectionContent.jsx`
- Inspect: `src/styles.css`

- [ ] **Step 1: Inspect the diff**

Run `git diff -- src/content.js src/components/SectionContent.jsx src/styles.css` and verify that restaurant placeholders are gone from the `food` sections, all four cards exist in both languages, and no unrelated files changed.

- [ ] **Step 2: Confirm links and copy statically**

Run `rg -n "116117|tel:112|063570|ittaxi|app-atac-roma|useful-hours|useful-actions" src` and verify all required values are present. Do not run test or build commands.

