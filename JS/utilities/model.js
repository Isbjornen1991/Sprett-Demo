const model = {
  app: {
    currentPage: "startPage",
    loggedInUserId: null,
  },

  viewState: {
    activeTab: "home", //booking, oppslag, profil, butikk, om oss,

    loginPage: {
      loginForm: {
        username: "",
        password: "",
        errorMessage: "",
      },

      recoverPasswordForm: {
        username: "",
      },

      newUserForm: {
        name: "",
        phone: "",
        mail: "",
        password: "",
        repeatPassword: "",
        address: "",
        postcode: "",
        paymentMethod: null,
      },
    },

    adminAddProductsPage: {
      productName: "",
      productProducer: "",
      productPrice: null,
      productDescription: "",
      productQuantity: null,
      hasDiscount: false,
    },

    adminEditProductsPage: {
      editingProductId: null,
      productName: "",
      productProducer: "",
      productPrice: null,
      productDescription: "",
      productQuantity: null,
      hasDiscount: false,
    },

    userWebStorePage: {
      selectedProductId: null,
      selectedQuantity: 1,
    },

    shoppingCart: [],

    userHomePage: {
      codeOfTheDayInput: "",
      errorMessage: "",
    },

    bookingPage: {
      selectedEquipmentId: null,
      selectedDate: null, // "YYYY-MM-DD"
      selectedStartTime: null, // e.g. "13.00"
      selectedEndTime: null, // e.g. "13.30"
      registerBookingForm: {
        input: null,
      },
      searchForm: {
        input: "",
      },

      setFilter: {
        filter: null,
      },

      bookingDate: {
        input: null,
      },
    },

    profilePage: {
      phone: "",
      mail: "",
      password: "",
      repeatPassword: "",
      address: "",
      postcode: "",
      paymentMethod: null,
    },

    bulletinPage: {
      inputComment: "",
      selectedBulletinId: null,
      selectedEventId: null,
    },

    adminMemberPage: {
      sortingMethod: null,
    },

    adminChangeMembershipsPage: {
      editingId: null,
      name: "",
      price: "",
      booking: false,
      familyAccess: false,
    },

    adminCreatePostPage: {
      title: "",
      type: null,
      startTime: null,
      endTime: null,
      startDate: null,
      endDate: null,
      link: "",
      inputText: "",
    },

    adminEditPostPage: {
      selectedPostID: null,
      selectedCommentID: null,
    },

    adminCalenderPage: {
      selectedTab: "Events", //Equipment
      selectedDate: null,
      selectedEventId: null,
    },

    adminSignUpsPage: {
      selectedEventId: null,
    },

    adminCreateEventPage: {
      title: "",
      description: "",
      type: null,
      maxParticipants: 30,
      startTime: null,
      endTime: null,
      startDate: null,
      endDate: null,
      reservedRoom: null,
      eventID: null,
    },

    adminCreateEquipmentPage: {
      equipmentName: "",
      equipmentId: null,
      reservable: false,
      category: null,
      addCategory: "",
    },

    adminEditEquipmentPage: {
      equipmentName: "",
      equipmentId: null,
      reservable: false,
      category: null,
    },

    adminRoomCreationPage: {
      newRoomName: "",
      editedRoomName: "",
      editingRoomId: null,
    },

    userFeedbackPage: {
      feedbackText: "",
      message: "",
    },

    userTrainingProgramPage: {
      programName: "",
      exercises: [],
      selectedProgramId: null,
      message: "",
    },

    adminTrainingTemplatePage: {
      templateName: "",
      exercises: [],
      newExerciseName: "",
      editingTemplateId: null,
    },
  },

  //------------------------------------------------------------------------
  //                             DATA
  //------------------------------------------------------------------------

  //------------------------------------------------------------------------
  //                        Equipment & Rooms
  //------------------------------------------------------------------------
  rooms: [
    {
      name: "Sal 1",
      id: 0,
    },
    {
      name: "Sal 2",
      id: 1,
    },
    {
      name: "Sal 3",
      id: 2,
    },
  ],

  equipmentCategories: [
    {
      id: 0,
      name: "Frie vekter",
    },
    {
      id: 1,
      name: "Styrke og stativer",
    },
    {
      id: 2,
      name: "Kardio",
    },
    {
      id: 3,
      name: "Matte og bevegelighet",
    },
    {
      id: 4,
      name: "Kampsport og funksjonell",
    },
  ],

  equipment: [
    {
      name: "Manualer 10 kg",
      id: 0,
      category: [0],
      reservable: true,
    },
    {
      name: "Manualer 15 kg",
      id: 1,
      category: [0],
      reservable: false,
    },
    {
      name: "Olympisk Vektstang 20 kg",
      id: 2,
      category: [0],
      reservable: true,
    },
    {
      name: "Kettlebell 16 kg",
      id: 3,
      category: [0],
      reservable: true,
    },
    {
      name: "Justerbar Treningsbenk",
      id: 4,
      category: [1],
      reservable: true,
    },
    {
      name: "Knebøyrack / Power Cage",
      id: 5,
      category: [1],
      reservable: true,
    },
    {
      name: "Romaskin (Concept2)",
      id: 6,
      category: [2],
      reservable: true,
    },
  ],

  //------------------------------------------------------------------------
  //                            Memberships
  //------------------------------------------------------------------------
  memberships: [
    {
      name: "Styrke",
      id: 0,
      price: 299,
      bookingAllowed: false,
    },
    {
      name: "Sal",
      id: 1,
      price: 399,
      bookingAllowed: true,
    },
    {
      name: "Familie",
      id: 2,
      price: 1200,
      bookingAllowed: true,
    },
  ],

  //------------------------------------------------------------------------
  //                           Users
  //------------------------------------------------------------------------

  users: [
    {
      userId: 0,
      role: "admin",
      username: "Admin",
      password: "Admin123",
      membershipType: null,
      membershipStatus: "standard",
      approved: true,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      isBookingAllowed: true,
      bookings: [],
      signUps: [],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 15A",
      postCode: "0000",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
      lastCheckInDate: null,
    },
    {
      userId: 1,
      role: "customer",
      username: "Kunde Kundesen",
      password: "Kunde123",
      membershipType: 1,
      membershipStatus: "standard",
      approved: true,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      isBookingAllowed: true,
      bookings: [0],
      signUps: [0],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 15A",
      postCode: "0001",
      phone: 12345678,
      email: "post@epost.no",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
      lastCheckInDate: null,
    },
    {
      userId: 2,
      role: "customer",
      username: "Kundine Kundesen",
      password: "Kunde123",
      membershipType: 0,
      membershipStatus: "standard",
      approved: false,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      isBookingAllowed: false,
      bookings: [0],
      signUps: [0],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 16A",
      postCode: "0002",
      phone: 23456789,
      email: "post@epost.no",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
      lastCheckInDate: null,
    },
    {
      userId: 3,
      role: "customer",
      username: "Kundine Kundesen",
      password: "Kunde123",
      membershipType: 0,
      membershipStatus: "standard",
      approved: false,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      isBookingAllowed: false,
      bookings: [0],
      signUps: [0],
      penalties: 0,
      registeredShowUps: 0,
      address: "Ingensteds 17A",
      postCode: "0003",
      phone: 34567891,
      email: "post@epost.no",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
      lastCheckInDate: null,
    },
    {
      userId: 4,
      role: "customer",
      username: "Kundaniel Kundeseth",
      password: "Kunde123",
      membershipType: 1,
      membershipStatus: "pending_cancellation",
      approved: true,
      paymentDate: "2026-10-15",
      paymentMethod: "kort",
      paymentStatus: true,
      activeBooking: false,
      isBookingAllowed: false,
      bookings: [],
      signUps: [],
      penalties: 3,
      registeredShowUps: 25,
      address: "Ingensteds 18B",
      postCode: "0004",
      phone: 12345678,
      email: "post@epost.no",
      membershipApplicationDate: "2026-10-15",
      membershipStartUpDate: "2026-10-15",
      lastCheckInDate: null,
    },
  ],

  //------------------------------------------------------------------------
  //                          Bulletin Board
  //------------------------------------------------------------------------

  bulletins: [
    {
      title: "Nytt utstyr på plass i styrkeavdelingen!",
      type: "info",
      description:
        "Vi har nå fått inn et splitter nytt sett med olympiske vektstenger og nye gummierte vektskiver fra Eleiko. Vi minner om å rydde vekk vektene etter deg når du er ferdig med økta slik at det er ryddig og klart for neste mann.",
      startDate: "2026-11-01",
      endDate: "2026-11-15",
      startTime: "",
      endTime: "",
      bulletinId: 0,
      isPublished: true,
      isArchived: false,
      comments: [
        {
          commentId: 0,
          userId: 1,
          text: "Fantastisk! De nye stengene har et utrolig bra grep.",
        },
        {
          commentId: 1,
          userId: 2,
          text: "Helt enig. Veldig kjekt med nytt utstyr på plass.",
        },
      ],
    },
    {
      title: "Endrede åpningstider i helgen",
      type: "info",
      description:
        "På grunn av vedlikehold og gulvvask i storsalen vil treningssenteret ha reduserte åpningstider kommende lørdag og søndag. Senteret åpner kl. 10:00 og stenger kl. 18:00 begge dager. Nøkkelkorttilgang fungerer som normalt i tidsrommet.",
      startDate: "2026-11-05",
      endDate: "2026-11-08",
      startTime: "10:00",
      endTime: "18:00",
      bulletinId: 1,
      isPublished: true,
      isArchived: false,
      comments: [
        {
          commentId: 0,
          userId: 3,
          text: "Takk for info! Fint å vite før jeg planlegger morgendagen.",
        },
        {
          commentId: 1,
          userId: 1,
          text: "Gjelder dette også morgenyogaen på søndag?",
        },
      ],
    },
  ],

  trainingTemplates: [
    {
      templateId: 0,
      name: "Helkropp nybegynner",
      exercises: ["Knebøy", "Benkpress", "Markløft", "Roing", "Planke"],
    },
    {
      templateId: 1,
      name: "Overkropp",
      exercises: [
        "Benkpress",
        "Skråbenk",
        "Nedtrekk",
        "Skulderpress",
        "Bicepscurl",
      ],
    },
    {
      templateId: 2,
      name: "Underkropp",
      exercises: ["Knebøy", "Utfall", "Beinpress", "Leggcurl", "Tåhev"],
    },
  ],

  trainingPrograms: [],

  //------------------------------------------------------------------------
  //                        Events & Calender
  //------------------------------------------------------------------------
  calender: [
    {
      date: "2026-10-15",
      eventIds: [0],
      equipBookings: [0],
    },
  ],

  equipmentBookings: [
    {
      bookingId: 0,
      userId: 1,
      equipmentId: 0,
      date: "2026-12-15",
      startTime: "13.00",
      endTime: "13.30",
      approved: true,
    },
  ],

  events: [
    {
      id: 0,
      title: "Intensiv Sirkeltrening & Core",
      description:
        "En variert og utfordrende økt med fokus på utholdenhet, styrke og kjernemuskulatur. Passer for alle nivåer, da øvelsene enkelt kan skreddersys til eget tempo.",
      startDate: "2026-11-10",
      endDate: "2026-11-10",
      startTime: "18:00",
      endTime: "19:00",
      reservedRoom: [0],
      signups: [
        { userId: 1, approved: true },
        { userId: 2, approved: false },
      ],
      isArchived: false,
      maxParticipants: 15,
    },
    {
      id: 1,
      title: "Kveldsyoga & Restitusjon",
      description:
        "Rolig yogatime med fokus på dyptgående tøyning, bevegelighet og pusteteknikk. Perfekt for å løse opp i spenninger og restituere etter en tung uke.",
      startDate: "2026-03-03",
      endDate: "2026-03-03",
      startTime: "19:30",
      endTime: "20:30",
      reservedRoom: [1],
      signups: [{ userId: 1, approved: true }],
      isArchived: false,
      maxParticipants: 12,
    },
    {
      id: 2,
      title: "Workshop: Lær Riktig Løfteteknikk",
      description:
        "En praktisk gjennomgang av teknikk i benkpress, knebøy og markløft. Vi går gjennom skadeforebygging, stangbane og optimal oppvarming.",
      startDate: "2026-11-15",
      endDate: "2026-11-15",
      startTime: "12:00",
      endTime: "14:00",
      reservedRoom: [0],
      signups: [],
      isArchived: false,
      maxParticipants: 8,
    },
  ],

  feedback: [],

  eventTypes: [
    {
      id: 0,
      name: "Økt",
    },
    {
      id: 1,
      name: "Arrangement",
    },
  ],
  //------------------------------------------------------------------------
  //                        Opening Hours
  //------------------------------------------------------------------------

  openingHours: {
    reception: { open: "09.00", close: "16.00" },
    gymAccess: { open: "06.00", close: "24.00" },
  },

  codeOfTheDay: "",

  //------------------------------------------------------------------------
  //                             Webstore
  //------------------------------------------------------------------------

  webStoreProducts: [
    {
      productId: 0,
      productName: "Proteinbar",
      productProducer: "Arla",
      productPrice: 19.9,
      productDescription: "Proteinbar fra Arla",
      productQuantity: 20,
      hasDiscount: false,
    },
    {
      productId: 1,
      productName: "Whey Protein 1kg",
      productProducer: "Star Nutrition",
      productPrice: 349.0,
      productDescription:
        "Høykvalitets myseproteinpulver for rask muskelrestitusjon etter trening.",
      productQuantity: 15,
      hasDiscount: true,
    },
    {
      productId: 2,
      productName: "BCAA Energy Drink",
      productProducer: "NOCCO",
      productPrice: 32.5,
      productDescription:
        "Forfriskende BCAAmiks med koffein for ekstra energi og fokus.",
      productQuantity: 48,
      hasDiscount: false,
    },
    {
      productId: 3,
      productName: "Shaker Cup 600ml",
      productProducer: "BlenderBottle",
      productPrice: 89.0,
      productDescription: "Lekkasjefri shaker med blandekule i rustfritt stål.",
      productQuantity: 30,
      hasDiscount: false,
    },
    {
      productId: 4,
      productName: "Kreatin Monohydrat 500g",
      productProducer: "Optimum Nutrition",
      productPrice: 249.0,
      productDescription:
        "Ren mikronisert kreatin for økt styrke og eksplosivitet.",
      productQuantity: 12,
      hasDiscount: true,
    },
    {
      productId: 5,
      productName: "Løftestropper i Skinn",
      productProducer: "GripPower",
      productPrice: 159.0,
      productDescription:
        "Slitesterke stropper for tyngre markløft og roøvelser.",
      productQuantity: 8,
      hasDiscount: false,
    },
    {
      productId: 6,
      productName: "Treningshåndkle Mikrofiber",
      productProducer: "Casall",
      productPrice: 129.0,
      productDescription:
        "Hurtigtørkende og kompakt håndkle som tar minimal plass i baggen.",
      productQuantity: 25,
      hasDiscount: false,
    },
    {
      productId: 7,
      productName: "Magnesiumkalk (Liquid Chalk)",
      productProducer: "Penta",
      productPrice: 99.0,
      productDescription:
        "Flytende kalk som gir optimalt grep uten å støvende ned hele salen.",
      productQuantity: 18,
      hasDiscount: false,
    },
    {
      productId: 8,
      productName: "Elektrolytt-tabletter",
      productProducer: "High5",
      productPrice: 79.0,
      productDescription:
        "Brusetabletter med essensielle mineraler for væskebalanse under økta.",
      productQuantity: 35,
      hasDiscount: true,
    },
    {
      productId: 9,
      productName: "Motstandsstrikk (Heavy)",
      productProducer: "Abilica",
      productPrice: 199.0,
      productDescription:
        "Kraftig gummistrikk for oppvarming, mobilitet og styrketrening.",
      productQuantity: 10,
      hasDiscount: false,
    },
  ],

  orders: [
    {
      orderId: 0,
      userId: 1,
      items: [{ productId: 0, quantity: 2 }],
      totalPrice: 39.8,
      status: "Avventer henting",
      date: "2026-10-29",
    },
  ],
};
