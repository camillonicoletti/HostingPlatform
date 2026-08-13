# Titoli, vetro, recensione e indirizzo

## Obiettivo

Aggiornare quattro elementi della guida in italiano e inglese: il titolo delle regole, l'evidenza della parola vetro, il servizio per le recensioni e l'indirizzo sotto il nome della casa.

## Titolo delle regole

Il pulsante e il pannello della sezione `rules` mostrano:

- italiano: `Regole della casa`;
- inglese: `House rules`, invariato.

## Raccolta differenziata

Nel testo informativo della raccolta, soltanto la parola iniziale relativa al vetro viene mostrata in rosso e in maiuscolo:

- italiano: `IL VETRO`;
- inglese: `GLASS`.

Il resto delle frasi mantiene il colore e il testo attuali. `RecyclingNotice` individua il prefisso prima dei due punti e lo racchiude in un elemento con una classe dedicata. La versione italiana nei dati viene aggiornata da `Il vetro:` a `IL VETRO:`; la versione inglese da `Glass` a `GLASS`.

## Recensione Housing Anywhere

Nel box aperto da `Lascia una recensione`:

- sostituire ogni riferimento visibile a `HOUSE` con `Housing Anywhere`;
- testo italiano: `Se hai prenotato tramite Housing Anywhere clicca qui per lasciare una recensione.`;
- pulsante italiano: `Lascia recensione su Housing Anywhere`;
- testo inglese: `If you booked through Housing Anywhere, click here to leave a review.`;
- pulsante inglese: `Leave a review on Housing Anywhere`;
- impostare `content.links.review` su `https://housinganywhere.com/it/room/ut1483360/it/Rome/via-tullio-ascarelli`.

Il collegamento si apre in una nuova scheda tramite il componente esterno esistente.

## Indirizzo nell'intestazione

Sotto il titolo `LA MIA CASA` mostrare:

> Via Tullio Ascarelli, 99 - Roma

L'indirizzo viene letto da `brand.location`, sostituendo il segnaposto attuale. `Header` lo mostra sotto l'`h1` in testo piccolo e corsivo. L'indirizzo resta uguale in italiano e inglese.

## Ambito

Modificare `src/content.js`, `src/components/Header.jsx`, `src/components/RecyclingPanel.jsx` e `src/styles.css`. Non cambiare altre sezioni o comportamenti. Non aggiungere dipendenze e non eseguire test automatici. Effettuare commit e push soltanto quando l'utente dice `pubblica`, usando il messaggio `edit` e pubblicando solo i file di produzione.
