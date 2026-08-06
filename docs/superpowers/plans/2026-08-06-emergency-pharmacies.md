# Emergency Pharmacies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the sixth `Cosa vedere` card with a bilingual emergency-pharmacies card while preserving the eight-card mobile layout and position.

**Architecture:** Replace the `explore` content model with `pharmacies` and reuse the existing nearby-place list renderer. Keep all editable pharmacy data in `src/content.js`, then update the icon mapping, documentation, and behavioral tests.

**Tech Stack:** React 19, Vite 7, Vitest, Testing Library, CSS.

## Global Constraints

- Keep the new card in the sixth grid position.
- Use `Farmacie di emergenza` in Italian and `Emergency pharmacies` in English.
- Each pharmacy exposes `name`, `description`, `distance`, and `map`.
- Demonstration values use `[DA PERSONALIZZARE]`.
- Do not change the other seven cards or the quick-actions bar.

---

### Task 1: Replace the explore section with emergency pharmacies

**Files:**
- Modify: `src/content.test.js`
- Modify: `src/App.test.jsx`
- Modify: `src/content.js`
- Modify: `src/components/Icon.jsx`
- Modify: `src/components/SectionContent.jsx`
- Modify: `README.md`

**Interfaces:**
- Consumes: `guide.sections`, `GuideGrid`, and `PlaceList` using the existing section data flow.
- Produces: a section with `id: 'pharmacies'` and `items: Array<{name, description, distance, map}>` in both locales.

- [ ] **Step 1: Write the failing tests**

Update the expected section identifiers to include `pharmacies` in sixth position and the Italian card order to contain `Farmacie di emergenza`. Add the new card to the open/close test and verify that its sheet contains Google Maps links.

```jsx
expect(sectionIds).toEqual([
  'checkin', 'wifi', 'rules', 'food',
  'transport', 'pharmacies', 'groceries', 'checkout',
]);

expect(cardLabels).toEqual([
  'Check-in', 'Wi-Fi', 'Regole casa', 'Dove mangiare',
  'Trasporti vicini', 'Farmacie di emergenza',
  'Supermercati', 'Check-out',
]);
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run src/content.test.js src/App.test.jsx`

Expected: FAIL because production content still exposes `explore` and `Cosa vedere`.

- [ ] **Step 3: Implement the minimal replacement**

In `src/content.js`, replace both `explore` objects with `pharmacies`, store up to six editable pharmacy entries under `items`, and retain the current index. Map `pharmacies` to a pharmacy cross icon in `Icon.jsx`. Route `pharmacies` through `PlaceList` with `type="nearby"` in `SectionContent.jsx`. Update the README identifier list and home-card description.

```js
{
  id: 'pharmacies',
  title: 'Farmacie di emergenza',
  subtitle: 'Farmacie e turni vicini',
  items: [
    {
      name: '[DA PERSONALIZZARE] Farmacia di turno',
      description: '[DA PERSONALIZZARE] Verificare telefonicamente apertura e turno.',
      distance: '[DA PERSONALIZZARE] 500 m',
      map: 'https://www.google.com/maps/search/?api=1&query=farmacia',
    },
  ],
}
```

- [ ] **Step 4: Run tests and build**

Run: `npm test -- --run && npm run build && git diff --check`

Expected: 17 tests pass, Vite build succeeds, and the diff check returns no output.

- [ ] **Step 5: Verify the mobile layout**

At `360×740`, verify eight cards, no horizontal or vertical overflow, the sixth label is `Farmacie di emergenza`, and the quick-actions bar remains below the grid.

- [ ] **Step 6: Commit**

```bash
git add src/content.test.js src/App.test.jsx src/content.js src/components/Icon.jsx src/components/SectionContent.jsx README.md
git commit -m "feat: replace sightseeing with emergency pharmacies"
```
