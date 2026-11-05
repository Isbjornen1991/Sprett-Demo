function drawAdminMemberships() {
  const state = model.viewState.adminMemberPage;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(model.users.length / itemsPerPage) || 1;

  if (state.currentPage > totalPages) {
    state.currentPage = totalPages;
  }
  if (!state.currentPage || state.currentPage < 1) {
    state.currentPage = 1;
  }

  const adminMembershipsContent = /*HTML*/ `
<div class="adminCard" style="width:100%;">
    <h2>Medlemsoversikt</h2>

    <div class="memberHeaderBar" style="display: flex; gap: 10px; font-weight: bold; padding: 10px; background: #f1f1f1; border-radius: 4px;">
        <div style="flex: 1.5;">Navn</div>
        <div style="flex: 1.2;">Medlemskapstype</div>
        <div style="flex: 1;">Betaling</div>
        <div style="flex: 1;">Aktive Bookinger</div>
        <div style="flex: 1;">Kan Booke</div>
        <div style="flex: 0.6; text-align: center;">Prikker</div>
        <div style="flex: 0.6; text-align: center;">Registrerte Oppmøter</div>
        <div style="flex: 1;">Status</div>
        <div style="flex: 1.2; text-align: right;">Handling</div>
    </div>

    <div class="memberListContainer">
        ${generateMembersOverview()}
    </div>

    ${
      totalPages > 1
        ? /*HTML*/ `
        <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 16px;">
            <button onclick="changeMemberPage(-1)" ${state.currentPage === 1 ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : ""}>Forrige</button>
            <span>Side ${state.currentPage} av ${totalPages}</span>
            <button onclick="changeMemberPage(1)" ${state.currentPage === totalPages ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : ""}>Neste</button>
        </div>
      `
        : ""
    }
</div>
  `;

  return drawAdminShell(adminMembershipsContent);
}

function generateMembersOverview() {
  const state = model.viewState.adminMemberPage;
  const itemsPerPage = 8;
  let html = "";

  if (model.users.length === 0) {
    return "<p>No members found.</p>";
  }

  const startIndex = (state.currentPage - 1) * itemsPerPage;
  const paginatedUsers = model.users.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  for (let i = 0; i < paginatedUsers.length; i++) {
    const user = paginatedUsers[i];

    const membershipName = getMembershipName(user.membershipType);
    const paymentText = user.paymentStatus ? "Betalt" : "Utestående";
    const bookingText = user.activeBooking ? "Ja" : "Nei";

    let statusText = user.approved ? "Godkjent" : "Avventer";
    let statusColor = user.approved ? "#006600" : "#666666";

    if (user.approved) {
      if (user.membershipStatus === "paused") {
        statusText = "Pauset";
        statusColor = "#b8860b";
      } else if (user.membershipStatus === "pending_cancellation") {
        statusText = "Oppsigelse";
        statusColor = "#cc0000";
      }
    }

    const actionButtonsHTML = drawMemberActionButtons(user);

    const bookingToggleHTML = /*HTML*/ `
      <label class="switch">
        <input type="checkbox" ${user.isBookingAllowed ? "checked" : ""} onchange="toggleBookingRights(${user.userId})">
        <span class="slider"></span>
      </label>
    `;

    html += /*HTML*/ `
      <div class="memberRow" style="display: flex; gap: 10px; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
        <div style="flex: 1.5;"><strong>${user.username}</strong></div>
        <div style="flex: 1.2;">${membershipName}</div>
        <div style="flex: 1;">${paymentText}</div>
        <div style="flex: 1;">${bookingText}</div>
        <div style="flex: 1; align-items: center;">${bookingToggleHTML}</div>
        <div style="flex: 0.6; text-align: center;">${user.penalties}</div>
        <div style="flex: 0.6; text-align: center;">${user.registeredShowUps}</div>
        <div style="flex: 1; color: ${statusColor}; font-weight: bold;">${statusText}</div>
        <div style="flex: 1.2; text-align: right; display: flex; gap: 5px; justify-content: flex-end;"> 
          ${actionButtonsHTML}
        </div>
      </div>
    `;
  }
  return html;
}

function changeMemberPage(direction) {
  model.viewState.adminMemberPage.currentPage += direction;
  updateView();
}

function drawMemberActionButtons(user) {
  if (!user.approved) {
    return /*HTML*/ `
      <button onclick="approveMembership(${user.userId})">Godkjenn Søknad</button>
      <button onclick="denyMembership(${user.userId})">Avvis Søknad</button>
    `;
  } else {
    return /*HTML*/ `
      <button onclick="denyMembership(${user.userId})">Fjern medlemskap</button>
    `;
  }
}
