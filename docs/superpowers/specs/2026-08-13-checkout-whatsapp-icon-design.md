# Check-out e icona WhatsApp

## Obiettivo

Accorciare l'istruzione sull'orario del check-out e sostituire il simbolo generico accanto a `WhatsApp host` con un'icona WhatsApp riconoscibile.

## Check-out

Nel rigo `Orario` mostrare in italiano:

> Ricordati di comunicare all’Host il giorno e l’ora in cui lascerai la casa.

Versione inglese:

> Remember to tell the Host the day and time you will leave the house.

La frase `almeno una settimana prima` e la corrispondente traduzione inglese vengono eliminate. Il punto sulle chiavi e sul deposito resta invariato.

## Icona WhatsApp

Nel collegamento rapido `WhatsApp host`, sostituire il glifo circolare generico con un'icona WhatsApp SVG riconoscibile. L'icona:

- viene integrata nel componente `Icon` esistente;
- mantiene dimensioni e colore ereditati dalle altre icone della barra;
- è decorativa e conserva `aria-hidden="true"` tramite il contenitore esistente;
- non modifica testo, collegamento WhatsApp o comportamento del pulsante.

## Ambito

Modificare soltanto `src/content.js` e `src/components/Icon.jsx`. Aggiornare il testo in italiano e inglese. Non aggiungere dipendenze e non modificare gli stili. Non eseguire test automatici. Effettuare commit e push soltanto quando l'utente dice `pubblica`, usando il messaggio `edit`.
