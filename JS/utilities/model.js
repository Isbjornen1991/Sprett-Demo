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
      selectedBulletinId: null, //
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
  ],

  equipmentCategories: [
    {
      id: 0,
      name: "Vekter",
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
      title: "Example Info",
      type: "info",
      description:
        "This is dummy text for testing purposes.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      bulletinId: 0,
      isPublished: true,
      isArchived: false,
      comments: [
        {
          commentId: 0,
          userId: 1,
          text: "This is an example comment.",
        },
        {
          commentId: 1,
          userId: 2,
          text: "This is another comment! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
      ],
    },
    {
      title: "Example Info",
      type: "info",
      description:
        "This is dummy text for testing purposes.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      bulletinId: 1,
      isPublished: true,
      isArchived: false,
      comments: [
        {
          commentId: 0,
          userId: 1,
          text: "This is an example comment.",
        },
        {
          commentId: 1,
          userId: 2,
          text: "This is another comment! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
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
      title: "Example Event Title",
      description: "Example Event Text",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      reservedRoom: [0],
      signups: [{ userId: 1, approved: true }],
      isArchived: false,
      maxParticipants: null,
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
      productDescription: "Manglende Beskrivelse",
      productQuantity: 20,
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
