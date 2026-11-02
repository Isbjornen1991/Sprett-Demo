function tegnHjemmesideBooking() {
  const innhold = /*HTML*/ `
    <section class="info-box">
      <h3>Dine Nåværende Reservasjoner</h3>
      ${createReservationsHtml()}
    </section>

    <button class="wide-button" onclick="navigateTo('equipmentBooking')">
      Book Utstyr
    </button>
    <button class="wide-button" onclick="navigateTo('userBookingOverview')">
      Dine Bookinger
    </button>

    <section class="info-box">
      <h3>Dine Nåværende Påmeldinger</h3>
      ${lagDinePameldingerHtml()}
    </section>

    <section class="info-box">
      <h3>Arrangementer</h3>
      ${lagArrangementerHtml()}
      <button class="wide-button" onclick="navigateTo('arrangementerSide')">
        Se alle arrangementer
      </button>
    </section>
  `;

  return drawUserShell(innhold);
}

