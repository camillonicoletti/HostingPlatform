# Servizi vicini, trasporti e contatti sanitari

## Obiettivo

Riorganizzare quattro sezioni della guida: sostituire `Numeri e App Utili` con banca e ufficio postale, spostare Taxi/ITTAXI e ATAC nei trasporti, mostrare soltanto 112 e Guardia medica nelle emergenze e sostituire i segnaposto sanitari con una farmacia e due ospedali reali. Tutti i contenuti vengono aggiornati sia in italiano sia in inglese.

## Banche e Ufficio postale

La sezione con identificativo interno `food` conserva la posizione e l'icona attuali, ma cambia titolo visibile:

- italiano: `Banche e Ufficio postale`;
- inglese: `Banks and Post Office`.

La sezione mostra due schede:

1. **BCC Roma – Agenzia Massimina**
   - indirizzo: `Via della Massimilla, 14 - Roma`;
   - telefono: `06 52866051`;
   - azioni: chiamata telefonica e apertura dell'indirizzo in Google Maps.
2. **Poste Italiane – Ufficio Postale Roma 140**
   - indirizzo: `Via della Massimilla, 75 - Roma`;
   - telefono: `06 6693562`;
   - azioni: chiamata telefonica e apertura dell'indirizzo in Google Maps.

Le schede riutilizzano la grafica già impiegata per i contatti, senza modificare la navigazione principale.

## Trasporti vicini

La sezione conserva la scheda della linea autobus 906 e la fermata di Via Tullio Ascarelli come punto di partenza. Sotto la linea vengono aggiunte due schede:

1. **Taxi e ITTAXI**
   - numero `06 3570` con azione telefonica;
   - collegamento per scaricare o consultare ITTAXI.
2. **App ATAC Roma**
   - descrizione per consultare trasporto pubblico, fermate e orari;
   - collegamento alla pagina ufficiale dell'app ATAC.

Titoli, descrizioni e azioni vengono tradotti in inglese. Numeri e collegamenti restano uguali.

## Emergenze

La sezione mostra soltanto due schede:

1. **Emergenze – 112**
   - descrizione: numero unico europeo per le emergenze;
   - azione `Chiama 112` con collegamento `tel:112`.
2. **Guardia medica – 116117**
   - descrizione: servizio di continuità assistenziale;
   - orari:
     - notti feriali e festive dalle 20:00 alle 08:00;
     - sabato e giorni prefestivi dalle 10:00 alle 20:00;
     - domenica e giorni festivi dalle 08:00 alle 20:00;
   - azione `Chiama 116117` con collegamento `tel:116117`.

Non vengono mostrati il telefono dell'Host o altri contatti locali. In inglese vengono tradotti titoli, descrizioni, orari e azioni; numeri e orari restano invariati. L'introduzione appare una sola volta come sottotitolo del pannello.

## Farmacie e ospedali

### Farmacia

La scheda Farmacie mostra soltanto:

- **Farmacia Buccella**
  - indirizzo: `Via Aurelia, 1297 - Roma`;
  - zona: `Massimina–Casal Lumbroso`;
  - telefono: `+39 06 6618 0089`;
  - collegamento Google Maps costruito con nome e indirizzo.

### Ospedali

La scheda Ospedali mostra:

1. **Aurelia Hospital**
   - indirizzo: `Via Aurelia, 860 - Roma`;
   - servizio indicato: `Pronto Soccorso DEA di 1° livello`;
   - zona: `Aurelia`;
   - centralino: `+39 06 6649 21`;
   - collegamento Google Maps.
2. **Policlinico Universitario Agostino Gemelli IRCCS**
   - indirizzo: `Largo Agostino Gemelli, 8 - Roma`;
   - servizio indicato: `Pronto Soccorso`;
   - zona: `Monte Mario`;
   - centralino: `+39 06 3015 1`;
   - collegamento Google Maps.

I telefoni della farmacia e degli ospedali diventano collegamenti `tel:` cliccabili. La nota esistente continua a ricordare che, in caso di emergenza, bisogna chiamare il 112 e non scegliere l'ospedale soltanto in base alla distanza. Il pulsante per trovare farmacie aperte e quello per consultare i pronto soccorso del Lazio restano invariati.

## Presentazione e componenti

Le schede di banca, posta, Taxi/ITTAXI, ATAC ed emergenze riutilizzano `UsefulNumbersPanel`. `TransportPanel` viene esteso per mostrare i servizi aggiuntivi sotto la linea 906. `HealthPanel` mantiene le due schede Farmacie/Ospedali e rende cliccabili i numeri telefonici. Non sono necessari nuovi stili.

## Ambito

La modifica riguarda `src/content.js`, `src/components/SectionContent.jsx`, `src/components/TransportPanel.jsx` e `src/components/HealthPanel.jsx`. Non vengono modificate altre sezioni o la navigazione. Come richiesto, non vengono eseguiti test automatici. Il commit `edit` e il push vengono effettuati soltanto quando l'utente dice `pubblica`.
