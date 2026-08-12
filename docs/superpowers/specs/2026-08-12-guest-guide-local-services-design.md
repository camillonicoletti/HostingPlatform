# Guida ospiti: servizi locali e raccolta differenziata — specifica

## Obiettivo

Aggiornare la guida mobile bilingue di CASA BAIOCCO con informazioni più utili durante il soggiorno: accesso visivo alla casa, copia Wi-Fi animata, due linee bus leggibili, farmacie e ospedali, raccolta differenziata con promemoria e contatto WhatsApp reale.

L'app rimane un sito statico React/Vite senza account, database, backend o servizi a pagamento. Tutte le informazioni locali non ancora fornite restano contrassegnate con `[DA PERSONALIZZARE]` in `src/content.js`; soltanto il calendario della raccolta usa dati dimostrativi inventati.

## Esperienza generale

- Il layout mobile-first, la griglia di otto sezioni, la bottom sheet e la selezione IT/EN rimangono invariati nella struttura generale.
- Le nuove interazioni seguono i colori e la tipografia esistenti.
- Tutti i nuovi pulsanti hanno un'area tocco di almeno 44 px, focus visibile e testo accessibile.
- Le animazioni decorative vengono disattivate o ridotte quando il dispositivo richiede `prefers-reduced-motion: reduce`.
- I collegamenti esterni si aprono in una nuova scheda con `noopener noreferrer`.

## 1. Check-in con foto della casa

La scheda Check-in mantiene indirizzo e orario in apertura. Subito prima del dettaglio **Come entrare** compare un riquadro fotografico in rapporto 16:9.

Finché la foto reale non è disponibile, il riquadro mostra un placeholder elegante con icona casa e testo localizzato “Foto della casa in arrivo”. Il percorso dell'immagine viene configurato nei contenuti; se è vuoto o l'immagine non viene caricata, il fallback rimane visibile senza creare un riquadro rotto.

Ordine dei contenuti:

1. indirizzo;
2. orario di check-in;
3. foto/placeholder della casa;
4. come entrare;
5. parcheggio;
6. collegamento Google Maps.

## 2. Copia password Wi-Fi

Il pulsante **Copia password** mantiene la Clipboard API e il fallback esistente. Dopo una copia riuscita:

- per circa un secondo la password visualizzata attraversa una breve sequenza di caratteri casuali che si ricompongono nel valore originale;
- il riquadro assume temporaneamente un aspetto “terminale” con bagliore verde discreto;
- il pulsante mostra uno stato di conferma localizzato, per esempio “Accesso copiato” / “Access copied”;
- il toast continua a comunicare l'esito anche alle tecnologie assistive.

L'animazione non modifica il valore copiato e non espone ulteriormente la password. In caso di errore non parte e viene mostrato il messaggio di fallback esistente. Con movimento ridotto si usa solo il cambio di colore e testo, senza scramble.

## 3. Dove mangiare nei dintorni

La sezione `food` cambia titolo in:

- italiano: **Dove mangiare nei dintorni**;
- inglese: **Where to eat nearby**.

Elenco, ordine, contenuti configurabili e collegamenti Maps restano invariati.

## 4. Trasporti

La sezione Trasporti mostra esattamente due linee bus configurabili. Ogni linea contiene:

- numero/nome della linea;
- colore identificativo;
- nome della fermata sotto casa;
- direzione o capolinea utile;
- frequenza o nota sintetica;
- da tre a cinque fermate principali per un mini-schema del percorso;
- collegamento Moovit;
- collegamento Google Maps.

Il mini-schema è una linea orizzontale con fermate etichettate, non una cartografia geografica. Questa soluzione è più leggibile su telefono, non richiede chiavi API e chiarisce subito la progressione del percorso. La fermata della casa è evidenziata come punto di partenza.

I pulsanti **Apri in Moovit** e **Apri in Maps** sono separati. I link Moovit vengono mantenuti configurabili perché serviranno i dati reali delle linee e delle fermate; il browser gestirà l'apertura dell'app quando supportata e altrimenti mostrerà il sito Moovit.

## 5. Farmacie e ospedali

La sesta scheda della griglia, oggi `explore`, diventa `health` con titolo:

- italiano: **Farmacie e ospedali**;
- inglese: **Pharmacies & hospitals**.

All'apertura viene selezionata sempre la tab **Farmacie**, anche se nella visita precedente era stata selezionata la tab Ospedali. Uno switch a due pulsanti, fissato all'inizio del contenuto della scheda, permette di passare tra le due viste.

### Farmacie

La tab mostra tre slot configurabili. Ogni farmacia contiene nome, indirizzo o indicazione, distanza, telefono opzionale e Maps. Sotto l'elenco compare il pulsante **Trova farmacie aperte**, collegato alla pagina istituzionale di Roma Capitale dedicata ai servizi sanitari/farmacie.

Non viene integrata un'API in questa fase. I dataset ufficiali di Regione Lazio e Ministero della Salute forniscono anagrafiche e coordinate, ma non offrono un dato pubblico semplice e sufficientemente affidabile per determinare in tempo reale turni e apertura “adesso”. Una futura integrazione richiederà una fonte ufficiale per orari e turni, oltre all'indirizzo definitivo della casa.

### Ospedali

La tab mostra due slot configurabili. Ogni ospedale contiene nome, tipo di presidio, indirizzo o indicazione, distanza, telefono opzionale e Maps.

Sotto l'elenco compaiono:

- **Code pronto soccorso in tempo reale**, verso il servizio ufficiale della Regione Lazio;
- una nota chiara che per un'emergenza bisogna chiamare il 112 e non scegliere l'ospedale soltanto in base alla distanza.

## 6. Raccolta differenziata

Il pulsante centrale/inferiore **Posizione** della barra rapida diventa **Raccolta** / **Recycling** e apre una bottom sheet dedicata. WhatsApp ed Emergenze restano nelle altre due posizioni.

La scheda mostra tutti i sette giorni della settimana. Ogni riga contiene:

- giorno;
- materiale ritirato o “Nessun ritiro”;
- piccolo bidone SVG sulla destra, con colore coerente al materiale.

I bidoni sono disegnati internamente come SVG/CSS, così non dipendono da immagini esterne o licenze. Il calendario dimostrativo è:

| Giorno | Raccolta | Colore bidone |
| --- | --- | --- |
| Lunedì | Organico | marrone |
| Martedì | Carta e cartone | blu |
| Mercoledì | Plastica e metalli | giallo |
| Giovedì | Organico | marrone |
| Venerdì | Vetro | verde |
| Sabato | Indifferenziato | grigio |
| Domenica | Nessun ritiro | neutro |

Una nota segnala chiaramente che il programma è dimostrativo e deve essere personalizzato prima della pubblicazione.

### Promemoria calendario

Il pulsante **Attiva promemoria** apre due scelte esplicite, evitando il rilevamento fragile del tipo di telefono:

- **Apple / iPhone:** genera e scarica un file `.ics` con sei eventi ricorrenti settimanali;
- **Google Calendar:** mostra sei link “Aggiungi” che aprono i rispettivi eventi precompilati in Google Calendar.

Ogni evento:

- ricorre una volta alla settimana per quattro mesi a partire dalla prima occorrenza futura del giorno corrispondente;
- usa come orario dimostrativo le 20:00 del giorno di raccolta;
- include una notifica alle 20:00 della sera precedente;
- usa titolo e descrizione nella lingua selezionata al momento dell'attivazione.

Il file Apple contiene tutti gli eventi in un singolo calendario importabile. Google Calendar richiede l'autorizzazione dell'utente per ogni serie; non viene richiesto OAuth né accesso all'account. La domenica, essendo senza ritiro, non genera eventi.

Se il download non è supportato, viene mostrato un messaggio che invita a usare Google Calendar. I link e i file non contengono indirizzo, password o altri dati sensibili.

## 7. WhatsApp host

Il contatto viene aggiornato a:

- visualizzazione: `+39 347 700 5683`;
- link: `https://wa.me/393477005683`.

Il numero viene usato sia nella barra rapida sia negli altri collegamenti WhatsApp già presenti.

## Architettura e componenti

I dati restano centralizzati in `src/content.js`, con strutture parallele IT/EN. Le responsabilità vengono suddivise in componenti focalizzati:

- `SectionContent` continua a instradare le sezioni;
- un componente foto Check-in gestisce immagine e fallback;
- un componente Wi-Fi gestisce stato visuale della copia senza duplicare la logica Clipboard dell'app;
- un componente linee bus rende schede, percorso e link;
- un componente salute gestisce lo switch locale Farmacie/Ospedali;
- un componente raccolta rende calendario e scelte promemoria;
- una utility calendario costruisce date future, URL Google e contenuto iCalendar in modo testabile.

La bottom sheet della raccolta usa un identificatore dedicato, come avviene per Emergenze, senza aggiungere una nona scheda alla griglia.

## Gestione errori e casi limite

- Immagine Check-in assente o non caricabile: mostra il placeholder.
- Clipboard non disponibile: usa il fallback esistente; nessuna animazione falsa in caso di errore.
- Link locali non ancora definitivi: rimangono URL placeholder chiaramente riconoscibili.
- Generazione calendario: calcola sempre date future nel fuso locale del dispositivo e limita le ricorrenze a quattro mesi.
- Popup Google bloccati: ogni evento è un normale link attivato direttamente dall'utente, non un'apertura multipla automatica.
- JavaScript o storage locale indisponibili: la guida mantiene contenuti e link principali; solo copia, tab e generazione promemoria richiedono interazione JavaScript.

## Verifica

I test automatici devono coprire:

- ordine e titoli delle otto sezioni in IT e EN;
- placeholder foto e fallback su errore;
- copia password riuscita e fallita, compresi gli stati animati;
- esattamente due linee bus con link Moovit e Maps;
- apertura Salute sulla tab Farmacie e passaggio a Ospedali;
- tre farmacie, due ospedali e link ai servizi ufficiali;
- sostituzione di Posizione con Raccolta nella barra rapida;
- sette righe del calendario e sei eventi promemoria;
- correttezza sintattica del file `.ics`, ricorrenza settimanale e termine dopo quattro mesi;
- URL Google Calendar precompilati;
- link WhatsApp al numero `393477005683`.

Prima della consegna vanno eseguiti test completi, build di produzione e controllo visuale mobile delle principali schede, verificando assenza di overflow e leggibilità a 320–430 px.

## Fuori ambito

- integrazione live di API per farmacie aperte;
- dati reali di bus, farmacie, ospedali e raccolta;
- caricamento della foto definitiva;
- autenticazione Google Calendar o scrittura automatica senza conferma dell'utente;
- mappe interattive o chiavi API commerciali.
