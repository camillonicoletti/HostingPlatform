# CASA BAIOCCO — redesign mobile della home

## Obiettivo

Ridisegnare la schermata iniziale esclusivamente per smartphone affinché, sulle dimensioni mobili più comuni, titolo, selettore lingua, otto categorie e tre azioni rapide siano visibili senza scorrimento verticale.

## Layout

La prima riga contiene il titolo `CASA BAIOCCO` a sinistra e il selettore compatto IT/EN a destra. Sotto compare una griglia 2 × 4 con questo ordine:

1. Check-in
2. Wi-Fi
3. Regole casa
4. Dove mangiare
5. Trasporti vicini
6. Cosa vedere
7. Supermercati
8. Check-out

La barra WhatsApp, Posizione ed Emergenze viene collocata nel flusso della pagina subito sotto la griglia. Non è fissa e non copre i pulsanti.

## Adattamento agli schermi

Il riferimento principale è una larghezza da 360 a 430 px e un’altezza da 740 px in su. La home usa l’altezza dinamica del viewport e distribuisce lo spazio tra intestazione, griglia e barra. Sui telefoni meno alti riduce progressivamente margini, spazi, dimensioni delle icone e testo secondario, senza portare i controlli sotto 44 × 44 px.

Su schermi eccezionalmente bassi lo scorrimento resta consentito come sicurezza, così nessun contenuto viene tagliato o reso irraggiungibile. Tablet e desktop mantengono la stessa composizione mobile centrata, senza un layout dedicato.

## Contenuti e interazioni

I pulsanti continuano ad aprire le schede esistenti. `Arrivo` viene rinominato `Check-in` e `La casa` diventa `Regole casa`. Vengono aggiunte due nuove schede bilingui:

- Trasporti vicini: fino a cinque opzioni con nome, indicazione sintetica, distanza e collegamento Maps.
- Supermercati: fino a cinque attività con nome, tipologia, distanza e collegamento Maps.

Tutti i nuovi testi, indirizzi e link dimostrativi risiedono in `src/content.js` e sono marcati `[DA PERSONALIZZARE]`.

## Verifica

I test automatici verificano la presenza e l’ordine delle otto categorie in italiano e inglese, oltre all’apertura delle nuove schede. La verifica browser controlla la home a 360 × 740, 390 × 844 e 430 × 900 px, l’assenza di sovrapposizioni, la posizione della barra sotto la griglia e l’eventuale overflow verticale.
