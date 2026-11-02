function drawBookingDateScreen() {
  const state = model.viewState.bookingPage;
  const selectedEquipment = model.equipment.find(
    (e) => e.id === state.selectedEquipmentId,
  );
  const equipmentName = selectedEquipment ? selectedEquipment.name : "Utstyr";

  let errorMessage = "";
  let isValid = false;

  if (state.selectedDate && state.selectedStartTime && state.selectedEndTime) {
    const startMins = timeToMinutes(state.selectedStartTime);
    const endMins = timeToMinutes(state.selectedEndTime);
    const duration = endMins - startMins;

    const today = new Date();
    const todayStr = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    const isToday = state.selectedDate === todayStr;
    const currentMins = today.getHours() * 60 + today.getMinutes();

    if (isToday && startMins < currentMins + 60) {
      errorMessage = "Starttiden må være minst 1 time frem i tid.";
    } else if (duration <= 0) {
      errorMessage = "Sluttiden må være etter starttiden.";
    } else if (duration > 60) {
      errorMessage = "Du kan maksimalt booke utstyr i 1 time om gangen.";
    } else {
      isValid = true;
    }
  }

  const html = /*HTML*/ `
    <section class="info-box">
      <h3>Velg dato for booking</h3>
      <p style="margin-bottom: 16px; color: #64748b; text-align: center; font-size: 0.9rem;">
        Valgt utstyr: <strong>${unnslippBookingHtml(equipmentName)}</strong>
      </p>

      <div class="date-grid">
        ${create7DayDateButtonsHtml()}
      </div>

      ${
        state.selectedDate
          ? /*HTML*/ `
              <div style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
                <h4 style="margin: 0; font-size: 0.9rem; color: #475569; text-align: center;">
                  Velg tidsrom for ${formatDate(state.selectedDate)}
                </h4>
                
                <label style="display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem; font-weight: 600; color: #475569;">
                  Starttid
                  <select 
                    onchange="model.viewState.bookingPage.selectedStartTime = this.value; model.viewState.bookingPage.selectedEndTime = addOneHour(this.value); updateView()"
                    style="width: 100%; box-sizing: border-box; font-family: inherit; font-size: 0.95rem; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; background: #ffffff;"
                  >
                    ${createHourOptions(state.selectedStartTime)}
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 6px; font-size: 0.9rem; font-weight: 600; color: #475569;">
                  Sluttid
                  <select 
                    onchange="model.viewState.bookingPage.selectedEndTime = this.value; updateView()"
                    style="width: 100%; box-sizing: border-box; font-family: inherit; font-size: 0.95rem; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; background: #ffffff;"
                  >
                    ${createEndTimeOptions(state.selectedStartTime, state.selectedEndTime)}
                  </select>
                </label>

                ${
                  errorMessage
                    ? /*HTML*/ `<p style="color: #ef4444; font-size: 0.85rem; margin: 4px 0 0 0; text-align: center;">${errorMessage}</p>`
                    : ""
                }
              </div>
            `
          : ""
      }

      <div style="display: flex; gap: 8px; margin-top: 20px;">
        <button class="wide-button" style="flex: 1; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;" onclick="navigateTo('equipmentBooking')">
          Tilbake
        </button>
        <button 
          class="wide-button" 
          style="flex: 1; ${!isValid ? "opacity: 0.5; cursor: not-allowed;" : ""}" 
          ${!isValid ? "disabled" : ""}
          onclick="confirmEquipmentBooking()"
        >
          Gå videre
        </button>
      </div>
    </section>
  `;

  return drawUserShell(html);
}

