export const content = {
  brand: {
    name: '[DA PERSONALIZZARE] Casa Terracotta',
    location: '[DA PERSONALIZZARE] Roma, Italia',
  },
  contacts: {
    whatsappDisplay: '[DA PERSONALIZZARE] +39 000 000 0000',
    whatsappUrl: 'https://wa.me/390000000000',
    phone: '[DA PERSONALIZZARE] +39 000 000 0000',
    email: '[DA PERSONALIZZARE] host@example.com',
    localEmergencyName: '[DA PERSONALIZZARE] Guardia medica locale',
    localEmergencyPhone: '[DA PERSONALIZZARE] +39 000 000 0000',
  },
  links: {
    propertyMap:
      'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20indirizzo%20struttura',
    review:
      'https://www.google.com/search?q=%5BDA%20PERSONALIZZARE%5D%20link%20recensione',
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
      passwordCopied: 'Password copiata',
      copyFailed: 'Copia non riuscita: seleziona la password manualmente.',
      quickActionsLabel: 'Azioni rapide',
      quickActions: {
        whatsapp: 'WhatsApp host',
        location: 'Posizione',
        emergency: 'Emergenze',
      },
      sections: [
        {
          id: 'checkin',
          title: 'Check-in',
          subtitle: 'Arrivo e accesso',
          addressLabel: 'Indirizzo',
          address: '[DA PERSONALIZZARE] Via dell’Ospitalità 10, Roma',
          checkInLabel: 'Check-in',
          checkIn: '[DA PERSONALIZZARE] dalle 15:00 alle 20:00',
          instructionsLabel: 'Come entrare',
          instructions:
            '[DA PERSONALIZZARE] Avvisateci 30 minuti prima dell’arrivo. Il codice di accesso verrà inviato privatamente prima del check-in.',
          parkingLabel: 'Parcheggio',
          parking:
            '[DA PERSONALIZZARE] Parcheggio pubblico disponibile nella via adiacente.',
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
              title: 'Clima',
              text: '[DA PERSONALIZZARE] Il comando dell’aria condizionata è vicino all’ingresso.',
            },
            {
              title: 'Elettrodomestici',
              text: '[DA PERSONALIZZARE] Cucina, forno, lavastoviglie e lavatrice sono a disposizione.',
            },
            {
              title: 'Raccolta differenziata',
              text: '[DA PERSONALIZZARE] I contenitori sono sotto il lavello; il calendario è sul frigorifero.',
            },
            {
              title: 'Silenzio',
              text: '[DA PERSONALIZZARE] Evitate rumori dalle 22:00 alle 08:00.',
            },
            {
              title: 'In casa',
              text: '[DA PERSONALIZZARE] Non è consentito fumare e non sono ammesse feste.',
            },
          ],
        },
        {
          id: 'food',
          title: 'Dove mangiare',
          subtitle: 'Sei indirizzi scelti per voi',
          places: [
            {
              name: '[DA PERSONALIZZARE] Trattoria del Vicolo',
              category: '[DA PERSONALIZZARE] Cucina romana',
              tip: '[DA PERSONALIZZARE] Ideale per una cena informale; provate il piatto del giorno.',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Trattoria%20del%20Vicolo',
            },
            {
              name: '[DA PERSONALIZZARE] Forno della Piazza',
              category: '[DA PERSONALIZZARE] Panificio',
              tip: '[DA PERSONALIZZARE] Perfetto per colazione e pizza al taglio.',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Forno%20della%20Piazza',
            },
            {
              name: '[DA PERSONALIZZARE] L’Oliva',
              category: '[DA PERSONALIZZARE] Vegetariano',
              tip: '[DA PERSONALIZZARE] Piatti stagionali e ottime opzioni senza glutine.',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20L%27Oliva',
            },
            {
              name: '[DA PERSONALIZZARE] Bottega 12',
              category: '[DA PERSONALIZZARE] Enoteca',
              tip: '[DA PERSONALIZZARE] Buona scelta per un aperitivo tranquillo.',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Bottega%2012',
            },
            {
              name: '[DA PERSONALIZZARE] Gelateria Fiore',
              category: '[DA PERSONALIZZARE] Gelateria',
              tip: '[DA PERSONALIZZARE] Gusti artigianali e sorbetti alla frutta.',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Gelateria%20Fiore',
            },
            {
              name: '[DA PERSONALIZZARE] Terrazza Verde',
              category: '[DA PERSONALIZZARE] Ristorante panoramico',
              tip: '[DA PERSONALIZZARE] Prenotate un tavolo esterno al tramonto.',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Terrazza%20Verde',
            },
          ],
        },
        {
          id: 'transport',
          title: 'Trasporti vicini',
          subtitle: 'Come muoversi',
          items: [
            {
              name: '[DA PERSONALIZZARE] Fermata autobus',
              description: '[DA PERSONALIZZARE] Linee utili per raggiungere il centro e la stazione.',
              distance: '[DA PERSONALIZZARE] 4 min a piedi',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20fermata%20autobus',
            },
            {
              name: '[DA PERSONALIZZARE] Stazione ferroviaria',
              description: '[DA PERSONALIZZARE] Collegamenti regionali e nazionali.',
              distance: '[DA PERSONALIZZARE] 1,5 km',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20stazione%20ferroviaria',
            },
            {
              name: '[DA PERSONALIZZARE] Punto taxi',
              description: '[DA PERSONALIZZARE] Taxi e transfer disponibili su prenotazione.',
              distance: '[DA PERSONALIZZARE] 8 min a piedi',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20punto%20taxi',
            },
          ],
        },
        {
          id: 'explore',
          title: 'Cosa vedere',
          subtitle: 'Luoghi e attività vicini',
          attractions: [
            {
              name: '[DA PERSONALIZZARE] Piazza del Borgo',
              description: '[DA PERSONALIZZARE] Il cuore storico del quartiere, piacevole al mattino.',
              distance: '[DA PERSONALIZZARE] 8 min a piedi',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Piazza%20del%20Borgo',
            },
            {
              name: '[DA PERSONALIZZARE] Museo Civico',
              description: '[DA PERSONALIZZARE] Una visita breve tra arte e storia locale.',
              distance: '[DA PERSONALIZZARE] 1,2 km',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Museo%20Civico',
            },
            {
              name: '[DA PERSONALIZZARE] Giardino degli Ulivi',
              description: '[DA PERSONALIZZARE] Un angolo verde per passeggiare e rilassarsi.',
              distance: '[DA PERSONALIZZARE] 15 min a piedi',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Giardino%20degli%20Ulivi',
            },
            {
              name: '[DA PERSONALIZZARE] Belvedere',
              description: '[DA PERSONALIZZARE] Il punto migliore per una foto al tramonto.',
              distance: '[DA PERSONALIZZARE] 2 km',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Belvedere',
            },
            {
              name: '[DA PERSONALIZZARE] Mercato rionale',
              description: '[DA PERSONALIZZARE] Banchi locali e prodotti freschi fino a pranzo.',
              distance: '[DA PERSONALIZZARE] 10 min a piedi',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Mercato%20rionale',
            },
            {
              name: '[DA PERSONALIZZARE] Passeggiata sul fiume',
              description: '[DA PERSONALIZZARE] Percorso facile, piacevole nelle ore più fresche.',
              distance: '[DA PERSONALIZZARE] 3 km',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Passeggiata%20sul%20fiume',
            },
          ],
        },
        {
          id: 'groceries',
          title: 'Supermercati',
          subtitle: 'Spesa nelle vicinanze',
          items: [
            {
              name: '[DA PERSONALIZZARE] Supermercato Centro',
              description: '[DA PERSONALIZZARE] Supermercato completo, aperto tutti i giorni.',
              distance: '[DA PERSONALIZZARE] 6 min a piedi',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20supermercato',
            },
            {
              name: '[DA PERSONALIZZARE] Alimentari Baiocco',
              description: '[DA PERSONALIZZARE] Piccolo negozio per acquisti rapidi e prodotti locali.',
              distance: '[DA PERSONALIZZARE] 3 min a piedi',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20alimentari',
            },
            {
              name: '[DA PERSONALIZZARE] Mercato rionale',
              description: '[DA PERSONALIZZARE] Frutta, verdura e prodotti freschi al mattino.',
              distance: '[DA PERSONALIZZARE] 10 min a piedi',
              map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20mercato%20rionale',
            },
          ],
        },
        {
          id: 'checkout',
          title: 'Check-out',
          subtitle: 'Prima di partire',
          timeLabel: 'Orario',
          time: '[DA PERSONALIZZARE] entro le 10:00',
          tasksLabel: 'Un ultimo controllo',
          tasks: [
            '[DA PERSONALIZZARE] Spegnete luci e climatizzazione.',
            '[DA PERSONALIZZARE] Lasciate i piatti puliti.',
            '[DA PERSONALIZZARE] Chiudete porte e finestre.',
            '[DA PERSONALIZZARE] Lasciate le chiavi come concordato con l’host.',
          ],
          contactHost: 'Contatta l’host',
          review: 'Lascia una recensione',
        },
      ],
      emergency: {
        title: 'Emergenze',
        intro: 'Questi numeri sono mostrati solo come riferimento. Tocca Chiudi per tornare alla guida.',
        europeanLabel: 'Numero unico europeo',
        europeanNumber: '112',
        hostLabel: 'Telefono host',
        localLabel: 'Contatto locale',
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
      passwordCopied: 'Password copied',
      copyFailed: 'Copy failed: please select the password manually.',
      quickActionsLabel: 'Quick actions',
      quickActions: {
        whatsapp: 'WhatsApp host',
        location: 'Location',
        emergency: 'Emergencies',
      },
      sections: [
        {
          id: 'checkin',
          title: 'Check-in',
          subtitle: 'Arrival and access',
          addressLabel: 'Address',
          address: '[DA PERSONALIZZARE] 10 Hospitality Street, Rome',
          checkInLabel: 'Check-in',
          checkIn: '[DA PERSONALIZZARE] from 3:00 pm to 8:00 pm',
          instructionsLabel: 'How to enter',
          instructions:
            '[DA PERSONALIZZARE] Let us know 30 minutes before arrival. The access code will be sent privately before check-in.',
          parkingLabel: 'Parking',
          parking: '[DA PERSONALIZZARE] Public parking is available on the next street.',
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
            { title: 'Climate', text: '[DA PERSONALIZZARE] The air-conditioning control is by the entrance.' },
            { title: 'Appliances', text: '[DA PERSONALIZZARE] Kitchen, oven, dishwasher and washing machine are available.' },
            { title: 'Recycling', text: '[DA PERSONALIZZARE] Bins are under the sink; the schedule is on the fridge.' },
            { title: 'Quiet hours', text: '[DA PERSONALIZZARE] Please keep noise down from 10:00 pm to 8:00 am.' },
            { title: 'House rules', text: '[DA PERSONALIZZARE] No smoking and no parties.' },
          ],
        },
        {
          id: 'food',
          title: 'Where to eat',
          subtitle: 'Six places selected for you',
          places: [
            { name: '[DA PERSONALIZZARE] Trattoria del Vicolo', category: '[DA PERSONALIZZARE] Roman cuisine', tip: '[DA PERSONALIZZARE] Great for a relaxed dinner; try the dish of the day.', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Trattoria%20del%20Vicolo' },
            { name: '[DA PERSONALIZZARE] Forno della Piazza', category: '[DA PERSONALIZZARE] Bakery', tip: '[DA PERSONALIZZARE] Perfect for breakfast and pizza by the slice.', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Forno%20della%20Piazza' },
            { name: '[DA PERSONALIZZARE] L’Oliva', category: '[DA PERSONALIZZARE] Vegetarian', tip: '[DA PERSONALIZZARE] Seasonal dishes and good gluten-free options.', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20L%27Oliva' },
            { name: '[DA PERSONALIZZARE] Bottega 12', category: '[DA PERSONALIZZARE] Wine bar', tip: '[DA PERSONALIZZARE] A good choice for a quiet aperitivo.', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Bottega%2012' },
            { name: '[DA PERSONALIZZARE] Gelateria Fiore', category: '[DA PERSONALIZZARE] Gelateria', tip: '[DA PERSONALIZZARE] Artisan flavours and fresh fruit sorbets.', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Gelateria%20Fiore' },
            { name: '[DA PERSONALIZZARE] Terrazza Verde', category: '[DA PERSONALIZZARE] Panoramic restaurant', tip: '[DA PERSONALIZZARE] Reserve an outdoor table at sunset.', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Terrazza%20Verde' },
          ],
        },
        {
          id: 'transport',
          title: 'Nearby transport',
          subtitle: 'Getting around',
          items: [
            { name: '[DA PERSONALIZZARE] Bus stop', description: '[DA PERSONALIZZARE] Useful routes to the centre and railway station.', distance: '[DA PERSONALIZZARE] 4 min walk', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20fermata%20autobus' },
            { name: '[DA PERSONALIZZARE] Railway station', description: '[DA PERSONALIZZARE] Regional and national connections.', distance: '[DA PERSONALIZZARE] 1.5 km', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20stazione%20ferroviaria' },
            { name: '[DA PERSONALIZZARE] Taxi rank', description: '[DA PERSONALIZZARE] Taxis and transfers available by reservation.', distance: '[DA PERSONALIZZARE] 8 min walk', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20punto%20taxi' },
          ],
        },
        {
          id: 'explore',
          title: 'What to see',
          subtitle: 'Nearby places and activities',
          attractions: [
            { name: '[DA PERSONALIZZARE] Village Square', description: '[DA PERSONALIZZARE] The historic heart of the neighbourhood, lovely in the morning.', distance: '[DA PERSONALIZZARE] 8 min walk', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Piazza%20del%20Borgo' },
            { name: '[DA PERSONALIZZARE] Civic Museum', description: '[DA PERSONALIZZARE] A short visit through local art and history.', distance: '[DA PERSONALIZZARE] 1.2 km', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Museo%20Civico' },
            { name: '[DA PERSONALIZZARE] Olive Garden', description: '[DA PERSONALIZZARE] A green corner for a walk and a quiet pause.', distance: '[DA PERSONALIZZARE] 15 min walk', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Giardino%20degli%20Ulivi' },
            { name: '[DA PERSONALIZZARE] Viewpoint', description: '[DA PERSONALIZZARE] The best place for a sunset photo.', distance: '[DA PERSONALIZZARE] 2 km', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Belvedere' },
            { name: '[DA PERSONALIZZARE] Local Market', description: '[DA PERSONALIZZARE] Local stalls and fresh produce until lunchtime.', distance: '[DA PERSONALIZZARE] 10 min walk', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Mercato%20rionale' },
            { name: '[DA PERSONALIZZARE] Riverside Walk', description: '[DA PERSONALIZZARE] An easy route, best during cooler hours.', distance: '[DA PERSONALIZZARE] 3 km', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20Passeggiata%20sul%20fiume' },
          ],
        },
        {
          id: 'groceries',
          title: 'Supermarkets',
          subtitle: 'Groceries nearby',
          items: [
            { name: '[DA PERSONALIZZARE] Central Supermarket', description: '[DA PERSONALIZZARE] Full supermarket, open every day.', distance: '[DA PERSONALIZZARE] 6 min walk', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20supermercato' },
            { name: '[DA PERSONALIZZARE] Baiocco Grocery', description: '[DA PERSONALIZZARE] Small shop for quick purchases and local products.', distance: '[DA PERSONALIZZARE] 3 min walk', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20alimentari' },
            { name: '[DA PERSONALIZZARE] Local Market', description: '[DA PERSONALIZZARE] Fruit, vegetables and fresh products in the morning.', distance: '[DA PERSONALIZZARE] 10 min walk', map: 'https://www.google.com/maps/search/?api=1&query=%5BDA%20PERSONALIZZARE%5D%20mercato%20rionale' },
          ],
        },
        {
          id: 'checkout',
          title: 'Check-out',
          subtitle: 'Before you leave',
          timeLabel: 'Time',
          time: '[DA PERSONALIZZARE] by 10:00 am',
          tasksLabel: 'One last check',
          tasks: [
            '[DA PERSONALIZZARE] Turn off lights and climate control.',
            '[DA PERSONALIZZARE] Leave the dishes clean.',
            '[DA PERSONALIZZARE] Close doors and windows.',
            '[DA PERSONALIZZARE] Leave the keys as agreed with the host.',
          ],
          contactHost: 'Contact the host',
          review: 'Leave a review',
        },
      ],
      emergency: {
        title: 'Emergencies',
        intro: 'These numbers are shown for reference only. Tap Close to return to the guide.',
        europeanLabel: 'European emergency number',
        europeanNumber: '112',
        hostLabel: 'Host phone',
        localLabel: 'Local contact',
      },
    },
  },
};

export function getLocalizedContent(language) {
  const selected = content.locale[language] ?? content.locale.it;

  return {
    ...selected,
    brand: content.brand,
    contacts: content.contacts,
    links: content.links,
    wifi: content.wifi,
  };
}
