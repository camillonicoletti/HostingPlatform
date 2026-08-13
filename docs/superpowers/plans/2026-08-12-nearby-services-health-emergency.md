# Nearby Services, Transport, Health and Emergency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aggiornare in italiano e inglese banca e posta, trasporti, emergenze, farmacia e ospedali con i contenuti approvati.

**Architecture:** Conservare gli identificativi delle sezioni e la navigazione esistenti, aggiornando soprattutto i dati localizzati in `src/content.js`. Riutilizzare `UsefulNumbersPanel` per banca/posta, servizi di trasporto ed emergenze; estendere `TransportPanel` tramite `children` e modificare soltanto il collegamento telefonico in `HealthPanel`.

**Tech Stack:** React, JSX, JavaScript, Vite, dati localizzati in un modulo JavaScript.

## Global Constraints

- Aggiornare tutti i nuovi contenuti sia in italiano sia in inglese.
- La sezione Emergenze deve contenere soltanto 112 e Guardia medica 116117.
- La sezione Trasporti deve conservare la linea 906 e aggiungere Taxi/ITTAXI e ATAC.
- La sezione `food` deve mantenere l'identificativo interno ma mostrare `Banche e Ufficio postale` / `Banks and Post Office`.
- Non aggiungere dipendenze o stili.
- Come richiesto dall'utente, non eseguire test automatici.
- Non creare commit e non eseguire push finché l'utente non dice `pubblica`; a quel punto usare il messaggio di commit esatto `edit`.
- Non includere nel commit i documenti non tracciati dentro `docs/superpowers`.

---

### Task 1: Aggiornare tutti i contenuti localizzati

**Files:**
- Modify: `src/content.js`

**Interfaces:**
- Consumes: la struttura esistente `guide.sections`, `section.contacts`, `section.lines`, `section.pharmacies`, `section.hospitals` e `guide.emergency`.
- Produces: `section.contacts: Array<ContactCard>` per `food` e `transport`; `guide.emergency.contacts: Array<ContactCard>`; dati sanitari reali in entrambe le lingue.

- [ ] **Step 1: Sostituire la sezione italiana `food` con banca e posta**

Usare esattamente questa struttura, mantenendo `id: 'food'`:

```js
{
  id: 'food',
  title: 'Banche e Ufficio postale',
  subtitle: 'Banca e ufficio postale in zona',
  contacts: [
    {
      name: 'BCC Roma – Agenzia Massimina',
      badge: 'Banca',
      description: 'Via della Massimilla, 14 - Roma',
      actions: [
        { label: 'Chiama 06 52866051', href: 'tel:0652866051' },
        {
          label: 'Apri in Google Maps',
          href: 'https://www.google.com/maps/search/?api=1&query=BCC%20Roma%20Agenzia%20Massimina%20Via%20della%20Massimilla%2014%20Roma',
        },
      ],
    },
    {
      name: 'Poste Italiane – Ufficio Postale Roma 140',
      badge: 'Ufficio postale',
      description: 'Via della Massimilla, 75 - Roma',
      actions: [
        { label: 'Chiama 06 6693562', href: 'tel:066693562' },
        {
          label: 'Apri in Google Maps',
          href: 'https://www.google.com/maps/search/?api=1&query=Poste%20Italiane%20Roma%20140%20Via%20della%20Massimilla%2075%20Roma',
        },
      ],
    },
  ],
}
```

- [ ] **Step 2: Sostituire la sezione inglese `food` con la versione tradotta**

Mantenere nomi propri, indirizzi, telefoni e collegamenti invariati; usare:

```js
title: 'Banks and Post Office',
subtitle: 'Nearby bank and post office',
```

Usare i badge `Bank` e `Post office` e le azioni `Call 06 52866051`, `Call 06 6693562` e `Open in Google Maps`.

- [ ] **Step 3: Aggiungere Taxi/ITTAXI e ATAC alle sezioni Trasporti italiana e inglese**

Subito dopo `lines`, aggiungere `contacts`. Versione italiana:

```js
contacts: [
  {
    name: 'Taxi e ITTAXI',
    badge: '06 3570',
    description: 'Chiama il radiotaxi oppure prenota dall’app ITTAXI.',
    actions: [
      { label: 'Chiama 06 3570', href: 'tel:063570' },
      { label: 'Scarica App ITTAXI', href: 'https://www.ittaxi.it/' },
    ],
  },
  {
    name: 'App ATAC Roma',
    badge: 'iOS · Android',
    description: 'Consulta trasporti pubblici, fermate, orari e tempi di arrivo a Roma.',
    actions: [
      {
        label: 'Scarica App ATAC Roma',
        href: 'https://www.atac.roma.it/biglietti-e-abbonamenti/app-atac-roma',
      },
    ],
  },
],
```

Versione inglese: `Taxi and ITTAXI`, `Call the radio taxi or book through the ITTAXI app.`, `Call 06 3570`, `Download ITTAXI App`, `ATAC Roma App`, `Check public transport, stops, schedules and arrival times in Rome.` e `Download ATAC Roma App`.

- [ ] **Step 4: Sostituire i vecchi campi Emergenze con due sole schede**

Versione italiana:

```js
emergency: {
  title: 'Emergenze',
  intro: 'Chiama il 112 per le emergenze e il 116117 per l’assistenza medica non urgente fuori orario.',
  contacts: [
    {
      name: 'Emergenze',
      badge: '112',
      description: 'Numero unico europeo per le emergenze.',
      actions: [{ label: 'Chiama 112', href: 'tel:112' }],
    },
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
  ],
},
```

Versione inglese: titolo `Emergencies`; introduzione `Call 112 for emergencies and 116117 for non-urgent medical care outside regular hours.`; nomi `Emergencies` e `Out-of-hours medical service`; azioni `Call 112` e `Call 116117`; mantenere le tre traduzioni degli orari già presenti nella sezione inglese `food`.

- [ ] **Step 5: Sostituire tutti i segnaposto sanitari in italiano e inglese**

Usare gli stessi nomi, indirizzi, zone, telefoni e mappe in entrambe le lingue. Tradurre soltanto le descrizioni dei servizi:

```js
pharmacies: [
  {
    name: 'Farmacia Buccella',
    description: 'Via Aurelia, 1297 - Roma',
    distance: 'Massimina–Casal Lumbroso',
    phone: '+39 06 6618 0089',
    map: 'https://www.google.com/maps/search/?api=1&query=Farmacia%20Buccella%20Via%20Aurelia%201297%20Roma',
  },
],
hospitals: [
  {
    name: 'Aurelia Hospital',
    description: 'Via Aurelia, 860 - Roma · Pronto Soccorso DEA di 1° livello',
    distance: 'Aurelia',
    phone: '+39 06 6649 21',
    map: 'https://www.google.com/maps/search/?api=1&query=Aurelia%20Hospital%20Via%20Aurelia%20860%20Roma',
  },
  {
    name: 'Policlinico Universitario Agostino Gemelli IRCCS',
    description: 'Largo Agostino Gemelli, 8 - Roma · Pronto Soccorso',
    distance: 'Monte Mario',
    phone: '+39 06 3015 1',
    map: 'https://www.google.com/maps/search/?api=1&query=Policlinico%20Gemelli%20Largo%20Agostino%20Gemelli%208%20Roma',
  },
],
```

Nella versione inglese usare `Emergency Department, Level 1 DEA` e `Emergency Department` nelle due descrizioni.

### Task 2: Riutilizzare le schede contatto in Trasporti ed Emergenze

**Files:**
- Modify: `src/components/SectionContent.jsx`
- Modify: `src/components/TransportPanel.jsx`

**Interfaces:**
- Consumes: `section.contacts` e `guide.emergency.contacts` creati nella Task 1.
- Produces: `TransportPanel({ section, guide, children })` e pannelli contatto visualizzati tramite `UsefulNumbersPanel({ items })`.

- [ ] **Step 1: Rendere `TransportPanel` capace di mostrare contenuto aggiuntivo**

Cambiare la firma e racchiudere il risultato in un fragment:

```jsx
export default function TransportPanel({ section, guide, children }) {
  return (
    <>
      <div className="bus-lines">
        {section.lines.map((line) => (
          <article
            className="bus-line"
            data-testid="bus-line"
            key={line.name}
            style={{ '--line-color': line.color }}
          >
            <header className="bus-line__header">
              <span className="bus-line__badge">
                <Icon name="bus" />
                {line.name}
              </span>
            </header>
            <dl className="bus-line__details">
              <div>
                <dt>{section.stopLabel}</dt>
                <dd>{line.stop}</dd>
              </div>
              <div>
                <dt>{section.directionLabel}</dt>
                <dd>{line.direction}</dd>
              </div>
              <div>
                <dt>{section.frequencyLabel}</dt>
                <dd>{line.frequency}</dd>
              </div>
            </dl>
            <ol className="route-strip">
              {line.stops.map((stop, index) => (
                <li key={stop} aria-current={index === 0 ? 'location' : undefined}>
                  <span className="route-stop__dot" aria-hidden="true" />
                  <span>{stop}</span>
                </li>
              ))}
            </ol>
            <div className="bus-line__actions">
              <ExternalLink href={line.moovit}>{section.moovit}</ExternalLink>
              <ExternalLink href={line.map}>{guide.maps}</ExternalLink>
            </div>
          </article>
        ))}
      </div>
      {children}
    </>
  );
}
```

- [ ] **Step 2: Visualizzare i contatti trasporto sotto la linea 906**

Nel caso `transport` di `SectionContent`, usare:

```jsx
case 'transport':
  return (
    <TransportPanel section={section} guide={guide}>
      <UsefulNumbersPanel items={section.contacts} />
    </TransportPanel>
  );
```

- [ ] **Step 3: Sostituire il vecchio pannello Emergenze**

Rimuovere la struttura che mostra telefono Host e contatto locale. Usare:

```jsx
function Emergency({ guide }) {
  return <UsefulNumbersPanel items={guide.emergency.contacts} />;
}
```

L'introduzione non deve essere ripetuta nel componente perché `App.jsx` la passa già come descrizione dello `Sheet`.

### Task 3: Rendere cliccabili i telefoni sanitari

**Files:**
- Modify: `src/components/HealthPanel.jsx`

**Interfaces:**
- Consumes: `item.phone: string` definito per Farmacia Buccella, Aurelia Hospital e Policlinico Gemelli.
- Produces: collegamenti telefonici `tel:` senza spazi, mantenendo visibile il numero formattato.

- [ ] **Step 1: Derivare il collegamento telefonico nella scheda sanitaria**

All'inizio di `HealthCard`, aggiungere:

```jsx
const phoneHref = item.phone
  ? `tel:${item.phone.replace(/[^\d+]/g, '')}`
  : null;
```

- [ ] **Step 2: Trasformare il numero visibile in un collegamento**

Sostituire il testo del numero con:

```jsx
{phoneHref ? (
  <p className="health-card__phone">
    <strong>{section.phoneLabel}:</strong>{' '}
    <a href={phoneHref}>{item.phone}</a>
  </p>
) : null}
```

### Task 4: Revisione finale senza test automatici

**Files:**
- Review: `src/content.js`
- Review: `src/components/SectionContent.jsx`
- Review: `src/components/TransportPanel.jsx`
- Review: `src/components/HealthPanel.jsx`

**Interfaces:**
- Consumes: tutte le modifiche delle Task 1–3.
- Produces: insieme coerente di soli quattro file di produzione pronti per la pubblicazione su richiesta.

- [ ] **Step 1: Controllare il diff dei soli file di produzione**

Eseguire:

```powershell
git diff -- src/content.js src/components/SectionContent.jsx src/components/TransportPanel.jsx src/components/HealthPanel.jsx
```

Verificare visivamente che non restino contenuti dimostrativi nelle sezioni sanitarie, che 112 e 116117 compaiano soltanto nelle emergenze e che Taxi/ATAC siano dentro `transport`.

- [ ] **Step 2: Fermarsi prima della pubblicazione**

Non aggiungere file all'indice Git. Quando l'utente dirà `pubblica`, aggiungere soltanto i quattro file di produzione, creare il commit `edit` e inviare `main` a `origin/main`.
