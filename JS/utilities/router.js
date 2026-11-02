function updateView() {
  const app = document.getElementById("app");

  const publicPages = [
    "startPage",
    "LoginScreen",
    "newUserRegistration",
    "userRecoverPassword",
  ];

  if (
    model.app.loggedInUserId === null &&
    !publicPages.includes(model.app.currentPage)
  ) {
    app.innerHTML = updateViewNotLoggedInPage();
    return;
  }

  let html = "";

  switch (model.app.currentPage) {
    //------------------------------------------------------------------------
    //                             SHARED AREA
    //------------------------------------------------------------------------

    case "startPage":
      html = updateViewNotLoggedInPage();
      break;
    case "LoginScreen":
      html = drawLoginScreen();
      break;
    case "userRecoverPassword":
      html = drawRecoverPasswordScreen();
      break;
    case "newUserRegistration":
      html = drawNewUserRegistration();
      break;

    //------------------------------------------------------------------------
    //                             ADMIN AREA
    //------------------------------------------------------------------------

    case "adminDashboard":
      html = drawAdminDashboard();
      break;

    //Admin Members

    case "memberships":
      html = drawAdminMemberships();
      break;
    case "applications":
      html = drawManageApplication();
      break;
    case "editSubscriptions":
      html = drawAdminEditSubscriptions();
      break;

    //Admin Bulletins

    case "editBulletins":
      html = drawAdminEditBulletins();
      break;
    case "manageBulletins":
      html = drawAdminManageBulletins();
      break;

    //Admin Events

    case "calender":
      html = drawAdminCalender();
      break;
    case "signUps":
      html = drawAdminSignUps();
      break;
    case "addEvent":
      html = drawAdminAddEvents();
      break;

    //Admin Shop

    case "addProduct":
      html = drawAdminAddProducts();
      break;
    case "editProduct":
      html = drawAdminEditProducts();
      break;
    case "adminOrders":
      html = drawAdminOrderFulfillment();
      break;

    //Admin Equipment

    case "addEquipment":
      html = drawAdminAddEquipment();
      break;
    case "editEquipment":
      html = drawAdminEditEquipment();
      break;
    case "manageRooms":
      html = drawAdminManageRooms();
      break;

    //Admin Feedback

    case "adminFeedback":
      html = drawAdminFeedback();
      break;

    //------------------------------------------------------------------------
    //                             USER AREA
    //------------------------------------------------------------------------
    //Home Page Users
    case "loggedInPage":
      html = updateViewLoggedInPage();
      break;

    //Booking Pages

    case "bookingHomePage":
      html = tegnHjemmesideBooking();
      break;
    case "equipmentBooking":
      html = tegnBookeUtstyrSide();
      break;
    case "bookingOverview":
      html = drawBookingOverviewScreen();
      break;
    case "eventDetailsPage":
      html = tegnArrangementDetaljerSide();
      break;
    case "arrangementerSide":
      html = tegnArrangementerSide();
      break;
    case "userChooseBookingDate":
      html = drawBookingDateScreen();
      break;
    case "userBookingOverview":
      html = drawBookingOverviewScreen();
      break;

    //Bulletin Area

    case "userBulletinBoard":
      html = drawUserBulletinBoard();
      break;

    //Profile Area

    case "userProfileHome":
      html = drawUserProfileHomePage();
      break;
    case "userEditProfile":
      html = drawUserChangePersonaliaPage();
      break;
    case "userEditSubscription":
      html = drawUserEditSub();
      break;
    case "userChangeMembershipType":
      html = drawUserSelectSub();
      break;

    //Webstore

    case "userWebstore":
      html = drawUserWebstore();
      break;

    //User Feedback

    case "userFeedback":
      html = drawUserFeedbackPage();
      break;

    case "userTrainingProgram":
      html = drawUserTrainingProgramPage();
      break;

    case "adminTrainingTemplates":
      html = drawAdminTrainingTemplates();
      break;

    // Page Missing
    default:
      html = `<p>404 - Page not found</p>`;
  }

  app.innerHTML = html;
}
