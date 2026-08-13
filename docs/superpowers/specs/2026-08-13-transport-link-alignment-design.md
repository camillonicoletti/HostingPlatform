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

La correzione usa selettori CSS circoscritti a `.transport-panel`, senza modificare il markup React. Un test controllerà la presenza delle classi di allineamento sui gruppi di azioni; il controllo visuale verificherà vicinanza freccia/testo, separazione tra link e assenza di overflow alle due larghezze mobili.
