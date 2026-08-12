# Mini-guida ospiti

Guida bilingue mobile-first per una casa vacanze. Funziona come sito statico: non richiede account, database o installazione da parte dell’ospite.

## Personalizzare i contenuti

Tutti i testi, indirizzi, contatti, orari, Wi-Fi, ristoranti, attrazioni e collegamenti si trovano in un solo file:

`src/content.js`

Cerca `[DA PERSONALIZZARE]` e sostituisci ogni valore. Le sezioni `locale.it` e `locale.en` contengono rispettivamente italiano e inglese; mantieni gli stessi identificatori delle otto sezioni (`checkin`, `wifi`, `rules`, `food`, `transport`, `health`, `groceries`, `checkout`).

La home mobile mostra Check-in, Wi-Fi, Regole casa, Dove mangiare nei dintorni, Trasporti vicini, Farmacie e ospedali, Supermercati e Check-out.

- Per aggiungere la foto della casa, inserisci il percorso in `housePhoto` nella sezione Check-in di entrambe le lingue. Finché il valore è vuoto viene mostrato un placeholder.
- Le due linee autobus si configurano nell'array `lines` della sezione `transport`: aggiorna linea, colore, fermata, direzione, frequenza, fermate principali e link Moovit/Maps.
- La sezione `health` contiene esattamente tre slot `pharmacies` e due slot `hospitals`. Il link “Trova farmacie aperte” usa il servizio di Federfarma Roma indicato anche da Roma Capitale; il link ospedali usa la ricerca strutture del servizio sanitario regionale.
- Il calendario `recycling.schedule` è soltanto dimostrativo. Sostituisci giorni e materiali con quelli reali prima di pubblicare.
- Il promemoria Apple scarica un file `.ics` con tutte le raccolte; Google Calendar propone un link per ogni serie settimanale. Gli eventi durano quattro mesi e notificano la sera precedente.

Il nome e la località sono in `content.brand`. Il numero WhatsApp, il telefono e l'email sono in `content.contacts`. I collegamenti alla posizione della casa e alla recensione sono in `content.links`.

Non aggiungere al file codici della serratura, della cassaforte, PIN dell’allarme o altri segreti: il sito pubblicato è visibile a chiunque possieda il link.

## Cambiare colori e stile

I colori principali sono all’inizio di `src/styles.css`, dentro `:root`:

- `--ivory`: sfondo;
- `--terracotta`: colore principale;
- `--olive`: dettagli;
- `--night`: testo.

Modificando questi quattro valori si aggiorna l’intera interfaccia. Il nome mostrato nella pagina si cambia invece in `content.brand.name` dentro `src/content.js`.

## Avviare l’anteprima

Serve una versione recente di Node.js.

```bash
npm install
npm run dev
```

Apri nel browser l’indirizzo locale mostrato dal terminale. La scelta IT/EN resta memorizzata sul dispositivo.

## Creare il sito statico

```bash
npm run build
```

Il sito pronto da pubblicare viene generato nella cartella `dist`. Per controllare esattamente questa versione:

```bash
npm run preview
```

## Pubblicare

Carica il contenuto della cartella `dist` su un servizio di hosting statico oppure configura il servizio affinché esegua `npm run build` e pubblichi `dist`. Questo schema è compatibile, per esempio, con Netlify, Cloudflare Pages, Vercel e GitHub Pages.

Se il sito viene pubblicato in una sottocartella, come `https://esempio.it/guida/`, imposta `base: '/guida/'` nell’oggetto esportato da `vite.config.js` prima della build.

Usa HTTPS: è necessario perché la copia della password tramite Clipboard API funzioni in modo affidabile sugli smartphone.

## Creare un QR code

1. Pubblica il sito e copia il suo indirizzo HTTPS pubblico.
2. Genera un QR code con la funzione “Crea codice QR” del browser oppure, da terminale, con:

   ```bash
   npx qrcode "https://indirizzo-pubblico-della-guida.example" -o qr-guida.png
   ```

3. Scansiona il QR con almeno un iPhone e un telefono Android prima di stamparlo.
4. Stampa soltanto il QR dell’indirizzo pubblico: non incorporare password Wi-Fi o codici di accesso direttamente nel QR.

## Controlli disponibili

```bash
npm test -- --run
npm run build
```

I test verificano lingue, apertura e chiusura delle schede, copia Wi-Fi, foto Check-in, linee bus, switch Farmacie/Ospedali, raccolta, file calendario, link Maps ed emergenze.
