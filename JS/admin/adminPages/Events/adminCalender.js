function drawAdminCalender() {
  const state = model.viewState.adminCalenderPage;
  cleanBookings();
  generateCalendarEntries();

  const content = /*HTML*/ `
        <div class="adminCard calenderCard">
            <h2>Kalender</h2>

            <div class="actionButtons">
                <button 
                    class="${state.selectedTab === "Events" ? "active" : ""}"
                    onclick="setCalenderTab('Events')"
                >Arrangementer</button>
                <button
                    class="${state.selectedTab === "Equipment" ? "active" : ""}"
                    onclick="setCalenderTab('Equipment')"
                >Utstyr</button>
            </div>

            ${state.selectedTab === "Events" ? createEventsTabHtml() : createEquipmentTabHtml()}
        </div>
    `;

  return drawAdminShell(content);
}

function createEventsTabHtml() {
  const state = model.viewState.adminCalenderPage;

  return /*HTML*/ `
        <div class="calenderColumns">
            <div class="calenderDateList">
                ${createCalenderRowsHtml()}
            </div>

            ${state.selectedEventId === null ? "" : createEventDetailHtml()}
            ${state.selectedEventId === null ? "" : createSignupListHtml()}
        </div>

    `;
}

function createCalenderRowsHtml() {
  const state = model.viewState.adminCalenderPage;
  const itemsPerPage = 5;

  // Filter out days that do not have any events
  const eventDays = model.calender.filter(
    (day) => day.eventIds && day.eventIds.length > 0,
  );

  if (eventDays.length === 0) {
    return "<p>Ingen datoer med arrangementer i kalenderen.</p>";
  }

  const totalPages = Math.ceil(eventDays.length / itemsPerPage);

  if (state.currentPage > totalPages) {
    state.currentPage = totalPages || 1;
  }
  if (!state.currentPage || state.currentPage < 1) {
    state.currentPage = 1;
  }

  const startIndex = (state.currentPage - 1) * itemsPerPage;
  const paginatedDays = eventDays.slice(startIndex, startIndex + itemsPerPage);

  let html = "";
  for (const day of paginatedDays) {
    const isSelected = state.selectedDate === day.date;

    html += /*HTML*/ `
        <div class="subSection calenderRow ${isSelected ? "selected" : ""}">
            <span class="calenderDateLabel" style="font-weight: 600; color: #0f172a; min-width: 100px;">
                ${formatDate(day.date)}
            </span>
            ${createDateEventsHtml(day)}
        </div>
    `;
  }

  if (totalPages > 1) {
    html += /*HTML*/ `
      <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 16px;">
        <button onclick="changeCalendarPage(-1)" ${state.currentPage === 1 ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : ""}>Forrige</button>
        <span>Side ${state.currentPage} av ${totalPages}</span>
        <button onclick="changeCalendarPage(1)" ${state.currentPage === totalPages ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : ""}>Neste</button>
      </div>
    `;
  }

  return html;
}

function changeCalendarPage(direction) {
  model.viewState.adminCalenderPage.currentPage += direction;
  updateView();
}

function createDateEventsHtml(day) {
  let html = "";

  for (const eventId of day.eventIds) {
    for (const event of model.events) {
      if (event.id === eventId && !event.isArchived) {
        html += /*HTML*/ `
                    <button onclick="selectEvent('${event.id}')">${event.title}</button>
                `;
      }
    }
  }

  return html;
}

function createEventDetailHtml() {
  const event = getSelectedEvent();
  if (event == null) return "";

  return /*HTML*/ `
        <div class="adminCard eventDetail">
            <h2>${event.title}</h2>
            <p>${event.description}</p>
            <p>${getRoomName(event.reservedRoom)}</p>
            <p>${formatDate(event.startDate)} ${event.startTime}-${event.endTime}</p>
            <p>Maks deltakere: ${event.maxParticipants}</p>
        </div>
    `;
}

function createSignupListHtml() {
  const event = getSelectedEvent();
  if (event == null) return "";

  let html = "";

  for (const signup of event.signups) {
    let status = "Avslått";
    if (signup.approved) {
      status = "Godkjent";
    }

    html += /*HTML*/ `
            <div class="subSection signupRow">
                <span>${getUsername(signup.userId)}</span>
                <span>${status}</span>
            </div>
        `;
  }

  if (html === "") {
    html = "<p>Ingen påmeldte.</p>";
  }

  return /*HTML*/ `
        <div class="adminCard">
            <h2>Deltagerliste</h2>
            ${html}
        </div>
    `;
}

function createEquipmentTabHtml() {
  let html = "";

  for (const booking of model.equipmentBookings) {
    html += /*HTML*/ `
            <div class="subSection signupRow">
                <span>${getEquipmentName(booking.equipmentId)}</span>
                <span>${getUsername(booking.userId)}</span>
                <span>${formatDate(booking.date)} ${booking.startTime}-${booking.endTime}</span>
            </div>
        `;
  }

  if (html === "") {
    html = "<p>Ingen utstyrsreservasjoner.</p>";
  }

  return html;
}
