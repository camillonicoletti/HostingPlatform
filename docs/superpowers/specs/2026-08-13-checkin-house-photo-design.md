# Foto della casa nel check-in

## Obiettivo

Sostituire il segnaposto nella sezione **Check-in** con la fotografia reale dell’ingresso della casa già presente in `public/img_casa.jpg`.

## Presentazione

- L’immagine viene caricata dal percorso pubblico `/img_casa.jpg`.
- Il riquadro usa un rapporto `6 / 7`, molto vicino alle proporzioni originali della fotografia, per mostrare chiaramente portone e civico 99 senza tagli importanti.
- L’immagine continua a usare `object-fit: cover` e conserva bordi, raggi e spaziatura del componente esistente.
- La foto resta posizionata prima della sezione **Come entrare**.

## Accessibilità e fallback

- Testo alternativo italiano: **Ingresso della casa al civico 99**.
- Testo alternativo inglese: **House entrance at number 99**.
- Se l’immagine non può essere caricata, il componente mostra il fallback già esistente nella lingua selezionata.

## Verifica

- Un test automatico controlla il percorso, il testo alternativo e la posizione prima delle istruzioni di ingresso.
- La build deve includere correttamente l’asset della cartella `public`.
- Il controllo visivo viene eseguito a 320 px e 430 px, verificando che portone e civico siano visibili e che non compaia overflow orizzontale.
