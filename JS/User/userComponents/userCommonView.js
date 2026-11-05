function createNotLoggedInHeaderHtml() {
  return /*HTML*/ `
    <header class="front-header">
        <div class="logo-circle"></div>
        <h1>Sprett</h1>
        <p>Velkommen, Kunde!</p>
        <p onclick="navigateTo('newUserRegistration')" class="link-text">Bli medlem!</p>
    </header>
   
    `;
}

function createLoggedInHeaderHtml() {
  let username = "";
  let membershipName = "";

  for (const user of model.users) {
    if (user.userId === model.app.loggedInUserId) {
      username = user.username;

      for (const membership of model.memberships) {
        if (membership.id === user.membershipType) {
          membershipName = membership.name + "-medlem";
        }
      }
    }
  }

  return /*HTML*/ `
    <header class="front-header" style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
      <div class="logo-circle"></div>
      <h1>Sprett</h1>
      <div class="profile-picture" style="margin: 4px auto;">${username.charAt(0).toUpperCase()}</div>
      <p style="font-weight: 600; color: #0f172a;">Velkommen, ${username}!</p>
      ${membershipName ? `<p>${membershipName}</p>` : ""}
      <button class="wide-button" style="max-width: 140px; margin-top: 8px; padding: 6px 12px; font-size: 0.8rem; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;" onclick="logoutUser()">Log Ut</button>
      ${adminViewingCustomerPage()}
      </header>
  `;
}

function adminViewingCustomerPage() {
  if (model.app.loggedInUserId == 0) {
    return /*HTML*/ ` 
      <div>
        <button class="logoutBtn" onclick="navigateTo('adminDashboard')">
          Gå til Adminsidene
        </button>
      </div>
    `;
  }
  return ""; // <-- This prevents it from returning 'undefined'
}

function createFooterHtml() {
  return /*HTML*/ `
        <footer class="front-footer">
        <h3>Åpningstider</h3>
        <p>
                Resepsjon: ${model.openingHours.reception.open}
                -
                ${model.openingHours.reception.close}
            </p>
            <p>
            Treningssenter: ${model.openingHours.gymAccess.open}
                -
                ${model.openingHours.gymAccess.close}
                </p>
            ${
              model.app.loggedInUserId !== null
                ? /*HTML*/ `
              <p class="link-text" onclick="navigateTo('userFeedback')">
              Har du noen tilbakemeldinger? Trykk her.
              </p>
              `
                : ""
            }
              <h3>Adresse</h3>
              <p>Torget 3, 3256 Larvik</p>
              </footer>
    `;
}
