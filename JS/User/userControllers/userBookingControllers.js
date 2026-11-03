function togglePameldingPaArrangement(arrangementId) {
  const arrangement = model.events.find(
    (element) => String(element.id) === String(arrangementId),
  );
  if (!arrangement) return;

  const pameldinger = arrangement.signups || [];
  const alleredePameldt = pameldinger.some(
    (pamelding) => pamelding.userId === model.app.loggedInUserId,
  );

  if (
    !alleredePameldt &&
    arrangement.maxParticipants &&
    pameldinger.length >= arrangement.maxParticipants
  ) {
    alert("Arrangementet er fullt.");
    return;
  }

  toggleEventSignup(arrangementId);
}
function erUtstyrTilgjengeligIDag(element) {
  if (!element.reservable) return false;

  const dagensDato = new Date();
  const dagensDatoTekst = [
    dagensDato.getFullYear(),
    String(dagensDato.getMonth() + 1).padStart(2, "0"),
    String(dagensDato.getDate()).padStart(2, "0"),
  ].join("-");

  return !model.equipmentBookings.some(
    (bestilling) =>
      bestilling.equipmentId === element.id &&
      bestilling.date === dagensDatoTekst &&
      bestilling.approved !== false,
  );
}

function unnslippUtstyrHtml(verdi) {
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

function addOneHour(timeStr) {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(".").map(Number);
  let totalMinutes = hours * 60 + minutes + 60;
  if (totalMinutes > 24 * 60) totalMinutes = 24 * 60;
  const newHours = Math.floor(totalMinutes / 60);
  const newMins = totalMinutes % 60;
  return `${String(newHours).padStart(2, "0")}.${String(newMins).padStart(2, "0")}`;
}

function createEndTimeOptions(startTime, selectedEndTime) {
  if (!startTime) return '<option value="">Velg starttid først...</option>';

  const startMins = timeToMinutes(startTime);
  const maxEndMins = startMins + 60; // Maximum 1-hour window

  let html = '<option value="">Velg sluttid...</option>';

  for (let mins = startMins + 15; mins <= maxEndMins; mins += 15) {
    if (mins > 24 * 60) break;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const timeStr = `${String(h).padStart(2, "0")}.${String(m).padStart(2, "0")}`;
    const isSelected = selectedEndTime === timeStr;
    html += `<option value="${timeStr}" ${isSelected ? "selected" : ""}>${timeStr}</option>`;
  }

  return html;
}

function confirmEquipmentBooking() {
  const state = model.viewState.bookingPage;
  const userId = model.app.loggedInUserId;

  // Final rights check guard
  if (!checkUserRights(userId)) {
    console.warn(
      "Booking aborted: User does not have rights or already has an active booking.",
    );
    return;
  }

  if (
    state.selectedEquipmentId === null ||
    state.selectedEquipmentId === undefined
  ) {
    console.warn("Booking aborted: selectedEquipmentId is missing or null.");
    return;
  }
  if (!state.selectedDate) {
    console.warn("Booking aborted: selectedDate is missing or null.");
    return;
  }
  if (!state.selectedStartTime || state.selectedStartTime === "") {
    console.warn("Booking aborted: selectedStartTime is empty or missing.");
    return;
  }
  if (!state.selectedEndTime || state.selectedEndTime === "") {
    console.warn("Booking aborted: selectedEndTime is empty or missing.");
    return;
  }

  const newBookingId =
    model.equipmentBookings.length > 0
      ? Math.max(...model.equipmentBookings.map((b) => b.bookingId)) + 1
      : 0;

  const newBooking = {
    bookingId: newBookingId,
    userId: userId,
    equipmentId: state.selectedEquipmentId,
    date: state.selectedDate,
    startTime: state.selectedStartTime,
    endTime: state.selectedEndTime,
    approved: true,
  };

  model.equipmentBookings.push(newBooking);

  // Mark the user as having an active booking
  const loggedInUser = model.users.find((u) => u.userId === userId);
  if (loggedInUser) {
    loggedInUser.activeBooking = true;
  }

  let calendarEntry = model.calender.find((c) => c.date === state.selectedDate);
  if (calendarEntry) {
    if (!calendarEntry.equipBookings) {
      calendarEntry.equipBookings = [];
    }
    calendarEntry.equipBookings.push(newBookingId);
  } else {
    model.calender.push({
      date: state.selectedDate,
      eventIds: [],
      equipBookings: [newBookingId],
    });
  }

  // Reset temporary booking state
  model.viewState.bookingPage.selectedEquipmentId = null;
  model.viewState.bookingPage.selectedDate = null;
  model.viewState.bookingPage.selectedStartTime = null;
  model.viewState.bookingPage.selectedEndTime = null;

  navigateTo("userBookingOverview");
}

function create7DayDateButtonsHtml() {
  const state = model.viewState.bookingPage;
  let html = "";

  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, "0");
    const day = String(nextDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const isSelected = state.selectedDate === dateString;

    html += /*HTML*/ `
      <button 
        class="date-button ${isSelected ? "selected" : ""}" 
        style="${isSelected ? "border-color: #0f172a; background: #f8fafc; box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.15);" : ""}"
        onclick="model.viewState.bookingPage.selectedDate = '${dateString}'; model.viewState.bookingPage.selectedStartTime = null; model.viewState.bookingPage.selectedEndTime = null; updateView();"
      >
        ${formatDate(dateString)}
        ${isSelected ? '<div style="font-size: 0.75rem; color: #10b981; font-weight: 600; margin-top: 4px;">Valgt ✓</div>' : ""}
      </button>
    `;
  }

  return html;
}

function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(".").map(Number);
  return hours * 60 + minutes;
}

function createEndTimeOptions(startTime, selectedEndTime) {
  if (!startTime) return '<option value="">Velg starttid først...</option>';

  const startMins = timeToMinutes(startTime);
  const maxEndMins = startMins + 60; // Maximum 1-hour window

  let html = '<option value="">Velg sluttid...</option>';

  for (let mins = startMins + 15; mins <= maxEndMins; mins += 15) {
    if (mins > 24 * 60) break;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const timeStr = `${String(h).padStart(2, "0")}.${String(m).padStart(2, "0")}`;
    const isSelected = selectedEndTime === timeStr;
    html += `<option value="${timeStr}" ${isSelected ? "selected" : ""}>${timeStr}</option>`;
  }

  return html;
}

function lagDinePameldingerHtml() {
  const brukerId = model.app.loggedInUserId;
  const pameldinger = model.events.filter(
    (arrangement) =>
      !arrangement.isArchived &&
      !isEventPast(arrangement) &&
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
          <span>Start: ${unnslippBookingHtml(formatDate(arrangement.startDate))}</span>
          <span>Slutt: ${unnslippBookingHtml(formatDate(arrangement.endDateDate))}</span>
          <span>Fra kl: ${unnslippBookingHtml(arrangement.startTime || "Ikke oppgitt")}</span>
          <span>Fra kl: ${unnslippBookingHtml(arrangement.endTime || "Ikke oppgitt")}</span>
        </div>
      `,
    )
    .join("");
}

function lagArrangementerHtml() {
  const arrangementer = model.events.filter(
    (arrangement) => !arrangement.isArchived && !isEventPast(arrangement),
  );

  if (arrangementer.length === 0) {
    return "<p>Ingen arrangementer er lagt ut.</p>";
  }

  return arrangementer
    .map((arrangement) => {
      const pameldteAntall = arrangement.signups
        ? arrangement.signups.length
        : 0;

      const startTid = arrangement.startTime || "Ikke oppgitt";
      const sluttTid = arrangement.endTime || "Ikke oppgitt";

      return /*HTML*/ `
        <div class="reservation-row">
          <button
            class="wide-button"
            onclick="model.app.valgtArrangementId = '${arrangement.id}'; navigateTo('eventDetailsPage')"
          >
            ${unnslippBookingHtml(arrangement.title)}
          </button>
          <span>Dato: ${unnslippBookingHtml(formatDate(arrangement.startDate))}</span>
          <span>Tid: ${unnslippBookingHtml(startTid)} - ${unnslippBookingHtml(sluttTid)}</span>
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
