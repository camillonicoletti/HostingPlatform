# Farmacie di emergenza — specifica

## Obiettivo

Sostituire la sezione **Cosa vedere** con **Farmacie di emergenza**, mantenendola esattamente nella sesta posizione della griglia mobile di CASA BAIOCCO.

## Comportamento

- La griglia continua ad avere otto pulsanti nello stesso ordine.
- Il sesto pulsante diventa **Farmacie di emergenza** in italiano e **Emergency pharmacies** in inglese.
- Il pulsante usa un'icona semplice riconducibile alla farmacia.
- La scheda mostra fino a sei farmacie configurabili.
- Ogni farmacia contiene nome, breve indicazione, distanza e collegamento Google Maps.
- Tutti i valori dimostrativi rimangono contrassegnati con `[DA PERSONALIZZARE]` in `src/content.js`.

## Modifiche tecniche

- Sostituire l'identificatore `explore` con `pharmacies` nei contenuti e nei componenti.
- Riutilizzare il componente esistente per gli elenchi di luoghi vicini.
- Aggiornare italiano, inglese, icona, test e README.
- Non modificare layout, ordine degli altri pulsanti o barra delle azioni rapide.

## Verifica

- Testare l'ordine degli otto pulsanti in entrambe le lingue.
- Verificare apertura e chiusura della nuova scheda.
- Verificare la presenza dei collegamenti Google Maps.
- Eseguire test completi, build e controllo mobile senza overflow.
