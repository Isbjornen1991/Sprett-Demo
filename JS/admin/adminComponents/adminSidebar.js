function drawAdminSideBar() {
  return /*HTML*/ `
    <div class="sideBar">
      <div class="sidebarLogo">Sprett Admin</div>
      <ul class="sidebarNav">
        <li class="button" onclick="navigateTo('adminDashboard')">Dashboard</li>
        <li onclick="navigateTo('memberships')">Medlemskap</li>
        <li onclick="navigateTo('applications')">Søknader</li>
        <li onclick="navigateTo('editBulletins')">Oppslagstavla</li>
        <li onclick="navigateTo('calender')">Kalender</li>
        <li onclick="navigateTo('addEvent')">Legg til Arrangement</li>
        <li onclick="navigateTo('addEquipment')">Legg til Utstyr</li>
        <li onclick="navigateTo('editEquipment')">Rediger Utstyr</li>
        <li onclick="navigateTo('manageRooms')">Saler</li>
        <li onclick="navigateTo('addProduct')">Legg til Produkt</li>
        <li onclick="navigateTo('editProduct')">Rediger Produkter</li>
        <li onclick="navigateTo('adminTrainingTemplates')">Treningsmaler</li>
      </ul>
      <div class="codeoftheday adminCard">
        <h3>Dagens Kode</h3>
        <h2>${model.codeOfTheDay}</h2>
      </div>
    </div>
  `;
}
