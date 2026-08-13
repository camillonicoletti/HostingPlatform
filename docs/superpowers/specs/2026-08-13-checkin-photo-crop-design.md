# Ritaglio compatto della foto del check-in

## Obiettivo

Ridurre l’altezza della fotografia nel Check-in per rendere più visibili **Come entrare** e il collegamento a Google Maps, concentrando l’immagine sul portone invece che sulla vegetazione.

## Presentazione

- Il riquadro passa dal rapporto verticale `6 / 7` al rapporto orizzontale `4 / 3`.
- L’immagine mantiene `object-fit: cover`.
- Il punto di ritaglio diventa `object-position: 50% 100%`: la foto viene centrata orizzontalmente e ancorata al bordo inferiore.
- Il risultato deve mostrare chiaramente portone e civico 99, conservando soltanto una fascia ridotta di verde sopra l’ingresso.
- Il file `public/img_casa.jpg`, il testo alternativo e il fallback non vengono modificati.

## Verifica

- La suite automatica esistente deve restare verde; non viene aggiunto un test che legga il testo del CSS, perché non verificherebbe il risultato visivo.
- Il rapporto e il punto di ritaglio vengono verificati nell’app reale tramite gli stili calcolati dal browser.
- A 320 px e 430 px il riquadro deve avere rapporto 4:3, senza overflow orizzontale.
- Il controllo visivo deve confermare che il portone sia il soggetto principale e che **Come entrare** e Google Maps compaiano prima rispetto al formato precedente.
