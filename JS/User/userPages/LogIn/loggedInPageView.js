function updateViewLoggedInPage() {
  const homeState = model.viewState.userHomePage;

  const html = /*HTML*/ `
    <section class="info-box">
        <h3>Registrer oppmøte</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <input 
            type="text" 
            placeholder="Scan/skriv kode"
            value="${homeState.codeOfTheDayInput || ""}"
            oninput="model.viewState.userHomePage.codeOfTheDayInput = this.value"
          />
          <button 
            class="wide-button" 
            style="margin: 0; width: 100%;"
            onclick="checkCodeOfTheDay(model.viewState.userHomePage.codeOfTheDayInput); updateView();"
          >
            Sjekk kode
          </button>
        </div>
        ${homeState.errorMessage ? `<p style="font-size: 12px; text-align: center; color: ${homeState.errorMessage === "Riktig kode!" ? "green" : "red"}; margin: 8px 0 0 0;">${homeState.errorMessage}</p>` : ""}
    </section>

    <section class="info-box">
        <h3>Dine reservasjoner</h3>
        ${createReservationsHtml()}
    </section>
  `;

  return drawUserShell(html);
}

function createReservationsHtml() {
  cleanBookings();
  const currentUser = model.users.find(

    (user) => user.userId === model.app.loggedInUserId,
  );

  if (
    !currentUser ||
    !currentUser.bookings ||
    currentUser.bookings.length === 0
  ) {
    return `<p style="font-size: 12px; text-align: center; color: #666; margin: 0;">Ingen aktive reservasjoner.</p>`;
  }

  let html = "";
  for (const bookingId of currentUser.bookings) {
    const booking = model.equipmentBookings.find(
      (b) => b.bookingId === bookingId,
    );
    if (!booking) continue;

    const equipment = model.equipment.find((e) => e.id === booking.equipmentId);
    const equipmentName = equipment ? equipment.name : "Ukjent utstyr";

    const formattedDate = formatDate(booking.date);

    html += /*HTML*/ `
      <div class="reservation-row">
        <strong>${equipmentName}</strong>
        <span>Dato: ${formattedDate}</span>
        <span>Tid: ${booking.startTime} - ${booking.endTime}</span>
        <span style="color: ${booking.approved ? "green" : "orange"}; font-weight: bold; margin-top: 4px;">
          ${booking.approved ? "Godkjent" : "Venter på godkjenning"}
        </span>
      </div>
    `;
  }

  return html;
}

function checkCodeOfTheDay(inputCode) {
  const pageState = model.viewState.userHomePage;
  const today = new Date().toISOString().split("T")[0];

  if (inputCode === "") {
    pageState.errorMessage = "Skriv inn kode i feltet over";
    return;
  }

  if (inputCode === model.codeOfTheDay) {
    const currentUser = model.users.find(
      (user) => user.userId === model.app.loggedInUserId,
    );

    if (currentUser) {
      if (currentUser.lastCheckInDate === today) {
        pageState.errorMessage = "Du har allerede registrert oppmøte i dag!";
        return;
      }

      currentUser.registeredShowUps = (currentUser.registeredShowUps || 0) + 1;
      currentUser.lastCheckInDate = today;
      pageState.errorMessage = "Riktig kode! Oppmøte registrert.";
    }
  } else {
    pageState.errorMessage = "Koden matcher ikke! Har du skrevet riktig?";
  }
}
