function tegnHjemmesideBooking() {
  const innhold = /*HTML*/ `
    <section class="info-box">
      <h3>Dine Nåværende Reservasjoner</h3>
      ${createReservationsHtml()}
    </section>

    <button class="wide-button" onclick="navigateTo('equipmentBooking')">
      Book Utstyr
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

function lagDinePameldingerHtml() {
  const brukerId = model.app.loggedInUserId;
  const pameldinger = model.events.filter(
    (arrangement) =>
      !arrangement.isArchived &&
      arrangement.signups &&
      arrangement.signups.some((pamelding) => pamelding.userId === brukerId),
  );

  if (pameldinger.length === 0) {
    return "<p>Du er ikke meldt på noen arrangementer.</p>";
  }

  return pameldinger
    .map(
      (arrangement) => /*HTML*/ `
        <div class="reservation-row">
          <strong>${unnslippBookingHtml(arrangement.title)}</strong>
          <span>Dato: ${unnslippBookingHtml(formatDate(arrangement.startDate))}</span>
          <span>Tid: ${unnslippBookingHtml(arrangement.startTime || "Ikke oppgitt")}</span>
        </div>
      `,
    )
    .join("");
}

function lagArrangementerHtml() {
  const arrangementer = model.events.filter(
    (arrangement) => !arrangement.isArchived,
  );

  if (arrangementer.length === 0) {
    return "<p>Ingen arrangementer er lagt ut.</p>";
  }

  return arrangementer
    .map((arrangement) => {
      const pameldteAntall = arrangement.signups
        ? arrangement.signups.length
        : 0;

      return /*HTML*/ `
        <div class="reservation-row">
          <button
            class="wide-button"
            onclick="model.app.valgtArrangementId = '${arrangement.id}'; navigateTo('eventDetailsPage')"
          >
            ${unnslippBookingHtml(arrangement.title)}
          </button>
          <span>Dato: ${unnslippBookingHtml(formatDate(arrangement.startDate))}</span>
          <span>Tid: ${unnslippBookingHtml(arrangement.startTime || "Ikke oppgitt")} - ${unnslippBookingHtml(arrangement.endTime || "Ikke oppgitt")}</span>
          ${
            arrangement.description
              ? `<span>${unnslippBookingHtml(arrangement.description)}</span>`
              : ""
          }
          <span>Påmeldte: ${pameldteAntall} / ${arrangement.maxParticipants || "Ubegrenset"}</span>
          <button class="wide-button" onclick="model.app.valgtArrangementId = '${arrangement.id}'; navigateTo('eventDetailsPage')">
            Detaljer om arrangementet
          </button>
        </div>
      `;
    })
    .join("");
}

function unnslippBookingHtml(verdi) {
  return String(verdi ?? "").replace(/[&<>"']/g, (tegn) => {
    const htmlEntiteter = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return htmlEntiteter[tegn];
  });
}
