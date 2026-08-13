# Allineamento dei collegamenti nei Trasporti

## Obiettivo

Avvicinare ogni freccia al testo del collegamento a cui appartiene e aumentare visivamente la separazione tra i due collegamenti presenti sulla stessa riga.

## Comportamento

- La modifica si applica soltanto al pannello Trasporti.
- Nelle azioni della linea bus, “Apri orari e fermate” rimane allineato a sinistra e “Apri in Google Maps” a destra.
- Nelle schede Taxi/ITTAXI e App ATAC, ogni freccia resta immediatamente accanto al proprio testo.
- Ogni collegamento assume la larghezza del contenuto invece di occupare tutta la colonna della griglia.
- La distanza tra testo e freccia è uniforme e contenuta; lo spazio libero separa i collegamenti tra loro.
- Testi, URL, ordine dei collegamenti e dimensioni minime delle aree di tocco non cambiano.
- Il pannello non deve introdurre overflow orizzontale né aumentare lo scorrimento a 320 px e 430 px.

## Implementazione e verifica

La correzione usa selettori CSS circoscritti a `.transport-panel`, senza modificare il markup React dei collegamenti esistenti. Un test controllerà la presenza delle classi di allineamento sui gruppi di azioni; il controllo visuale verificherà vicinanza freccia/testo, separazione tra link e assenza di overflow alle due larghezze mobili.

## Download dell’app ATAC Roma

- Il collegamento testuale singolo “Scarica App ATAC Roma” viene sostituito con due badge distinti, ricreati in HTML e SVG sulla base dell’immagine fornita.
- Il badge “Scarica su App Store” apre `https://apps.apple.com/it/app/atac-roma/id1544302659`.
- Il badge “Scarica su Google Play” apre `https://play.google.com/store/apps/details?id=it.roma.atac.mobile&pcampaignid=web_share`.
- I badge sono due collegamenti accessibili e indipendenti, con etichette comprensibili dagli screen reader e apertura protetta in una nuova scheda.
- I badge non mostrano frecce aggiuntive perché logo e testo descrivono già chiaramente la destinazione.
- I badge restano affiancati quando lo spazio lo consente e passano su due righe soltanto alle larghezze in cui non possono rimanere leggibili.
- Il contenuto inglese usa gli stessi badge e URL.

La verifica automatica controllerà entrambi gli URL, le etichette e l’assenza del vecchio collegamento singolo. Il controllo visuale a 320 px e 430 px verificherà leggibilità, separazione delle aree cliccabili e assenza di overflow.
