function drawUserShell(contentHtml) {
  return /*HTML*/ `
<div class="userLayout">
    ${createLoggedInHeaderHtml()}
    ${createUserNavHtml()}

    <div class="userContentArea">
        ${contentHtml}
    </div>

    ${createFooterHtml()}
</div>
`;
}

function createUserNavHtml() {
  const tabs = [
    //Legg til sidene her også for å få riktig tav navigation til å vises
    { pages: ["loggedInPage"], text: "Hjem" },
    { pages: ["bookingPage"], text: "Booking" },
    { pages: ["userBulletinBoard"], text: "Oppslag" },
    { pages: ["userWebstore"], text: "Nettbutikk" },
    {
      pages: ["userProfileHome", "userEditProfile", "userEditSubscription", "userTrainingProgram"],
      text: "Profil",
    },
  ];

  let html = "";

  for (const tab of tabs) {
    let selectedClass = "";
    if (tab.pages.includes(model.app.currentPage)) {
      selectedClass = "selected";
    }

    html += /*HTML*/ `
            <button class="${selectedClass}" onclick="navigateTo('${tab.pages[0]}')">
                ${tab.text}
            </button>
        `;
  }

  return /*HTML*/ `<nav class="user-nav">${html}</nav>`;
}

function drawNotLoggedInShell(contentHtml) {
  return /*HTML*/ `
    <div class="userLayout">
      <!-- Public Header -->
      <div class="front-header">
        <h1>Sprett</h1>
        <p>Treningssenter</p>
      </div>

      <!-- Main Content Area -->
      <div class="userContentArea">
        ${contentHtml}
      </div>

      <!-- Public Footer -->
      <div class="front-footer">
        <h3>Åpningstider</h3>
        <p>Resepsjon: ${model.openingHours.reception.open} - ${model.openingHours.reception.close}</p>
        <p>Gym: ${model.openingHours.gymAccess.open} - ${model.openingHours.gymAccess.close}</p>
      </div>
    </div>
  `;
}