# House Rules Page One Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the demo house rules with all eight rules from page 1 of the supplied PDF, in Italian and English.

**Architecture:** Keep the existing `section.items` data model and numbered `Home` list. Replace only the bilingual rule data and remove the five-item rendering cap so all eight entries appear.

**Tech Stack:** React 19, JavaScript, Vite

## Global Constraints

- Use only the content on page 1 of `C:/Users/studi/Downloads/🏡 REGOLAMENTO DELLA CASA.pdf`.
- Preserve the order of the eight rules.
- Provide complete Italian content and a faithful, natural English translation.
- Do not change visual styling or unrelated sections.
- Do not run automated tests, as requested by the user.

---

### Task 1: Replace the bilingual house-rule content

**Files:**
- Modify: `src/content.js`

**Interfaces:**
- Consumes: the existing `content.locale.it.sections` and `content.locale.en.sections` arrays.
- Produces: eight `{ title: string, text: string }` entries for each `rules` section.

- [ ] **Step 1: Replace the Italian demo items**

Use these exact titles and descriptions:

```js
items: [
  {
    title: 'Rispetto degli altri',
    text: 'Mantenere sempre un comportamento educato e rispettoso. Evitare schiamazzi, musica ad alto volume e rumori molesti, soprattutto nelle ore serali e notturne. Rispettare la privacy degli altri ospiti. Si raccomanda di mantenere un comportamento rispettoso anche nelle aree condominiali, evitando rumori e comportamenti che possano arrecare disturbo ai vicini.',
  },
  {
    title: 'Pulizia della propria stanza',
    text: 'Ogni ospite è tenuto a mantenere la propria camera in ordine e pulita durante il soggiorno. Non lasciare cibo deperibile o rifiuti all’interno della stanza. Prima della partenza verificare di non aver dimenticato effetti personali.',
  },
  {
    title: 'Utilizzo degli spazi comuni',
    text: 'Gli spazi comuni sono a disposizione di tutti gli ospiti. Si chiede di lasciarli puliti e ordinati dopo ogni utilizzo e di riporre eventuali oggetti personali al termine dell’uso.',
  },
  {
    title: 'Cucina',
    text: 'Lavare, asciugare e riporre stoviglie, pentole e utensili subito dopo l’utilizzo. Pulire il piano di lavoro e gli elettrodomestici utilizzati. Conservare gli alimenti in modo ordinato e nel rispetto degli altri ospiti. Non utilizzare alimenti appartenenti ad altri ospiti.',
  },
  {
    title: 'Bagno',
    text: 'Lasciare il bagno pulito dopo ogni utilizzo. Evitare sprechi d’acqua. Non gettare nel WC salviette, assorbenti o altri materiali non idonei.',
  },
  {
    title: 'Sicurezza',
    text: 'Spegnere le luci e gli apparecchi elettrici quando non necessari o prima di uscire. Chiudere porte e finestre quando si lascia l’abitazione. Avere cura delle chiavi di casa e non consegnarle a persone estranee.',
  },
  {
    title: 'Divieto di fumo',
    text: 'È vietato fumare all’interno dell’abitazione, comprese le camere e gli spazi comuni, mentre è possibile fumare all’esterno in terrazza.',
  },
  {
    title: 'Cura dell’immobile',
    text: 'Trattare con cura arredi, elettrodomestici e dotazioni della casa. Eventuali danni devono essere comunicati tempestivamente. È vietato spostare mobili senza autorizzazione. È obbligatorio rispettare le regole per la raccolta della spazzatura come da calendario. Qualsiasi problema relativo alla casa, come guasti, malfunzionamenti o situazioni particolari, deve essere comunicato tempestivamente al proprietario, così da poter intervenire nel più breve tempo possibile.',
  },
],
```

- [ ] **Step 2: Replace the English demo items**

Use these matching translations:

```js
items: [
  {
    title: 'Respect for others',
    text: 'Always behave politely and respectfully. Avoid shouting, loud music and disturbing noise, especially in the evening and at night. Respect the privacy of other guests. Please also behave respectfully in the shared areas of the building, avoiding noise and conduct that may disturb the neighbours.',
  },
  {
    title: 'Keeping your room clean',
    text: 'Each guest must keep their room tidy and clean during their stay. Do not leave perishable food or rubbish in the room. Before leaving, check that you have not forgotten any personal belongings.',
  },
  {
    title: 'Use of shared spaces',
    text: 'Shared spaces are available to all guests. Please leave them clean and tidy after each use and put away any personal belongings when you have finished.',
  },
  {
    title: 'Kitchen',
    text: 'Wash, dry and put away dishes, pots and utensils immediately after use. Clean the worktop and any appliances used. Store food neatly and with consideration for other guests. Do not use food belonging to other guests.',
  },
  {
    title: 'Bathroom',
    text: 'Leave the bathroom clean after each use. Avoid wasting water. Do not flush wipes, sanitary products or other unsuitable materials down the toilet.',
  },
  {
    title: 'Safety',
    text: 'Turn off lights and electrical appliances when they are not needed or before going out. Close doors and windows when leaving the property. Take care of the house keys and do not give them to anyone else.',
  },
  {
    title: 'No smoking',
    text: 'Smoking is prohibited inside the property, including in the bedrooms and shared spaces. Smoking is permitted outside on the terrace.',
  },
  {
    title: 'Care of the property',
    text: 'Treat the furniture, appliances and household equipment with care. Report any damage promptly. Do not move furniture without permission. You must follow the waste collection rules shown on the schedule. Any problem involving the property, including faults, malfunctions or unusual situations, must be reported promptly to the owner so that it can be dealt with as quickly as possible.',
  },
],
```

- [ ] **Step 3: Check content completeness**

Run:

```powershell
rg -n "Rispetto degli altri|Cura dell’immobile|Respect for others|Care of the property" src/content.js
```

Expected: all four boundary titles are present, proving both eight-item lists start and end with the required rules.

### Task 2: Display all eight rules

**Files:**
- Modify: `src/components/SectionContent.jsx`

**Interfaces:**
- Consumes: `section.items`, an array of eight rule objects.
- Produces: one numbered `<li>` for every rule object.

- [ ] **Step 1: Remove the five-item cap**

Change:

```jsx
{section.items.slice(0, 5).map((item, index) => (
```

to:

```jsx
{section.items.map((item, index) => (
```

- [ ] **Step 2: Perform static verification**

Run:

```powershell
rg -n "section\.items\.map|section\.items\.slice" src/components/SectionContent.jsx
git diff --check
```

Expected: `section.items.map` is present, `section.items.slice` is absent, and `git diff --check` exits successfully.

- [ ] **Step 3: Leave changes ready for publication**

Do not commit or push until the user says `pubblica`. At publication time, stage only `src/content.js` and `src/components/SectionContent.jsx`, create commit `edit`, and push `main` to `origin/main`.
