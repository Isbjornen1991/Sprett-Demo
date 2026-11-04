function drawAdminSubHeader() {
  return /*HTML*/ `
    <div class="adminSubHeader">
      <h1>Sprett - Admin Dashboard</h1>
      ${drawBackToDashboardButton()}
    </div>
  `;
}

function drawBackToDashboardButton() {
  if (model.app.currentPage !== "adminDashboard") {
    return /*HTML*/ `
      <button class="backToDashboardBtn" onclick="navigateTo('adminDashboard')">
        Tilbake til Dashboard
      </button>
    `;
  }
  return "";
}
