const baseTranslations = {
  en: {
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot your password?',
      continueWith: 'Or continue with',
      checkEmail: 'Check your email for the login link!'
    },
    tickets: {
      createNew: 'Create New Ticket',
      createNewDescription: 'Create a new repair ticket for a customer',
      viewAll: 'View All Tickets',
      viewAllDescription: 'View and manage all repair tickets',
      allTickets: 'All Tickets',
      recentTickets: 'Recent Tickets',
      title: 'Title',
      description: 'Description',
      customerName: 'Customer Name',
      customerEmail: 'Customer Email',
      customerPhone: 'Phone Number',
      deviceType: 'Device Type',
      price: 'Price',
      password: 'Device Password',
      purchaseDate: 'Date of Purchase',
      orderId: 'Order ID (optional)',
      orderIdPlaceholder: 'Enter your order ID if available',
      priority: {
        label: 'Priority',
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        all: 'All Priorities'
      },
      status: {
        label: 'Status',
        'Ticket inserito': 'Ticket Created',
        'In assegnazione al tecnico': 'Assigning to Technician',
        'In lavorazione': 'In Progress',
        'Parti ordinate': 'Parts Ordered',
        'Pronto per il ritiro': 'Ready for Pickup',
        'Chiuso': 'Closed',
        'Preventivo inviato': 'Quote Sent',
        'Preventivo accettato': 'Quote Accepted',
        'Rifiutato': 'Rejected',
        'allStatuses': 'All Statuses'
      },
      actions: {
        create: 'Create Ticket',
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        print: 'Print',
        viewDetail: 'View Detail',
        createAnother: 'Create Another Ticket'
      },
      messages: {
        createSuccess: 'Ticket created successfully',
        createError: 'Error creating ticket: ',
        updateError: 'Error updating ticket: ',
        deleteConfirm: 'Are you sure you want to delete this ticket?',
        signInRequired: 'Please sign in to create a ticket',
        thankYou: 'Thank You!',
        ticketCreated: 'Your repair ticket has been created successfully. Your ticket number is:',
        createAnother: 'Create Another Ticket'
      },
      search: 'Search tickets...',
      sort: {
        date: 'Sort by Date',
        priority: 'Sort by Priority'
      },
      contact: {
        email: 'Contact via Email',
        whatsapp: 'Contact via WhatsApp'
      },
      detail: {
        title: 'Repair Ticket',
        createdBy: 'Created by',
        created: 'Created',
        lastUpdated: 'Last Updated',
        status: 'Status',
        priority: 'Priority',
        customerInfo: 'Customer Information',
        name: 'Name',
        email: 'Email',
        deviceInfo: 'Device Information',
        deviceType: 'Device Type',
        price: 'Price',
        password: 'Device Password',
        description: 'Description',
        termsAndConditions: 'Terms and Conditions',
        customerSignature: 'Customer Signature',
        date: 'Date',
        signHere: 'Sign here'
      },
      assignTo: 'Assign To',
      assignedTo: 'Assigned to',
      unassigned: 'Unassigned'
    },
    common: {
      signOut: 'Sign Out',
      loading: 'Loading...',
      scanForTicketDetails: 'Scan for ticket details',
      loggedInAs: 'Logged in as'
    },
    settings: {
      title: 'Settings',
      logo: {
        title: 'Logo Settings',
        url: 'Logo URL',
        urlPlaceholder: 'https://example.com/logo.png',
        description: 'Enter the URL of your company logo',
        preview: 'Logo Preview',
        saveButton: 'Save Logo URL',
        saving: 'Saving...',
        success: 'Logo URL updated successfully',
        error: 'Failed to load logo URL',
        loadError: 'Failed to load logo from the provided URL. Please check the URL and try again.'
      },
      email: {
        title: 'Email Notifications',
        adminEmail: 'Admin Email Address',
        newTicket: 'Send email when new ticket is created',
        statusChange: 'Send email when ticket status changes',
        oldTickets: 'Notify admin about old tickets',
        daysBeforeNotification: 'Days before notification',
        saveButton: 'Save Settings',
        saving: 'Saving...',
        success: 'Email settings updated successfully',
        error: 'Failed to load email settings',
        testButton: 'Send Test Email',
        testSuccess: 'Test email sent successfully!',
        testError: 'Failed to send test email',
        checkOldTickets: 'Check Old Tickets Now',
        setupInstructions: 'Email Notification Setup',
        setupDescription: 'To enable email notifications, you need to set up a Supabase Edge Function:',
        setupSteps: {
          createFunction: 'Create a new Edge Function in your Supabase project called',
          useService: 'Use a service like SendGrid, Mailgun, or Resend for sending emails',
          configureFunction: 'Configure the Edge Function to send emails using your preferred service',
          setAdminEmail: 'Set the admin email address above to receive notifications'
        }
      },
      terms: {
        title: 'Terms and Conditions',
        text: 'Terms and Conditions Text',
        description: 'This text will appear on printed repair tickets',
        saveButton: 'Save Terms',
        saving: 'Saving...',
        success: 'Terms and conditions updated successfully',
        error: 'Failed to load terms and conditions'
      }
    }
  },
  it: {
    auth: {
      signIn: 'Accedi',
      signUp: 'Registrati',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Password dimenticata?',
      continueWith: 'Oppure continua con',
      checkEmail: 'Controlla la tua email per il link di accesso!'
    },
    tickets: {
      createNew: 'Crea Nuovo Ticket',
      createNewDescription: 'Crea un nuovo ticket di riparazione per un cliente',
      viewAll: 'Visualizza Tutti i Ticket',
      viewAllDescription: 'Visualizza e gestisci tutti i ticket di riparazione',
      allTickets: 'Tutti i Ticket',
      recentTickets: 'Ticket Recenti',
      title: 'Titolo',
      description: 'Descrizione',
      customerName: 'Nome Cliente',
      customerEmail: 'Email Cliente',
      customerPhone: 'Numero di Telefono',
      deviceType: 'Tipo Dispositivo',
      price: 'Prezzo',
      password: 'Password Dispositivo',
      purchaseDate: 'Data di Acquisto',
      orderId: 'ID Ordine (opzionale)',
      orderIdPlaceholder: 'Inserisci il tuo ID ordine se disponibile',
      priority: {
        label: 'Priorità',
        low: 'Bassa',
        medium: 'Media',
        high: 'Alta',
        all: 'Tutte le Priorità'
      },
      status: {
        label: 'Stato',
        'Ticket inserito': 'Ticket inserito',
        'In assegnazione al tecnico': 'In assegnazione al tecnico',
        'In lavorazione': 'In lavorazione',
        'Parti ordinate': 'Parti ordinate',
        'Pronto per il ritiro': 'Pronto per il ritiro',
        'Chiuso': 'Chiuso',
        'Preventivo inviato': 'Preventivo inviato',
        'Preventivo accettato': 'Preventivo accettato',
        'Rifiutato': 'Rifiutato',
        'allStatuses': 'Tutti gli Stati'
      },
      actions: {
        create: 'Crea Ticket',
        edit: 'Modifica',
        save: 'Salva',
        cancel: 'Annulla',
        delete: 'Elimina',
        print: 'Stampa',
        viewDetail: 'Visualizza Dettaglio',
        createAnother: 'Crea un altro ticket'
      },
      messages: {
        createSuccess: 'Ticket creato con successo',
        createError: 'Errore durante la creazione del ticket: ',
        updateError: 'Errore durante l\'aggiornamento del ticket: ',
        deleteConfirm: 'Sei sicuro di voler eliminare questo ticket?',
        signInRequired: 'Effettua l\'accesso per creare un ticket',
        thankYou: 'Grazie!',
        ticketCreated: 'Il tuo ticket di riparazione è stato creato con successo. Il tuo numero di ticket è:',
        createAnother: 'Crea un altro ticket'
      },
      search: 'Cerca tickets...',
      sort: {
        date: 'Ordina per Data',
        priority: 'Ordina per Priorità'
      },
      contact: {
        email: 'Contatta via Email',
        whatsapp: 'Contatta via WhatsApp'
      },
      detail: {
        title: 'Ticket di Riparazione',
        createdBy: 'Creato da',
        created: 'Creato il',
        lastUpdated: 'Ultimo aggiornamento',
        status: 'Stato',
        priority: 'Priorità',
        customerInfo: 'Informazioni Cliente',
        name: 'Nome',
        email: 'Email',
        deviceInfo: 'Informazioni Dispositivo',
        deviceType: 'Tipo Dispositivo',
        price: 'Prezzo',
        password: 'Password Dispositivo',
        description: 'Descrizione',
        termsAndConditions: 'Termini e Condizioni',
        customerSignature: 'Firma Cliente',
        date: 'Data',
        signHere: 'Firma qui'
      },
      assignTo: 'Assegna a',
      assignedTo: 'Assegnato a',
      unassigned: 'Non assegnato'
    },
    common: {
      signOut: 'Esci',
      loading: 'Caricamento...',
      scanForTicketDetails: 'Scansiona per dettagli ticket',
      loggedInAs: 'Accesso come'
    },
    settings: {
      title: 'Impostazioni',
      logo: {
        title: 'Impostazioni Logo',
        url: 'URL Logo',
        urlPlaceholder: 'https://esempio.com/logo.png',
        description: 'Inserisci l\'URL del logo della tua azienda',
        preview: 'Anteprima Logo',
        saveButton: 'Salva URL Logo',
        saving: 'Salvataggio...',
        success: 'URL del logo aggiornato con successo',
        error: 'Impossibile caricare l\'URL del logo',
        loadError: 'Impossibile caricare il logo dall\'URL fornito. Controlla l\'URL e riprova.'
      },
      email: {
        title: 'Notifiche Email',
        adminEmail: 'Indirizzo Email Amministratore',
        newTicket: 'Invia email quando viene creato un nuovo ticket',
        statusChange: 'Invia email quando cambia lo stato del ticket',
        oldTickets: 'Notifica all\'amministratore i ticket vecchi',
        daysBeforeNotification: 'Giorni prima della notifica',
        saveButton: 'Salva Impostazioni',
        saving: 'Salvataggio...',
        success: 'Impostazioni email aggiornate con successo',
        error: 'Impossibile caricare le impostazioni email',
        testButton: 'Invia Email di Prova',
        testSuccess: 'Email di prova inviata con successo!',
        testError: 'Impossibile inviare l\'email di prova',
        checkOldTickets: 'Controlla Ticket Vecchi Ora',
        setupInstructions: 'Configurazione Notifiche Email',
        setupDescription: 'Per abilitare le notifiche email, devi configurare una Edge Function di Supabase:',
        setupSteps: {
          createFunction: 'Crea una nuova Edge Function nel tuo progetto Supabase chiamata',
          useService: 'Utilizza un servizio come SendGrid, Mailgun o Resend per inviare email',
          configureFunction: 'Configura la Edge Function per inviare email utilizzando il servizio preferito',
          setAdminEmail: 'Imposta l\'indirizzo email dell\'amministratore sopra per ricevere le notifiche'
        }
      },
      terms: {
        title: 'Termini e Condizioni',
        text: 'Testo Termini e Condizioni',
        description: 'Questo testo apparirà sui ticket di riparazione stampati',
        saveButton: 'Salva Termini',
        saving: 'Salvataggio...',
        success: 'Termini e condizioni aggiornati con successo',
        error: 'Impossibile caricare i termini e condizioni'
      }
    }
  },
  de: {
    auth: {
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      email: 'E-Mail',
      password: 'Passwort',
      forgotPassword: 'Passwort vergessen?',
      continueWith: 'Oder fortfahren mit',
      checkEmail: 'Überprüfen Sie Ihre E-Mail für den Anmeldelink!'
    },
    tickets: {
      createNew: 'Neues Ticket erstellen',
      createNewDescription: 'Erstellen Sie ein neues Reparaturticket für einen Kunden',
      viewAll: 'Alle Tickets anzeigen',
      viewAllDescription: 'Alle Reparaturtickets anzeigen und verwalten',
      allTickets: 'Alle Tickets',
      recentTickets: 'Aktuelle Tickets',
      title: 'Titel',
      description: 'Beschreibung',
      customerName: 'Kundenname',
      customerEmail: 'Kunden-E-Mail',
      customerPhone: 'Telefonnummer',
      deviceType: 'Gerätetyp',
      price: 'Preis',
      password: 'Geräte-Passwort',
      purchaseDate: 'Kaufdatum',
      orderId: 'Bestellnummer (optional)',
      orderIdPlaceholder: 'Geben Sie Ihre Bestellnummer ein, falls vorhanden',
      priority: {
        label: 'Priorität',
        low: 'Niedrig',
        medium: 'Mittel',
        high: 'Hoch',
        all: 'Alle Prioritäten'
      },
      status: {
        label: 'Status',
        'Ticket inserito': 'Ticket erstellt',
        'In assegnazione al tecnico': 'Techniker wird zugewiesen',
        'In lavorazione': 'In Bearbeitung',
        'Parti ordinate': 'Teile bestellt',
        'Pronto per il ritiro': 'Abholbereit',
        'Chiuso': 'Geschlossen',
        'Preventivo inviato': 'Angebot gesendet',
        'Preventivo accettato': 'Angebot akzeptiert',
        'Rifiutato': 'Abgelehnt',
        'allStatuses': 'Alle Status'
      },
      actions: {
        create: 'Ticket erstellen',
        edit: 'Bearbeiten',
        save: 'Speichern',
        cancel: 'Abbrechen',
        delete: 'Löschen',
        print: 'Drucken',
        viewDetail: 'Details anzeigen',
        createAnother: 'Weiteres Ticket erstellen'
      },
      messages: {
        createSuccess: 'Ticket erfolgreich erstellt',
        createError: 'Fehler beim Erstellen des Tickets: ',
        updateError: 'Fehler beim Aktualisieren des Tickets: ',
        deleteConfirm: 'Sind Sie sicher, dass Sie dieses Ticket löschen möchten?',
        signInRequired: 'Bitte melden Sie sich an, um ein Ticket zu erstellen',
        thankYou: 'Vielen Dank!',
        ticketCreated: 'Ihr Reparaturticket wurde erfolgreich erstellt. Ihre Ticketnummer lautet:',
        createAnother: 'Weiteres Ticket erstellen'
      },
      search: 'Tickets suchen...',
      sort: {
        date: 'Nach Datum sortieren',
        priority: 'Nach Priorität sortieren'
      },
      contact: {
        email: 'Kontakt per E-Mail',
        whatsapp: 'Kontakt per WhatsApp'
      },
      detail: {
        title: 'Reparaturticket',
        createdBy: 'Erstellt von',
        created: 'Erstellt am',
        lastUpdated: 'Zuletzt aktualisiert',
        status: 'Status',
        priority: 'Priorität',
        customerInfo: 'Kundeninformationen',
        name: 'Name',
        email: 'E-Mail',
        deviceInfo: 'Geräteinformationen',
        deviceType: 'Gerätetyp',
        price: 'Preis',
        password: 'Geräte-Passwort',
        description: 'Beschreibung',
        termsAndConditions: 'Allgemeine Geschäftsbedingungen',
        customerSignature: 'Kundenunterschrift',
        date: 'Datum',
        signHere: 'Hier unterschreiben'
      },
      assignTo: 'Zuweisen an',
      assignedTo: 'Zugewiesen an',
      unassigned: 'Nicht zugewiesen'
    },
    common: {
      signOut: 'Abmelden',
      loading: 'Wird geladen...',
      scanForTicketDetails: 'Scannen für Ticketdetails',
      loggedInAs: 'Angemeldet als'
    },
    settings: {
      title: 'Einstellungen',
      logo: {
        title: 'Logo-Einstellungen',
        url: 'Logo-URL',
        urlPlaceholder: 'https://beispiel.de/logo.png',
        description: 'Geben Sie die URL Ihres Firmenlogos ein',
        preview: 'Logo-Vorschau',
        saveButton: 'Logo-URL speichern',
        saving: 'Wird gespeichert...',
        success: 'Logo-URL erfolgreich aktualisiert',
        error: 'Fehler beim Laden der Logo-URL',
        loadError: 'Fehler beim Laden des Logos von der angegebenen URL. Bitte überprüfen Sie die URL und versuchen Sie es erneut.'
      },
      email: {
        title: 'E-Mail-Benachrichtigungen',
        adminEmail: 'Administrator-E-Mail-Adresse',
        newTicket: 'E-Mail senden, wenn ein neues Ticket erstellt wird',
        statusChange: 'E-Mail senden, wenn sich der Ticket-Status ändert',
        oldTickets: 'Administrator über alte Tickets benachrichtigen',
        daysBeforeNotification: 'Tage vor Benachrichtigung',
        saveButton: 'Einstellungen speichern',
        saving: 'Wird gespeichert...',
        success: 'E-Mail-Einstellungen erfolgreich aktualisiert',
        error: 'Fehler beim Laden der E-Mail-Einstellungen',
        testButton: 'Test-E-Mail senden',
        testSuccess: 'Test-E-Mail erfolgreich gesendet!',
        testError: 'Fehler beim Senden der Test-E-Mail',
        checkOldTickets: 'Alte Tickets jetzt prüfen',
        setupInstructions: 'E-Mail-Benachrichtigungseinrichtung',
        setupDescription: 'Um E-Mail-Benachrichtigungen zu aktivieren, müssen Sie eine Supabase Edge Function einrichten:',
        setupSteps: {
          createFunction: 'Erstellen Sie eine neue Edge Function in Ihrem Supabase-Projekt namens',
          useService: 'Verwenden Sie einen Dienst wie SendGrid, Mailgun oder Resend zum Senden von E-Mails',
          configureFunction: 'Konfigurieren Sie die Edge Function zum Senden von E-Mails mit Ihrem bevorzugten Dienst',
          setAdminEmail: 'Legen Sie oben die Administrator-E-Mail-Adresse fest, um Benachrichtigungen zu erhalten'
        }
      },
      terms: {
        title: 'Allgemeine Geschäftsbedingungen',
        text: 'Text der Allgemeinen Geschäftsbedingungen',
        description: 'Dieser Text erscheint auf gedruckten Reparaturtickets',
        saveButton: 'AGB speichern',
        saving: 'Wird gespeichert...',
        success: 'Allgemeine Geschäftsbedingungen erfolgreich aktualisiert',
        error: 'Fehler beim Laden der Allgemeinen Geschäftsbedingungen'
      }
    }
  }
};

export const translations = baseTranslations;
