# Guest Guide Local Services Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trasformare la guida CASA BAIOCCO in una guida locale bilingue con foto check-in, copia Wi-Fi animata, due linee bus, farmacie/ospedali, raccolta con promemoria e WhatsApp reale.

**Architecture:** I dati configurabili restano in `src/content.js`; i nuovi domini visuali vengono isolati in componenti React focalizzati e la logica calendario in una utility JavaScript pura. `App` mantiene la responsabilità di navigazione, Clipboard e notifiche, mentre `SectionContent` instrada soltanto verso i componenti di sezione.

**Tech Stack:** React 19, Vite 7, Vitest 3, Testing Library, CSS/SVG nativi, iCalendar generato lato browser.

## Global Constraints

- L'app resta statica: nessun backend, database, account, OAuth, chiave API o dipendenza aggiuntiva.
- Tutti i dati locali mancanti usano il prefisso letterale `[DA PERSONALIZZARE]`; solo il calendario rifiuti è dimostrativo.
- La griglia conserva esattamente otto sezioni e la barra rapida esattamente tre azioni.
- Italiano e inglese devono mantenere strutture dati parallele.
- I controlli interattivi devono avere area di tocco minima 44 px, focus visibile e testo accessibile.
- Le animazioni devono rispettare `prefers-reduced-motion: reduce`.
- I link esterni usano `target="_blank"` e `rel="noopener noreferrer"`.
- Ogni nuova funzione non banale deve essere introdotta da un test rosso osservato prima del codice di produzione.

---

## File Map

- Modify: `src/content.js` — contatti, stringhe localizzate e dati di tutte le nuove sezioni.
- Modify: `src/content.test.js` — contratto strutturale IT/EN e quantità dei dati configurabili.
- Modify: `src/App.jsx` — pannelli speciali, esito copia animata e apertura raccolta.
- Modify: `src/App.test.jsx` — flussi integrati osservabili dall'ospite.
- Modify: `src/components/SectionContent.jsx` — routing delle sezioni semplici e componenti estratti.
- Create: `src/components/CheckinPhoto.jsx` — immagine casa con fallback.
- Create: `src/components/WifiPanel.jsx` — visualizzazione password e stato hacking.
- Create: `src/components/TransportPanel.jsx` — due linee e mini-percorsi.
- Create: `src/components/HealthPanel.jsx` — tab Farmacie/Ospedali.
- Create: `src/components/RecyclingPanel.jsx` — calendario settimanale e azioni promemoria.
- Modify: `src/components/QuickActions.jsx` — Raccolta sostituisce il link Posizione.
- Modify: `src/components/Icon.jsx` — glifi `health`, `recycling`, `bus`, `hospital`.
- Create: `src/calendar.js` — date future, URL Google Calendar e file `.ics`.
- Create: `src/calendar.test.js` — test puri per ricorrenze e serializzazione.
- Modify: `src/styles.css` — layout e stati visuali nuovi.
- Modify: `README.md` — istruzioni di personalizzazione aggiornate.

---

### Task 1: Contratto contenuti e contatto WhatsApp

**Files:**
- Modify: `src/content.test.js`
- Modify: `src/content.js`
- Modify: `src/components/Icon.jsx`

**Interfaces:**
- Produces: `getLocalizedContent(language)` con sezione `health`, `transport.lines`, `recycling`, `healthLinks` e `contacts.whatsappUrl` reale.
- Consumes: nessuna nuova interfaccia.

- [ ] **Step 1: Scrivere i test rossi del contratto localizzato**

Aggiornare `src/content.test.js` perché verifichi i seguenti valori letterali in entrambe le lingue:

```js
expect(it.sections.map(({ id }) => id)).toEqual([
  'checkin', 'wifi', 'rules', 'food',
  'transport', 'health', 'groceries', 'checkout',
]);
expect(en.sections.map(({ id }) => id)).toEqual([
  'checkin', 'wifi', 'rules', 'food',
  'transport', 'health', 'groceries', 'checkout',
]);
expect(it.sections.find(({ id }) => id === 'food').title)
  .toBe('Dove mangiare nei dintorni');
expect(it.sections.find(({ id }) => id === 'transport').lines).toHaveLength(2);
expect(it.sections.find(({ id }) => id === 'health').pharmacies).toHaveLength(3);
expect(it.sections.find(({ id }) => id === 'health').hospitals).toHaveLength(2);
expect(it.contacts.whatsappUrl).toBe('https://wa.me/393477005683');
expect(it.recycling.schedule).toHaveLength(7);
```

Il guasto catturato è una lingua mancante, un identificatore vecchio o una quantità di slot diversa dalla specifica.

- [ ] **Step 2: Eseguire il test e verificare il rosso corretto**

Run: `npm test -- --run src/content.test.js`

Expected: FAIL perché `explore` è ancora presente e `health`, `recycling` e il numero reale non esistono.

- [ ] **Step 3: Implementare la struttura dati minima**

In `src/content.js`:

- impostare `whatsappDisplay: '+39 347 700 5683'` e `whatsappUrl: 'https://wa.me/393477005683'`;
- aggiungere `housePhoto: ''` e le stringhe fallback alla sezione Check-in;
- rinominare i titoli food;
- sostituire `transport.items` con due `lines`, ciascuna con `name`, `color`, `stop`, `direction`, `frequency`, `stops`, `moovit`, `map`;
- sostituire `explore` con `health`, tre `pharmacies`, due `hospitals`, etichette tab e link ufficiali;
- aggiungere `recycling` alla locale con sette righe e stringhe calendario;
- cambiare `quickActions.location` in `quickActions.recycling`.

Usare per i link ufficiali:

```js
healthLinks: {
  openPharmacies: 'https://www.comune.roma.it/web/it/numeri-utili-emergenze.page',
  emergencyRooms: 'https://www.salutelazio.it/pronto-soccorso',
}
```

Usare sei righe di raccolta con `collects: true` e la domenica con `collects: false`; `weekday` usa l'indice JavaScript 1–6 e 0 per domenica.

- [ ] **Step 4: Aggiornare i glifi**

In `Icon.jsx` sostituire `explore` con `health: '✚'`, `location` con `recycling: '♻'` e aggiungere `bus: '▰'`, `hospital: '+'`, `calendar: '□'`.

- [ ] **Step 5: Verificare verde**

Run: `npm test -- --run src/content.test.js`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/content.js src/content.test.js src/components/Icon.jsx
git commit -m "feat: define local guide content"
```

---

### Task 2: Utility promemoria calendario

**Files:**
- Create: `src/calendar.test.js`
- Create: `src/calendar.js`

**Interfaces:**
- Produces: `getNextOccurrence(weekday, now): Date`.
- Produces: `getReminderEnd(start): Date`.
- Produces: `buildGoogleCalendarUrl(item, labels, now): string`.
- Produces: `buildIcsCalendar(schedule, labels, now): string`.
- Consumes: item raccolta `{ weekday, material, collects }` e labels `{ titlePrefix, description }`.

- [ ] **Step 1: Scrivere test rosso per la prima data futura**

```js
test('uses the next week when the collection time has already passed today', () => {
  const now = new Date(2026, 7, 10, 21, 0); // lunedì
  expect(getNextOccurrence(1, now)).toEqual(new Date(2026, 7, 17, 20, 0));
});
```

Il guasto catturato è generare un evento nel passato.

- [ ] **Step 2: Eseguire e osservare rosso**

Run: `npm test -- --run src/calendar.test.js`

Expected: FAIL perché `src/calendar.js` non esiste.

- [ ] **Step 3: Implementare date future e termine a quattro mesi**

`getNextOccurrence` crea una copia di `now`, calcola la distanza modulo 7 dal giorno richiesto, imposta le 20:00 e aggiunge sette giorni se il risultato non è futuro. `getReminderEnd` usa `setMonth(start.getMonth() + 4)` senza mutare `start`.

- [ ] **Step 4: Scrivere test rossi per Google e iCalendar**

Verificare letteralmente che l'URL decodificato contenga:

```text
action=TEMPLATE
recur=RRULE:FREQ=WEEKLY;UNTIL=20261210T195959Z
```

Usare nel test un `now` in UTC senza cambio ora legale ambiguo. Per l'ICS verificare:

```js
expect(ics).toContain('BEGIN:VCALENDAR\r\nVERSION:2.0');
expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(6);
expect(ics).toContain('RRULE:FREQ=WEEKLY;UNTIL=');
expect(ics).toContain('TRIGGER:-P1D');
expect(ics).not.toContain('Nessun ritiro');
```

Il guasto catturato è un calendario non importabile, senza limite o con l'evento della domenica.

- [ ] **Step 5: Implementare serializzazione**

Usare `URLSearchParams` per Google. Per ICS usare righe CRLF, escape di backslash/virgole/punto e virgola/newline, UID deterministico per materiale/data e blocco allarme:

```text
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Promemoria raccolta differenziata
TRIGGER:-P1D
END:VALARM
```

- [ ] **Step 6: Verificare verde**

Run: `npm test -- --run src/calendar.test.js`

Expected: PASS senza warning.

- [ ] **Step 7: Commit**

```bash
git add src/calendar.js src/calendar.test.js
git commit -m "feat: generate recycling reminders"
```

---

### Task 3: Check-in fotografico e copia Wi-Fi animata

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/SectionContent.jsx`
- Create: `src/components/CheckinPhoto.jsx`
- Create: `src/components/WifiPanel.jsx`

**Interfaces:**
- Produces: `<CheckinPhoto src alt fallback />`.
- Produces: `<WifiPanel section guide copyState onCopy />` con `copyState` in `'idle' | 'copying' | 'copied' | 'error'`.
- Consumes: `App.copyPassword(): Promise<void>` aggiorna lo stato solo dopo l'esito Clipboard.

- [ ] **Step 1: Scrivere test rossi del Check-in**

Aprire Check-in e verificare che il dialogo abbia `getByText('Foto della casa in arrivo')` e che tale nodo preceda il `dt` “Come entrare”. Aggiungere un test unitario del componente che passa un URL non valido, emette `error` sull'immagine e verifica la comparsa del fallback.

Il guasto catturato è un'immagine rotta o posizionata dopo le istruzioni.

- [ ] **Step 2: Osservare rosso**

Run: `npm test -- --run src/App.test.jsx`

Expected: FAIL perché il placeholder non esiste.

- [ ] **Step 3: Implementare CheckinPhoto e ordine Arrival**

`CheckinPhoto` conserva `hasError` con `useState(false)`, azzera l'errore quando `src` cambia e rende `<img>` solo se `src && !hasError`; altrimenti rende un blocco con icona casa e fallback. In `Arrival`, dividere il `<dl>` per inserire la figura fra check-in e “Come entrare”.

- [ ] **Step 4: Scrivere test rosso copia animata**

Dopo click su “Copia password”, verificare che:

```js
expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Password'));
expect(await screen.findByRole('button', { name: 'Accesso copiato' }))
  .toBeVisible();
expect(screen.getByTestId('wifi-password')).toHaveClass('is-scrambling');
```

Usare fake timer per far terminare l'effetto e verificare il ritorno a “Copia password” e al valore reale. Il guasto catturato è una conferma falsa o uno stato che non termina.

- [ ] **Step 5: Implementare lo stato copia**

In `App` aggiungere `copyState`, impostare `copying`, poi `copied` soltanto dopo Clipboard riuscita, `error` nel catch e ritorno `idle` tramite timer cancellato in cleanup. `WifiPanel` mantiene una stringa decorativa separata dal valore Clipboard e applica `.is-scrambling` solo durante `copied`; per movimento ridotto lascia invariato il testo tramite `matchMedia`.

- [ ] **Step 6: Verificare verde**

Run: `npm test -- --run src/App.test.jsx`

Expected: i test Check-in e Wi-Fi PASS.

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx src/App.test.jsx src/components/SectionContent.jsx src/components/CheckinPhoto.jsx src/components/WifiPanel.jsx
git commit -m "feat: enhance check-in and wifi copy"
```

---

### Task 4: Due linee bus e pannello salute

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/components/SectionContent.jsx`
- Create: `src/components/TransportPanel.jsx`
- Create: `src/components/HealthPanel.jsx`

**Interfaces:**
- Produces: `<TransportPanel section guide />`.
- Produces: `<HealthPanel section guide />`, stato tab locale iniziale `'pharmacies'`.
- Consumes: `section.lines`, `section.pharmacies`, `section.hospitals`, `guide.healthLinks` definiti in Task 1.

- [ ] **Step 1: Scrivere test rosso trasporti**

Aprire Trasporti e verificare due elementi `data-testid="bus-line"`, due link Moovit e due link Maps. Per ogni linea verificare che la fermata con `aria-current="location"` sia presente nel mini-schema.

Il guasto catturato è mostrare più/meno di due linee o perdere uno dei due strumenti di navigazione.

- [ ] **Step 2: Osservare rosso**

Run: `npm test -- --run src/App.test.jsx -t "two bus lines"`

Expected: FAIL perché viene ancora renderizzato `PlaceList`.

- [ ] **Step 3: Implementare TransportPanel**

Rendere ogni linea come `<article>` con badge colorato, stop/direzione/frequenza, `<ol className="route-strip">` e due `ExternalLink`. Passare il colore come custom property `style={{ '--line-color': line.color }}`; non usarlo per testo informativo senza etichetta.

- [ ] **Step 4: Scrivere test rosso salute**

Aprire “Farmacie e ospedali” e verificare:

```js
expect(screen.getByRole('button', { name: 'Farmacie' })).toHaveAttribute('aria-pressed', 'true');
expect(screen.getAllByTestId('pharmacy-card')).toHaveLength(3);
await user.click(screen.getByRole('button', { name: 'Ospedali' }));
expect(screen.getAllByTestId('hospital-card')).toHaveLength(2);
expect(screen.getByRole('link', { name: 'Code pronto soccorso in tempo reale' })).toBeVisible();
```

Chiudere, riaprire e verificare che Farmacie sia di nuovo selezionata. Il guasto catturato è partire sulla tab errata o conservare stato fra aperture.

- [ ] **Step 5: Implementare HealthPanel**

Usare `useState('pharmacies')`, un gruppo con `aria-label`, due bottoni `aria-pressed` e liste separate. Le farmacie mostrano link “Trova farmacie aperte”; gli ospedali mostrano link code regionali e nota 112. Il componente viene smontato alla chiusura della sheet, garantendo il reset.

- [ ] **Step 6: Verificare verde**

Run: `npm test -- --run src/App.test.jsx`

Expected: tutti i flussi Trasporti e Salute PASS.

- [ ] **Step 7: Commit**

```bash
git add src/App.test.jsx src/components/SectionContent.jsx src/components/TransportPanel.jsx src/components/HealthPanel.jsx
git commit -m "feat: add bus routes and health switcher"
```

---

### Task 5: Raccolta differenziata e azioni calendario

**Files:**
- Modify: `src/App.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/QuickActions.jsx`
- Create: `src/components/RecyclingPanel.jsx`

**Interfaces:**
- Produces: `<RecyclingPanel recycling language onCalendarError />`.
- Consumes: `buildGoogleCalendarUrl` e `buildIcsCalendar` da `src/calendar.js`.
- Consumes: `App.openSection('recycling', trigger)` e pannello speciale costruito da `guide.recycling`.

- [ ] **Step 1: Scrivere test rosso azione rapida**

Verificare l'assenza del link “Posizione”, la presenza del bottone “Raccolta” e, dopo click, sette righe `data-testid="recycling-day"` con i testi Lunedì–Domenica e sette icone bidone decorative.

Il guasto catturato è lasciare Posizione nella barra o omettere un giorno.

- [ ] **Step 2: Osservare rosso**

Run: `npm test -- --run src/App.test.jsx -t "recycling"`

Expected: FAIL perché Posizione è ancora un link.

- [ ] **Step 3: Implementare navigazione e calendario visivo**

`QuickActions` riceve `onRecycling` invece di `links.location` e rende un button centrale con icona recycling. `App.activePanel` riconosce `recycling`; `RecyclingPanel` rende sette righe. Il bidone è un SVG inline con `currentColor`, coperchio e corpo, usando la classe materiale per il colore.

- [ ] **Step 4: Scrivere test rosso promemoria**

Dopo “Attiva promemoria” verificare i pulsanti Apple/iPhone e Google Calendar. Dopo Google verificare sei link con hostname `calendar.google.com`. Per Apple intercettare `URL.createObjectURL`, cliccare e verificare che il Blob abbia type `text/calendar;charset=utf-8`; leggere `await blob.text()` e verificare sei VEVENT.

Il guasto catturato è un'esportazione vuota, sette eventi o un collegamento Google generico.

- [ ] **Step 5: Implementare scelte promemoria**

`RecyclingPanel` mantiene `showReminderChoices` e `showGoogleEvents`. `downloadAppleCalendar` crea Blob, anchor temporaneo con filename `casa-baiocco-raccolta.ics`, click e `URL.revokeObjectURL`. I sei link Google sono generati singolarmente dalle righe `collects: true`.

- [ ] **Step 6: Verificare verde**

Run: `npm test -- --run src/App.test.jsx src/calendar.test.js`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx src/App.test.jsx src/components/QuickActions.jsx src/components/RecyclingPanel.jsx
git commit -m "feat: add recycling schedule and reminders"
```

---

### Task 6: Stile, documentazione e verifica completa

**Files:**
- Modify: `src/styles.css`
- Modify: `README.md`
- Modify: test solo se il controllo visuale rivela un bug riproducibile, scrivendo prima il test rosso.

**Interfaces:**
- Consumes: tutte le classi dei Task 3–5.
- Produces: layout leggibile 320–430 px e documentazione dei campi configurabili.

- [ ] **Step 1: Aggiungere gli stili dei componenti**

Definire blocchi focalizzati per:

- `.checkin-photo` rapporto 16:9 e fallback;
- `.wifi-card.is-copied`, `.wifi-password.is-scrambling` e keyframe terminale;
- `.bus-line`, `.route-strip`, `.route-stop` con overflow controllato;
- `.segmented-control`, `.health-list`, `.health-card`;
- `.recycling-list`, `.recycling-row`, `.bin-icon`, `.reminder-panel`.

Usare solo variabili colore esistenti o nuove variabili semantiche in `:root`. A 320 px i pulsanti doppi devono impilarsi; da 380 px possono stare affiancati. Nel media query reduced-motion neutralizzare anche l'effetto glitch.

- [ ] **Step 2: Aggiornare README**

Documentare i nuovi identificatori, il percorso foto, le due linee, gli slot salute, il calendario dimostrativo, i link ufficiali e il comportamento Apple/Google. Rimuovere i riferimenti a `explore`, `pharmacies` e all'azione Posizione come struttura attuale.

- [ ] **Step 3: Eseguire la suite completa**

Run: `npm test -- --run`

Expected: tutti i test PASS, nessun warning React o errore console.

- [ ] **Step 4: Eseguire build di produzione**

Run: `npm run build`

Expected: exit 0 e bundle generato in `dist/` senza errori.

- [ ] **Step 5: Controllo visuale browser**

Avviare `npm run dev -- --host 127.0.0.1`, verificare a 320×700 e 430×932:

- home completa senza overflow;
- foto Check-in prima di Come entrare;
- animazione copia e conferma;
- due percorsi bus leggibili;
- switch Salute e link;
- sette righe raccolta, scelte calendario e scrolling sheet;
- barra rapida sempre utilizzabile.

Se emerge un difetto funzionale, scrivere prima un test che lo riproduce e seguire red/green; per difetti puramente visivi correggere CSS e ripetere screenshot.

- [ ] **Step 6: Controllare diff e stato**

Run: `git diff --check && git status --short`

Expected: nessun errore whitespace; solo file pianificati modificati e documenti già tracciati.

- [ ] **Step 7: Commit finale**

```bash
git add src/styles.css README.md
git commit -m "docs: explain local guest guide setup"
```
