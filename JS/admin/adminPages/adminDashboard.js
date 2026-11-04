function drawAdminDashboard() {
  const dashboardContent = /*HTML*/ `
    <div id="membershipArea" class="adminCard">
      <h2>Medlemskap</h2>
      <button onclick="navigateTo('memberships')">Bruker/Medlemsoversikt</button>
      <button onclick="navigateTo('applications')">Administrer Søknader</button>
      
      <div class="subSection">
        <h3>Nye Medlemssøknader</h3>
        <div class="applicationItem">
          ${drawApplications(2)}
        </div>
        <button onclick="navigateTo('applications')">Flere</button>
      </div>

      <button onclick="navigateTo('editSubscriptions')">Endre Abonnementer</button>
    </div>

    <div id="bulletinArea" class="adminCard">
      <h2>Oppslagstavla</h2>
      <button onclick="navigateTo('editBulletins')">Lag/Endre Innlegg</button>
      <button onclick="navigateTo('manageBulletins')">Administrer Innlegg</button>
      
      ${drawDashboardLatestActivity()}
    </div>

    <div id="trainingTemplateArea" class="adminCard">
      <h2>Treningsmaler</h2>
      ${drawDashboardTemplate(2)}
      <button onclick="navigateTo('adminTrainingTemplates')">Se alle</button>
    </div>

    <div class="stackedColumn">
      <div id="bookingArea" class="adminCard">
        <h2>Bookinger/Arrangementer</h2>
        <button onclick="navigateTo('calender')">Kalender</button>
        <button onclick="navigateTo('signUps')">Påmeldinger</button>
        <button onclick="navigateTo('addEvent')">Legg til arrangement</button>
      </div>
      
      <div id="shopArea" class="adminCard">
        <h2>Nettbutikk</h2>
        <button onclick="navigateTo('addProduct')">Legg til Produkt</button>
        <button onclick="navigateTo('editProduct')">Rediger Produkt</button>
        <button onclick="navigateTo('adminOrders')">Se Bestillinger</button>
      </div>
    </div>

    <div class="stackedColumn">
      <div id="equipmentArea" class="adminCard">
        <h2>Utstyr og Sal</h2>
        <button onclick="navigateTo('addEquipment')">Legg til Utstyr</button>
        <button onclick="navigateTo('editEquipment')">Rediger Utstyr</button>
        <button onclick="navigateTo('manageRooms')">Saler</button>
      </div>

      <div id="feedbackArea" class="adminCard">
        <h2>Forslagskasse</h2>
        ${drawDashBoardFeedback(3)}
        <button onclick="navigateTo('adminFeedback')">Se alle</button>
      </div>
    </div>
  `;

  generateCodeOfTheDay();

  return drawAdminShell(dashboardContent);
}
