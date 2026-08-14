# French Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add complete, persistent French support and an `FR` language button to the mobile guest guide.

**Architecture:** Extend the existing locale-object architecture with `content.locale.fr`; keep shared operational values at the top level. Extend `App` language validation and the presentational `Header` selector without adding a dependency.

**Tech Stack:** React 19, Vite, Vitest, Testing Library, CSS.

## Global Constraints

- Use professional, welcoming French with `vous`.
- Preserve names, addresses, numbers, URLs, credentials, bus routes, app names, and `HOUSE`/`Housing Anywhere` references.
- Translate every guest-facing string, including accessibility labels, errors, calendars, recycling, reviews, and emergencies.
- Keep Italian as the fallback for an invalid or unavailable stored locale.
- Keep the existing interface and make only the responsive adjustment needed for `IT | EN | FR`.

---

### Task 1: Specify French locale behavior with failing tests

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/content.test.js`

**Interfaces:**
- Consumes: `getLocalizedContent(language: string)` and the existing `Header`/`App` UI.
- Produces: regression coverage for locale code `fr`, label `Français`, persistence, section completeness, recycling, and health content.

- [ ] **Step 1: Add the failing interaction test**

Add a test that clicks the button named `Français` and asserts:

```jsx
expect(screen.getByText('Règles de la maison')).toBeVisible();
expect(document.documentElement.lang).toBe('fr');
expect(localStorage.getItem('guest-guide-language')).toBe('fr');
```

- [ ] **Step 2: Add the failing content test**

Request `getLocalizedContent('fr')` and assert the eight section IDs, `Bienvenue` copy, `Pharmacies et hôpitaux`, two hospitals, seven recycling days, `Activer les rappels`, and an exact red-highlight target of `VERRE`.

- [ ] **Step 3: Run the focused tests and confirm RED**

Run:

```bash
npm test -- --run src/App.test.jsx src/content.test.js -t "French|français|French content"
```

Expected: failures because the French button and locale do not exist.

### Task 2: Implement French selection and complete translated content

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/components/Header.jsx`
- Modify: `src/content.js`
- Modify: `src/components/RecyclingPanel.jsx`

**Interfaces:**
- Consumes: locale key `fr` and the same content shape as `it`/`en`.
- Produces: a complete `getLocalizedContent('fr')` guide and a selectable/persistent `FR` control.

- [ ] **Step 1: Accept stored French locale**

Replace the two-value stored-language check with an allowlist:

```jsx
const SUPPORTED_LANGUAGES = ['it', 'en', 'fr'];
return SUPPORTED_LANGUAGES.includes(stored) ? stored : 'it';
```

- [ ] **Step 2: Add the French control**

Append this button after `EN`:

```jsx
<button
  type="button"
  aria-label="Français"
  aria-pressed={language === 'fr'}
  onClick={() => onLanguageChange('fr')}
>
  FR
</button>
```

- [ ] **Step 3: Add the complete `fr` locale**

Add a peer object with the complete Italian/English data shape. Use these primary labels consistently:

```js
languageCode: 'fr'
languageName: 'Français'
languageSelectorLabel: 'Langue · Language'
openSection: 'Ouvrir la section'
close: 'Fermer'
maps: 'Ouvrir dans Google Maps'
copyPassword: 'Copier le mot de passe'
quickActions: {
  whatsapp: "WhatsApp de l’hôte",
  recycling: 'Tri des déchets',
  emergency: 'Urgences',
}
```

Translate the eight sections as `Check-in`, `Wi-Fi`, `Règles de la maison`, `Banques et bureau de poste`, `Transports`, `Pharmacies et hôpitaux`, `Supermarchés`, and `Check-out`. Translate every nested title, description, instruction, action label, tab label, error message, weekday, waste material, calendar message, review prompt, and accessibility label. Keep all non-copy values unchanged.

- [ ] **Step 4: Make the glass highlighter support French grammar**

Extend `RecyclingNotice` so `le ` remains unstyled and only `VERRE` receives `glass-warning`, while retaining the Italian and English behavior:

```jsx
const match = text.match(/^(.*?)(il\s+|le\s+)?(vetro|glass|verre)(.*)$/i);
```

- [ ] **Step 5: Run focused tests and confirm GREEN**

Run:

```bash
npm test -- --run src/App.test.jsx src/content.test.js -t "French|français|French content"
```

Expected: all selected tests pass.

### Task 3: Responsive selector and full verification

**Files:**
- Modify if required: `src/styles.css`

**Interfaces:**
- Consumes: the three-button `.language-switch`.
- Produces: an unclipped selector on mobile with the existing selected-state styling.

- [ ] **Step 1: Inspect the selector at mobile width**

Run the app and verify at 390 × 844 that `IT`, `EN`, and `FR` remain on one row, do not overlap the title, and preserve comfortable tap targets.

- [ ] **Step 2: Apply the minimum CSS adjustment if needed**

Reduce only selector padding/gap within the existing mobile media query; do not change card or sheet layouts.

- [ ] **Step 3: Run the full automated verification**

Run:

```bash
npm test -- --run
npm run build
git diff --check
```

Expected: zero test failures, successful production build, and no whitespace errors.
