# Contenuto compatto del Check-in

## Obiettivo

Ridurre leggermente l’altezza del contenuto della scheda **Check-in** affinché indirizzo, indicazioni, foto e collegamento Google Maps risultino visibili in un’unica schermata mobile, senza rendere l’interfaccia difficile da leggere o usare.

## Ambito

- Gli stili compatti si applicano esclusivamente al contenuto del Check-in.
- Le altre schede continuano a usare dimensioni e spaziature globali esistenti.
- Il componente `Arrival` riceve un contenitore dedicato per permettere l’applicazione degli stili senza influenzare Wi-Fi, Check-out o altre sezioni.

## Presentazione

- Testo descrittivo delle righe: `0.86rem`.
- Interlinea del testo descrittivo: `1.38`.
- Spaziatura verticale delle righe: `10px` invece di `15px`.
- Spazio interno tra etichetta e testo: `4px` invece di `6px`.
- Margine verticale della foto: `10px` invece di `16px`.
- Spazio prima del pulsante Google Maps: `10px` invece di `18px`.
- Titolo della scheda, etichette in maiuscolo, rapporto 4:3 della foto, dimensione e altezza minima del pulsante Maps restano invariati.

## Verifica

- La suite automatica esistente deve restare verde e deve continuare a confermare ordine, immagine, testo alternativo e link Maps.
- A 320×700 e 430×932 la scheda non deve avere overflow orizzontale.
- A entrambe le dimensioni, il pulsante Google Maps deve essere interamente visibile nella prima schermata senza scorrimento.
- Il controllo visivo deve confermare che il testo resti leggibile e che gli elementi non risultino attaccati.
