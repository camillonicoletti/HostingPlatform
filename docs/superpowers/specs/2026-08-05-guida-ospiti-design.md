# Mini-guida ospiti — specifica di design

## Obiettivo

Realizzare una guida statica bilingue, mobile-first e utilizzabile come una piccola app web. Un ospite deve poter raggiungere l'informazione desiderata entro 30 secondi, senza installazione, autenticazione o navigazione tra pagine.

## Tecnologia e distribuzione

La cartella di progetto è vuota, quindi il sito sarà creato con React e Vite. La produzione genera file statici pubblicabili su qualunque hosting statico. Il progetto non userà servizi esterni in esecuzione, salvo collegamenti espliciti a Google Maps, WhatsApp e recensioni.

## Esperienza utente

La home presenta subito nome struttura, località, messaggio di benvenuto, selettore IT/EN e sei pulsanti grandi in una griglia 2 × 3 sui telefoni. I pulsanti aprono una scheda dal basso quasi a tutto schermo su mobile e una modale centrata su schermi più grandi.

Le schede sono brevi e focalizzate:

- Arrivo: indirizzo, check-in, istruzioni, parcheggio e Maps.
- Wi-Fi: rete, password, copia negli appunti e conferma visiva.
- La casa: non più di cinque informazioni essenziali.
- Dove mangiare: non più di sei locali con categoria, consiglio e Maps.
- Cosa vedere: non più di sei attrazioni con descrizione, distanza e Maps.
- Check-out: orario, operazioni richieste, contatto host e recensione.

Una barra inferiore fissa offre WhatsApp, posizione ed emergenze. Le emergenze aprono una scheda informativa con 112 e contatti locali; nessuna chiamata parte automaticamente.

## Direzione visiva

L'interfaccia usa un fondo avorio, terracotta come colore primario, verde oliva per dettagli e blu notte per il testo. Pulsanti arrotondati, ombre leggere, icone lineari e animazioni di breve durata comunicano un'accoglienza italiana contemporanea. Sono usati al massimo due caratteri tipografici e nessun carattere dipende da un servizio web esterno.

La composizione è ottimizzata per larghezze da 360 a 430 px, senza scorrimento orizzontale. Su tablet e desktop il contenuto rimane centrato con una larghezza leggibile e la griglia può espandersi senza diventare dispersiva.

## Architettura dei contenuti

Tutto il contenuto modificabile risiede in `src/content.js`: identità della struttura, contatti, indirizzi, orari, istruzioni, Wi-Fi, regole, locali, attrazioni, collegamenti e testi IT/EN. I dati dimostrativi richiesti sono marcati con `[DA PERSONALIZZARE]`.

Il file non contiene codici di serrature, casseforti, allarmi o altri segreti. Per l'accesso viene mostrato il messaggio: “Il codice di accesso verrà inviato privatamente prima del check-in”, con traduzione inglese.

I componenti React ricevono dati già selezionati per la lingua attiva. Il cambio lingua aggiorna immediatamente tutta l'interfaccia e salva `it` o `en` in `localStorage`; in assenza di preferenza viene usato l'italiano.

## Componenti e comportamento

- `App`: gestisce lingua, scheda aperta e azioni principali.
- `Header`: identità della struttura, benvenuto e selettore lingua.
- `GuideGrid`: sei categorie con icona, titolo e breve supporto visivo.
- `Sheet`: dialogo accessibile con overlay, titolo, contenuto e chiusura.
- `SectionContent`: rende uno dei sei layout definiti, selezionato dall'identificatore della categoria.
- `QuickActions`: barra inferiore con tre azioni persistenti.
- `Toast`: conferma temporanea e annunciata dopo la copia della password.

La scheda si chiude tramite pulsante, tasto Escape o tocco sull'overlay. All'apertura il focus entra nel dialogo, resta contenuto nella scheda e torna al pulsante di origine alla chiusura. Lo sfondo non scorre mentre una scheda è aperta.

Per la copia Wi-Fi si usa `navigator.clipboard` quando disponibile; un fallback seleziona e copia il testo. Se la copia non riesce, l'interfaccia mostra un messaggio chiaro senza bloccare la consultazione manuale della password.

I collegamenti vengono costruiti a partire da URL completi configurati nel file dati. I link esterni si aprono in una nuova scheda con protezioni `noopener noreferrer`.

## Accessibilità e adattamento

Tutti i controlli interattivi hanno un'area minima di 44 × 44 px, stato di focus visibile e nome accessibile. Il contrasto cromatico è verificato per testo e controlli. La semantica usa titoli gerarchici, pulsanti reali e dialoghi con `aria-modal`, `aria-labelledby` collegato al titolo e testo di supporto collegato con `aria-describedby` quando presente.

Il sito è interamente utilizzabile da tastiera. Le icone decorative sono nascoste ai lettori di schermo. `prefers-reduced-motion: reduce` disabilita transizioni e movimenti non essenziali.

## Gestione degli errori

I contenuti obbligatori sono presenti nei dati dimostrativi, così il sito resta navigabile prima della personalizzazione. La copia fallita produce un feedback non distruttivo. I link configurabili rimangono URL dimostrativi validi e sono chiaramente marcati da personalizzare.

## Verifica

I test automatici coprono cambio lingua e persistenza, apertura e chiusura di ogni scheda, Escape, copia Wi-Fi con conferma e apertura della scheda emergenze. La verifica finale comprende test, build di produzione e controllo browser alle larghezze 360, 390, 430 px e desktop, inclusi overflow orizzontale, barra fissa, focus da tastiera e movimento ridotto.

Il README documenta modifica di contenuti, colori e nome, anteprima locale, pubblicazione statica e creazione di un QR code dall'indirizzo pubblico.
