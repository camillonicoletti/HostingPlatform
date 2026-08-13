# Compattazione e rifinitura della guida mobile

## Obiettivo

Rendere la schermata iniziale e i pannelli Trasporti e Raccolta più compatti su smartphone, aggiornando nel contempo icone, sezione ospedali e flusso recensione. La leggibilità, le aree di tocco e l'accessibilità devono restare invariate o migliorare.

## Schermata iniziale

- Le otto card mostrano soltanto il titolo visibile; tutti i sottotitoli vengono rimossi dalla UI.
- Il testo descrittivo rimane nei dati e nell'etichetta accessibile della card, così gli screen reader conservano il contesto.
- Le icone delle sezioni diventano SVG coerenti: segnaposto per Check-in, Wi-Fi, carrello per Supermercati, autobus per Trasporti e dollaro per Banche e Ufficio postale.
- Le altre icone esistenti restano invariate salvo gli adattamenti tecnici necessari.

## Trasporti

- Si conserva tutto il contenuto e tutti i collegamenti esistenti.
- Si riducono padding, spazi verticali, dimensioni decorative e distanza tra i riquadri, senza ridurre i controlli interattivi sotto una dimensione comoda al tocco.
- Dettagli della linea e percorso restano immediatamente leggibili; Taxi/ITTAXI e App ATAC diventano schede più dense.
- Il risultato deve richiedere poco scorrimento su un comune telefono e non deve produrre scorrimento orizzontale a 320 px.

## Farmacie e ospedali

- La scheda continua ad aprirsi sulla tab Farmacie.
- Nella tab Ospedali restano soltanto le due strutture e i loro dati/collegamenti.
- Vengono rimossi sia il pulsante “Trova pronto soccorso nel Lazio” sia il box informativo sul 112.
- La tab Farmacie non cambia.

## Recensione al check-out

- Il pulsante “Lascia una recensione” non apre più direttamente un sito esterno, ma mostra un box inline nella stessa scheda.
- Il box contiene il testo “Se hai prenotato tramite HOUSE clicca qui per lasciare una recensione” e il pulsante “Lascia recensione su HOUSE”.
- Finché non viene fornito l'URL reale, il pulsante HOUSE è visibile ma disabilitato e non naviga.
- La stessa esperienza è disponibile in inglese.

## Raccolta differenziata

- Il comando “Attiva promemoria” viene spostato prima dell'elenco settimanale.
- Il comando usa un'icona SVG a campanella; il pannello delle opzioni Apple/Google conserva il comportamento attuale.
- Le sette righe del calendario vengono rese più compatte mantenendo giorno, materiale e bidone sulla stessa riga.
- Il testo informativo viene spostato sotto l'elenco. La parola “vetro” (e “Glass” in inglese) viene evidenziata in rosso.
- L'intero pannello non deve avere scorrimento orizzontale a 320 px.

## Test e verifica

- Test automatici per assenza dei sottotitoli visibili, nuove icone, rimozione dei contenuti ospedali, apertura del box recensione e pulsante HOUSE disabilitato, ordine del promemoria e marcatura rossa del vetro.
- I test esistenti per calendari, navigazione e contenuti devono continuare a passare.
- Build di produzione e controllo visuale mobile delle schermate iniziale, Trasporti, Ospedali, Check-out e Raccolta a 320 px e 430 px.

## Fuori ambito

Il contatore visite non viene implementato in questa modifica. Dopo la verifica verranno confrontate soluzioni private di analytics; l'eventuale integrazione richiederà una scelta separata su servizio, privacy e accesso ai dati.
