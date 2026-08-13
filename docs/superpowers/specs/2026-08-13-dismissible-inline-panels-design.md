# Box richiudibili per promemoria e recensione

## Obiettivo

Permettere all’ospite di richiudere i box aperti da **Attiva promemoria** e **Lascia una recensione**, mantenendo l’interfaccia compatta e chiara su mobile.

## Comportamento

### Promemoria raccolta differenziata

- All’apertura, il pulsante mostra inizialmente la campanella e il testo **Attiva promemoria**.
- Dopo il clic, lo stesso pulsante diventa un controllo di chiusura: la campanella viene sostituita da una `×` e il testo diventa **Chiudi promemoria**.
- Un secondo clic richiude il box e ripristina campanella e testo iniziali.
- Il pulsante espone lo stato tramite `aria-expanded` e collega semanticamente il pannello tramite `aria-controls`.
- La versione inglese usa **Enable reminders** e **Close reminders**.
- Tra il box aperto e l’elenco dei bidoni vengono lasciati 12 px di spazio verticale.

### Recensione HOUSE

- Il pulsante **Lascia una recensione** continua ad aprire il box esistente.
- Quando il box è aperto, compare una `×` nell’angolo superiore destro.
- La `×` è un vero pulsante con nome accessibile **Chiudi recensione**; in inglese **Close review**.
- Premendo la `×`, il box scompare e il pulsante principale torna ad avere `aria-expanded="false"`.
- Il contenuto del box mantiene spazio sufficiente a destra per non sovrapporsi al controllo di chiusura.

## Aspetto visivo

- La `×` del promemoria occupa lo stesso spazio della campanella, evitando spostamenti del testo.
- La `×` della recensione è piccola, circolare e coerente con colori, raggi e stati interattivi della guida.
- Il controllo resta facilmente premibile su mobile e mostra uno stato `focus-visible` riconoscibile.

## Verifica

- Test automatici per apertura e chiusura di entrambi i pannelli.
- Test dei testi italiani e inglesi e degli attributi accessibili.
- Controllo visivo alle larghezze mobile di 320 px e 430 px, verificando distanza dai bidoni, assenza di sovrapposizioni e overflow orizzontale.
