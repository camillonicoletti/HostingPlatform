export const content = {
  brand: {
    name: 'LA MIA CASA',
    location: '[DA PERSONALIZZARE] Roma, Italia',
  },
  contacts: {
    whatsappDisplay: '+39 347 700 5683',
    whatsappUrl: 'https://wa.me/393477005683',
    phone: '[DA PERSONALIZZARE] +39 000 000 0000',
    email: '[DA PERSONALIZZARE] host@example.com',
    localEmergencyName: '[DA PERSONALIZZARE] Guardia medica locale',
    localEmergencyPhone: '[DA PERSONALIZZARE] +39 000 000 0000',
  },
  links: {
    propertyMap:
      'https://www.google.com/maps/search/?api=1&query=Via%20Tullio%20Ascarelli%2C%2099%20-%20Roma',
    review:
      'https://www.google.com/search?q=%5BDA%20PERSONALIZZARE%5D%20link%20recensione',
  },
  healthLinks: {
    openPharmacies:
      'https://www.federfarmaroma.com/farmacie_aperte.php',
    emergencyRooms: 'https://www.salutelazio.it/pronto-soccorso',
  },
  wifi: {
    network: '[DA PERSONALIZZARE] Nome rete Wi-Fi',
    password: '[DA PERSONALIZZARE] Password Wi-Fi',
  },
  locale: {
    it: {
      languageCode: 'it',
      languageName: 'Italiano',
      languageSelectorLabel: 'Lingua · Language',
      welcome:
        'Benvenuti. Qui trovate tutto ciò che serve per vivere la casa e la città con semplicità.',
      eyebrow: 'La vostra casa, a portata di mano',
      guidePrompt: 'Come possiamo aiutarvi?',
      openSection: 'Apri la sezione',
      close: 'Chiudi',
      maps: 'Apri in Google Maps',
      copyPassword: 'Copia password',
      copyPasswordSuccess: 'Accesso copiato',
      passwordCopied: 'Password copiata',
      copyFailed: 'Copia non riuscita: seleziona la password manualmente.',
      quickActionsLabel: 'Azioni rapide',
      quickActions: {
        whatsapp: 'WhatsApp host',
        recycling: 'Raccolta',
        emergency: 'Emergenze',
      },
      sections: [
        {
          id: 'checkin',
          title: 'Check-in',
          subtitle: 'Arrivo e accesso',
          addressLabel: 'Indirizzo',
          address: 'Via Tullio Ascarelli, 99 - Roma',
          checkInLabel: 'Check-in',
          checkIn: 'Ricordati di comunicare all’Host l’orario del tuo arrivo a casa.',
          housePhoto: '',
          housePhotoAlt: '[DA PERSONALIZZARE] Facciata di LA MIA CASA',
          housePhotoFallback: 'Foto della casa in arrivo',
          instructionsLabel: 'Come entrare',
          instructions:
            'All’arrivo troverai una persona che ti accoglierà e ti consegnerà le chiavi di casa.',
        },
        {
          id: 'wifi',
          title: 'Wi-Fi',
          subtitle: 'Rete e password',
          networkLabel: 'Nome rete',
          passwordLabel: 'Password',
          note: 'La rete è disponibile in tutta la casa.',
        },
        {
          id: 'rules',
          title: 'Regole casa',
          subtitle: 'Le cose essenziali',
          items: [
            {
              title: 'Rispetto degli altri',
              text: 'Mantenere sempre un comportamento educato e rispettoso. Evitare schiamazzi, musica ad alto volume e rumori molesti, soprattutto nelle ore serali e notturne. Rispettare la privacy degli altri ospiti.',
            },
            {
              title: 'Pulizia della propria stanza',
              text: 'Ogni ospite è tenuto a mantenere la propria camera in ordine e pulita durante il soggiorno. Non lasciare cibo deperibile o rifiuti all’interno della stanza. Prima della partenza verificare di non aver dimenticato effetti personali.',
            },
            {
              title: 'Utilizzo degli spazi comuni',
              text: 'Gli spazi comuni sono a disposizione di tutti gli ospiti. Si chiede di lasciarli puliti e ordinati dopo ogni utilizzo e di riporre eventuali oggetti personali al termine dell’uso.',
            },
            {
              title: 'Cucina',
              text: 'Lavare, asciugare e riporre stoviglie, pentole e utensili subito dopo l’utilizzo. Pulire il piano di lavoro e gli elettrodomestici utilizzati. Conservare gli alimenti in modo ordinato e nel rispetto degli altri ospiti. Non utilizzare alimenti appartenenti ad altri ospiti.',
            },
            {
              title: 'Bagno',
              text: 'Lasciare il bagno pulito dopo ogni utilizzo. Evitare sprechi d’acqua. Non gettare nel WC salviette, assorbenti o altri materiali non idonei.',
            },
            {
              title: 'Sicurezza',
              text: 'Spegnere le luci e gli apparecchi elettrici quando non necessari o prima di uscire. Chiudere porte e finestre quando si lascia l’abitazione. Avere cura delle chiavi di casa e non consegnarle a persone estranee.',
            },
            {
              title: 'Divieto di fumo',
              text: 'È vietato fumare all’interno dell’abitazione, comprese le camere e gli spazi comuni, mentre è possibile fumare all’esterno in terrazza.',
            },
            {
              title: 'Cura dell’immobile',
              text: 'Trattare con cura arredi, elettrodomestici e dotazioni della casa. Eventuali danni devono essere comunicati tempestivamente. È vietato spostare mobili senza autorizzazione. È obbligatorio rispettare le regole per la raccolta della spazzatura come da calendario. Qualsiasi problema relativo alla casa, come guasti, malfunzionamenti o situazioni particolari, deve essere comunicato tempestivamente al proprietario, così da poter intervenire nel più breve tempo possibile.',
            },
          ],
        },
        {
          id: 'food',
          title: 'Banche e Ufficio postale',
          subtitle: 'Banca e ufficio postale in zona',
          contacts: [
            {
              name: 'BCC Roma – Agenzia Massimina',
              badge: 'Banca',
              description: 'Via della Massimilla, 14 - Roma',
              actions: [
                { label: 'Chiama 06 52866051', href: 'tel:0652866051' },
                {
                  label: 'Apri in Google Maps',
                  href: 'https://www.google.com/maps/search/?api=1&query=BCC%20Roma%20Agenzia%20Massimina%20Via%20della%20Massimilla%2014%20Roma',
                },
              ],
            },
            {
              name: 'Poste Italiane – Ufficio Postale Roma 140',
              badge: 'Ufficio postale',
              description: 'Via della Massimilla, 75 - Roma',
              actions: [
                { label: 'Chiama 06 6693562', href: 'tel:066693562' },
                {
                  label: 'Apri in Google Maps',
                  href: 'https://www.google.com/maps/search/?api=1&query=Poste%20Italiane%20Roma%20140%20Via%20della%20Massimilla%2075%20Roma',
                },
              ],
            },
          ],
        },
        {
          id: 'transport',
          title: 'Trasporti',
          subtitle: 'Linea bus vicino casa',
          stopLabel: 'Punto di partenza',
          directionLabel: 'Direzione',
          frequencyLabel: 'Passaggi',
          moovit: 'Apri orari e fermate',
          lines: [
            {
              name: 'Linea 906 · Vicino a me',
              color: '#a94e34',
              stop: 'Via Tullio Ascarelli',
              direction: 'Valle Aurelia (Metro A - FL3) / Casale Lumbroso-Fontebasso',
              frequency: 'Consulta i tempi reali',
              stops: [
                'Via Tullio Ascarelli',
                'Valle Aurelia (Metro A - FL3)',
                'Casale Lumbroso-Fontebasso',
              ],
              moovit: 'https://viaggiacon.atac.roma.it/?cercaLinee=1&lineCode=906&pathCode=906R',
              map: 'https://www.google.com/maps/search/?api=1&query=fermata%20bus%20906%20Via%20Tullio%20Ascarelli%20Roma',
            },
          ],
          contacts: [
            {
              name: 'Taxi e ITTAXI',
              badge: '06 3570',
              description: 'Chiama il radiotaxi oppure prenota dall’app ITTAXI.',
              actions: [
                { label: 'Chiama 06 3570', href: 'tel:063570' },
                { label: 'Scarica App ITTAXI', href: 'https://www.ittaxi.it/' },
              ],
            },
            {
              name: 'App ATAC Roma',
              badge: 'iOS · Android',
              description: 'Consulta trasporti pubblici, fermate, orari e tempi di arrivo a Roma.',
              actions: [
                {
                  label: 'Scarica App ATAC Roma',
                  href: 'https://www.atac.roma.it/biglietti-e-abbonamenti/app-atac-roma',
                },
              ],
            },
          ],
        },
        {
          id: 'health',
          title: 'Farmacie e ospedali',
          subtitle: 'Assistenza nei dintorni',
          pharmaciesTab: 'Farmacie',
          hospitalsTab: 'Ospedali',
          tabsLabel: 'Scegli il tipo di assistenza',
          openPharmacies: 'Trova farmacie aperte',
          emergencyRooms: 'Trova pronto soccorso nel Lazio',
          emergencyNote:
            'In caso di emergenza chiama il 112: non scegliere un ospedale soltanto in base alla distanza.',
          phoneLabel: 'Telefono',
          pharmacies: [
            {
              name: 'Farmacia Buccella',
              description: 'Via Aurelia, 1297 - Roma',
              distance: 'Massimina–Casal Lumbroso',
              phone: '+39 06 6618 0089',
              map: 'https://www.google.com/maps/search/?api=1&query=Farmacia%20Buccella%20Via%20Aurelia%201297%20Roma',
            },
          ],
          hospitals: [
            {
              name: 'Aurelia Hospital',
              description: 'Via Aurelia, 860 - Roma · Pronto Soccorso DEA di 1° livello',
              distance: 'Aurelia',
              phone: '+39 06 6649 21',
              map: 'https://www.google.com/maps/search/?api=1&query=Aurelia%20Hospital%20Via%20Aurelia%20860%20Roma',
            },
            {
              name: 'Policlinico Universitario Agostino Gemelli IRCCS',
              description: 'Largo Agostino Gemelli, 8 - Roma · Pronto Soccorso',
              distance: 'Monte Mario',
              phone: '+39 06 3015 1',
              map: 'https://www.google.com/maps/search/?api=1&query=Policlinico%20Gemelli%20Largo%20Agostino%20Gemelli%208%20Roma',
            },
          ],
        },
        {
          id: 'groceries',
          title: 'Supermercati',
          subtitle: 'Supermercati a Casal Lumbroso e Massimina',
          items: [
            {
              name: 'Elite Supermercati',
              description: 'Via della Massimilla, 4/6/8 - Roma',
              distance: 'Massimina',
              map: 'https://www.google.com/maps/search/?api=1&query=Elite%20Supermercati%20Via%20della%20Massimilla%204%206%208%20Roma',
            },
            {
              name: 'Eurospin',
              description: 'Via Aurelia, 1303 - Roma',
              distance: 'Massimina',
              map: 'https://www.google.com/maps/search/?api=1&query=Eurospin%20Via%20Aurelia%201303%20Roma',
            },
            {
              name: 'Lidl',
              description: 'Via Aurelia, 1311 - Roma',
              distance: 'Massimina',
              map: 'https://www.google.com/maps/search/?api=1&query=Lidl%20Via%20Aurelia%201311%20Roma',
            },
            {
              name: 'Conad',
              description: 'Via Vittorino Cannavina, 5 - Roma',
              distance: 'Massimina',
              map: 'https://www.google.com/maps/search/?api=1&query=Conad%20Via%20Vittorino%20Cannavina%205%20Roma',
            },
            {
              name: 'Heaven Supermarket',
              description: 'Via della Massimilla, 59/61 - Roma',
              distance: 'Casal Lumbroso–Massimina',
              map: 'https://www.google.com/maps/search/?api=1&query=Heaven%20Supermarket%20Via%20della%20Massimilla%2059%2061%20Roma',
            },
          ],
        },
        {
          id: 'checkout',
          title: 'Check-out',
          subtitle: 'Prima di partire',
          timeLabel: 'Orario',
          time: 'Ricordati di comunicare all’Host il giorno e l’ora in cui lascerai la casa almeno una settimana prima.',
          tasksLabel: 'Un ultimo controllo',
          tasks: [
            'Ricordati di lasciare le chiavi come concordato con l’Host. Il deposito ti verrà restituito entro 45 giorni dal check-out.',
          ],
          contactHost: 'Contatta l’host',
          review: 'Lascia una recensione',
        },
      ],
      emergency: {
        title: 'Emergenze',
        intro: 'Chiama il 112 per le emergenze e il 116117 per l’assistenza medica non urgente fuori orario.',
        contacts: [
          {
            name: 'Emergenze',
            badge: '112',
            description: 'Numero unico europeo per le emergenze.',
            actions: [{ label: 'Chiama 112', href: 'tel:112' }],
          },
          {
            name: 'Guardia medica',
            badge: '116117',
            description: 'Servizio di continuità assistenziale.',
            hours: [
              'Notti feriali e festive: dalle 20:00 alle 08:00.',
              'Sabato e giorni prefestivi: dalle 10:00 alle 20:00.',
              'Domenica e giorni festivi: dalle 08:00 alle 20:00.',
            ],
            actions: [{ label: 'Chiama 116117', href: 'tel:116117' }],
          },
        ],
      },
      recycling: {
        title: 'Raccolta differenziata',
        intro: 'Calendario settimanale dei ritiri sotto casa.',
        demoNote:
          'Chiudi accuratamente i sacchetti e depositali la sera precedente fuori dal portoncino sulla strada. Il vetro non viene raccolto porta a porta: uscendo dal portone gira a destra e usa l’apposito contenitore comunale poco più avanti.',
        reminder: 'Attiva promemoria',
        reminderIntro: 'Scegli il calendario che usi sul telefono.',
        apple: 'Apple / iPhone',
        google: 'Google Calendar',
        addToGoogle: 'Aggiungi',
        noCollection: 'Nessun ritiro',
        calendarTitlePrefix: 'Raccolta',
        calendarDescription: 'Promemoria raccolta differenziata di LA MIA CASA.',
        calendarError: 'Calendario non disponibile: usa Google Calendar.',
        schedule: [
          { weekday: 1, day: 'Lunedì', material: 'Umido', kind: 'organic', collects: true },
          { weekday: 2, day: 'Martedì', material: 'Nessun ritiro', kind: 'none', collects: false },
          { weekday: 3, day: 'Mercoledì', material: 'Umido', kind: 'organic', collects: true },
          { weekday: 4, day: 'Giovedì', material: 'Indifferenziata', kind: 'general', collects: true },
          { weekday: 5, day: 'Venerdì', material: 'Carta e cartone', kind: 'paper', collects: true },
          { weekday: 6, day: 'Sabato', material: 'Plastica e umido', kind: 'plastic', collects: true },
          { weekday: 0, day: 'Domenica', material: 'Nessun ritiro', kind: 'none', collects: false },
        ],
      },
    },
    en: {
      languageCode: 'en',
      languageName: 'English',
      languageSelectorLabel: 'Language · Lingua',
      welcome:
        'Welcome. Everything you need to enjoy the home and the city is right here.',
      eyebrow: 'Your home, close at hand',
      guidePrompt: 'How can we help?',
      openSection: 'Open section',
      close: 'Close',
      maps: 'Open in Google Maps',
      copyPassword: 'Copy password',
      copyPasswordSuccess: 'Access copied',
      passwordCopied: 'Password copied',
      copyFailed: 'Copy failed: please select the password manually.',
      quickActionsLabel: 'Quick actions',
      quickActions: {
        whatsapp: 'WhatsApp host',
        recycling: 'Recycling',
        emergency: 'Emergencies',
      },
      sections: [
        {
          id: 'checkin',
          title: 'Check-in',
          subtitle: 'Arrival and access',
          addressLabel: 'Address',
          address: 'Via Tullio Ascarelli, 99 - Roma',
          checkInLabel: 'Check-in',
          checkIn: 'Remember to tell the Host what time you will arrive at the house.',
          housePhoto: '',
          housePhotoAlt: '[DA PERSONALIZZARE] LA MIA CASA exterior',
          housePhotoFallback: 'House photo coming soon',
          instructionsLabel: 'How to enter',
          instructions:
            'When you arrive, someone will welcome you and give you the house keys.',
        },
        {
          id: 'wifi',
          title: 'Wi-Fi',
          subtitle: 'Network and password',
          networkLabel: 'Network name',
          passwordLabel: 'Password',
          note: 'The network is available throughout the home.',
        },
        {
          id: 'rules',
          title: 'House rules',
          subtitle: 'The essentials',
          items: [
            {
              title: 'Respect for others',
              text: 'Always behave politely and respectfully. Avoid shouting, loud music and disturbing noise, especially in the evening and at night. Respect the privacy of other guests.',
            },
            {
              title: 'Keeping your room clean',
              text: 'Each guest must keep their room tidy and clean during their stay. Do not leave perishable food or rubbish in the room. Before leaving, check that you have not forgotten any personal belongings.',
            },
            {
              title: 'Use of shared spaces',
              text: 'Shared spaces are available to all guests. Please leave them clean and tidy after each use and put away any personal belongings when you have finished.',
            },
            {
              title: 'Kitchen',
              text: 'Wash, dry and put away dishes, pots and utensils immediately after use. Clean the worktop and any appliances used. Store food neatly and with consideration for other guests. Do not use food belonging to other guests.',
            },
            {
              title: 'Bathroom',
              text: 'Leave the bathroom clean after each use. Avoid wasting water. Do not flush wipes, sanitary products or other unsuitable materials down the toilet.',
            },
            {
              title: 'Safety',
              text: 'Turn off lights and electrical appliances when they are not needed or before going out. Close doors and windows when leaving the property. Take care of the house keys and do not give them to anyone else.',
            },
            {
              title: 'No smoking',
              text: 'Smoking is prohibited inside the property, including in the bedrooms and shared spaces. Smoking is permitted outside on the terrace.',
            },
            {
              title: 'Care of the property',
              text: 'Treat the furniture, appliances and household equipment with care. Report any damage promptly. Do not move furniture without permission. You must follow the waste collection rules shown on the schedule. Any problem involving the property, including faults, malfunctions or unusual situations, must be reported promptly to the owner so that it can be dealt with as quickly as possible.',
            },
          ],
        },
        {
          id: 'food',
          title: 'Banks and Post Office',
          subtitle: 'Nearby bank and post office',
          contacts: [
            {
              name: 'BCC Roma – Agenzia Massimina',
              badge: 'Bank',
              description: 'Via della Massimilla, 14 - Roma',
              actions: [
                { label: 'Call 06 52866051', href: 'tel:0652866051' },
                {
                  label: 'Open in Google Maps',
                  href: 'https://www.google.com/maps/search/?api=1&query=BCC%20Roma%20Agenzia%20Massimina%20Via%20della%20Massimilla%2014%20Roma',
                },
              ],
            },
            {
              name: 'Poste Italiane – Ufficio Postale Roma 140',
              badge: 'Post office',
              description: 'Via della Massimilla, 75 - Roma',
              actions: [
                { label: 'Call 06 6693562', href: 'tel:066693562' },
                {
                  label: 'Open in Google Maps',
                  href: 'https://www.google.com/maps/search/?api=1&query=Poste%20Italiane%20Roma%20140%20Via%20della%20Massimilla%2075%20Roma',
                },
              ],
            },
          ],
        },
        {
          id: 'transport',
          title: 'Transport',
          subtitle: 'Bus line near the house',
          stopLabel: 'Starting point',
          directionLabel: 'Direction',
          frequencyLabel: 'Service times',
          moovit: 'Open times and stops',
          lines: [
            {
              name: 'Line 906 · Near me',
              color: '#a94e34',
              stop: 'Via Tullio Ascarelli',
              direction: 'Valle Aurelia (Metro A - FL3) / Casale Lumbroso-Fontebasso',
              frequency: 'Check live times',
              stops: [
                'Via Tullio Ascarelli',
                'Valle Aurelia (Metro A - FL3)',
                'Casale Lumbroso-Fontebasso',
              ],
              moovit: 'https://viaggiacon.atac.roma.it/?cercaLinee=1&lineCode=906&pathCode=906R',
              map: 'https://www.google.com/maps/search/?api=1&query=bus%20906%20stop%20Via%20Tullio%20Ascarelli%20Rome',
            },
          ],
          contacts: [
            {
              name: 'Taxi and ITTAXI',
              badge: '06 3570',
              description: 'Call the radio taxi or book through the ITTAXI app.',
              actions: [
                { label: 'Call 06 3570', href: 'tel:063570' },
                { label: 'Download ITTAXI App', href: 'https://www.ittaxi.it/' },
              ],
            },
            {
              name: 'ATAC Roma App',
              badge: 'iOS · Android',
              description: 'Check public transport, stops, schedules and arrival times in Rome.',
              actions: [
                {
                  label: 'Download ATAC Roma App',
                  href: 'https://www.atac.roma.it/biglietti-e-abbonamenti/app-atac-roma',
                },
              ],
            },
          ],
        },
        {
          id: 'health',
          title: 'Pharmacies & hospitals',
          subtitle: 'Nearby healthcare',
          pharmaciesTab: 'Pharmacies',
          hospitalsTab: 'Hospitals',
          tabsLabel: 'Choose the type of healthcare',
          openPharmacies: 'Find open pharmacies',
          emergencyRooms: 'Find an emergency room in Lazio',
          emergencyNote:
            'Call 112 in an emergency: do not choose a hospital based only on distance.',
          phoneLabel: 'Phone',
          pharmacies: [
            {
              name: 'Farmacia Buccella',
              description: 'Via Aurelia, 1297 - Roma',
              distance: 'Massimina–Casal Lumbroso',
              phone: '+39 06 6618 0089',
              map: 'https://www.google.com/maps/search/?api=1&query=Farmacia%20Buccella%20Via%20Aurelia%201297%20Roma',
            },
          ],
          hospitals: [
            {
              name: 'Aurelia Hospital',
              description: 'Via Aurelia, 860 - Roma · Emergency Department, Level 1 DEA',
              distance: 'Aurelia',
              phone: '+39 06 6649 21',
              map: 'https://www.google.com/maps/search/?api=1&query=Aurelia%20Hospital%20Via%20Aurelia%20860%20Roma',
            },
            {
              name: 'Policlinico Universitario Agostino Gemelli IRCCS',
              description: 'Largo Agostino Gemelli, 8 - Roma · Emergency Department',
              distance: 'Monte Mario',
              phone: '+39 06 3015 1',
              map: 'https://www.google.com/maps/search/?api=1&query=Policlinico%20Gemelli%20Largo%20Agostino%20Gemelli%208%20Roma',
            },
          ],
        },
        {
          id: 'groceries',
          title: 'Supermarkets',
          subtitle: 'Supermarkets in Casal Lumbroso and Massimina',
          items: [
            { name: 'Elite Supermercati', description: 'Via della Massimilla, 4/6/8 - Roma', distance: 'Massimina', map: 'https://www.google.com/maps/search/?api=1&query=Elite%20Supermercati%20Via%20della%20Massimilla%204%206%208%20Roma' },
            { name: 'Eurospin', description: 'Via Aurelia, 1303 - Roma', distance: 'Massimina', map: 'https://www.google.com/maps/search/?api=1&query=Eurospin%20Via%20Aurelia%201303%20Roma' },
            { name: 'Lidl', description: 'Via Aurelia, 1311 - Roma', distance: 'Massimina', map: 'https://www.google.com/maps/search/?api=1&query=Lidl%20Via%20Aurelia%201311%20Roma' },
            { name: 'Conad', description: 'Via Vittorino Cannavina, 5 - Roma', distance: 'Massimina', map: 'https://www.google.com/maps/search/?api=1&query=Conad%20Via%20Vittorino%20Cannavina%205%20Roma' },
            { name: 'Heaven Supermarket', description: 'Via della Massimilla, 59/61 - Roma', distance: 'Casal Lumbroso–Massimina', map: 'https://www.google.com/maps/search/?api=1&query=Heaven%20Supermarket%20Via%20della%20Massimilla%2059%2061%20Roma' },
          ],
        },
        {
          id: 'checkout',
          title: 'Check-out',
          subtitle: 'Before you leave',
          timeLabel: 'Time',
          time: 'Remember to tell the Host the day and time you will leave the house at least one week in advance.',
          tasksLabel: 'One last check',
          tasks: [
            'Remember to leave the keys as agreed with the Host. Your deposit will be returned within 45 days of check-out.',
          ],
          contactHost: 'Contact the host',
          review: 'Leave a review',
        },
      ],
      emergency: {
        title: 'Emergencies',
        intro: 'Call 112 for emergencies and 116117 for non-urgent medical care outside regular hours.',
        contacts: [
          {
            name: 'Emergencies',
            badge: '112',
            description: 'European single emergency number.',
            actions: [{ label: 'Call 112', href: 'tel:112' }],
          },
          {
            name: 'Out-of-hours medical service',
            badge: '116117',
            description: 'Medical care service outside regular hours.',
            hours: [
              'Weeknights and public holidays: from 8:00 pm to 8:00 am.',
              'Saturdays and days before public holidays: from 10:00 am to 8:00 pm.',
              'Sundays and public holidays: from 8:00 am to 8:00 pm.',
            ],
            actions: [{ label: 'Call 116117', href: 'tel:116117' }],
          },
        ],
      },
      recycling: {
        title: 'Recycling collection',
        intro: 'Weekly collection schedule outside the house.',
        demoNote:
          'Close the bags carefully and put them outside the street entrance on the evening before collection. Glass is not collected door to door: turn right when leaving the entrance and use the municipal glass container a little further along the road.',
        reminder: 'Set reminders',
        reminderIntro: 'Choose the calendar you use on your phone.',
        apple: 'Apple / iPhone',
        google: 'Google Calendar',
        addToGoogle: 'Add',
        noCollection: 'No collection',
        calendarTitlePrefix: 'Collection',
        calendarDescription: 'LA MIA CASA recycling collection reminder.',
        calendarError: 'Calendar unavailable: use Google Calendar.',
        schedule: [
          { weekday: 1, day: 'Monday', material: 'Food waste', kind: 'organic', collects: true },
          { weekday: 2, day: 'Tuesday', material: 'No collection', kind: 'none', collects: false },
          { weekday: 3, day: 'Wednesday', material: 'Food waste', kind: 'organic', collects: true },
          { weekday: 4, day: 'Thursday', material: 'General waste', kind: 'general', collects: true },
          { weekday: 5, day: 'Friday', material: 'Paper and cardboard', kind: 'paper', collects: true },
          { weekday: 6, day: 'Saturday', material: 'Plastic and food waste', kind: 'plastic', collects: true },
          { weekday: 0, day: 'Sunday', material: 'No collection', kind: 'none', collects: false },
        ],
      },
    },
  },
};

export function getLocalizedContent(language) {
  const selected = content.locale[language] ?? content.locale.it;
  const sections = [...selected.sections];
  const banksIndex = sections.findIndex((section) => section.id === 'food');
  const supermarketsIndex = sections.findIndex(
    (section) => section.id === 'groceries',
  );

  [sections[banksIndex], sections[supermarketsIndex]] = [
    sections[supermarketsIndex],
    sections[banksIndex],
  ];

  return {
    ...selected,
    sections,
    brand: content.brand,
    contacts: content.contacts,
    links: content.links,
    healthLinks: content.healthLinks,
    wifi: content.wifi,
  };
}
