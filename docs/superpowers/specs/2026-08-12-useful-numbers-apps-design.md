# Numeri e App Utili

## Obiettivo

Trasformare la sezione precedentemente dedicata ai ristoranti in una sezione bilingue di contatti e servizi essenziali, eliminando tutte le schede dimostrative dei locali.

## Contenuti

La sezione mostra quattro schede, nello stesso ordine:

1. **Guardia medica - 116117**
   - numero telefonico tappabile;
   - descrizione del servizio di continuità assistenziale;
   - orari divisi in tre punti: notti feriali e festive dalle 20:00 alle 08:00; sabato e prefestivi dalle 10:00 alle 20:00; domenica e festivi dalle 08:00 alle 20:00;
   - azione `Chiama 116117`.
2. **Emergenze - 112**
   - numero telefonico tappabile;
   - nota `Numero unico europeo per le emergenze`;
   - azione `Chiama 112`.
3. **Taxi - 06 3570**
   - numero telefonico tappabile;
   - azione `Chiama 06 3570`;
   - alternativa `Scarica App ITTAXI`, collegata al sito ufficiale `https://www.ittaxi.it/`.
4. **App ATAC Roma**
   - descrizione breve per consultare trasporti pubblici, orari e tempi di arrivo;
   - azione `Scarica App ATAC Roma`, collegata alla pagina ufficiale `https://www.atac.roma.it/biglietti-e-abbonamenti/app-atac-roma`, che contiene i pulsanti per App Store e Google Play.

## Lingue

Tutti i titoli, le descrizioni, gli orari e le azioni sono presenti anche in inglese. Numeri telefonici, orari e nomi ITTAXI e ATAC Roma restano invariati.

## Presentazione

Si mantiene lo stile delle schede esistenti, aggiungendo una lista compatta per gli orari e una pila di azioni telefoniche/app. Il numero appare in evidenza in alto a destra. I collegamenti telefonici usano lo schema `tel:`.

## Ambito

La modifica riguarda `src/content.js`, `src/components/SectionContent.jsx` e gli stili strettamente necessari in `src/styles.css`. Non vengono modificati altri contenuti o eseguiti test automatici.
