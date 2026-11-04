function approveMembership(applicant) {
  const user = model.users.find((u) => u.userId === applicant);

  if (user) {
    user.approved = true;

    const userMembership = model.memberships.find(
      (m) => m.id === user.membershipType,
    );

    if (user.approved && userMembership && userMembership.bookingAllowed) {
      user.isBookingAllowed = true;
    } else {
      user.isBookingAllowed = false;
    }

    updateView();
  }
}

function denyMembership(applicant) {
  const index = model.users.findIndex((u) => u.userId === applicant);

  if (index !== -1) {
    model.users.splice(index, 1);
    console.log("Application Denied!");
  }
  updateView();
}

function getMembershipName(membershipId) {
  const membership = model.memberships.find((m) => m.id === membershipId);
  return membership ? membership.name : "Manglende medlemskapstype";
}

function revokeMembership(membershipId) {}

function drawApplications(maxDisplay) {
  let awaitingApproval = [];

  for (let i = 0; i < model.users.length; i++) {
    const currentUser = model.users[i];

    if (currentUser.approved === false) {
      awaitingApproval.push(currentUser);

      if (awaitingApproval.length >= maxDisplay) {
        break;
      }
    }
  }

  if (awaitingApproval.length === 0) {
    return `<p class="empty-state">No New Applicants</p>`;
  }

  let html = "";
  for (let i = 0; i < awaitingApproval.length; i++) {
    const user = awaitingApproval[i];
    const membershipName = getMembershipName(user.membershipType);

    html += /*HTML*/ `
      <div class="applicantInfo">
        <div class="avatarCircle"></div>
        <div>
          <div style="font-weight: 500; color: #0f172a;">${user.username}</div>
          <small style="color: #64748b;">${membershipName} Medlemskap</small>
        </div>
      </div>
      <div style="display: flex; gap: 6px; margin-top: 4px;">
        <button onclick="approveMembership(${user.userId})">Godkjenn</button>
        <button onclick="denyMembership(${user.userId})">Avslå</button>
      </div>
    `;
  }

  return html;
}

function drawDetailedApplications() {
  let awaitingApproval = [];
  let pendingCancellations = [];

  for (let i = 0; i < model.users.length; i++) {
    const user = model.users[i];
    if (user.approved === false && user.membershipStatus === "standard") {
      awaitingApproval.push(user);
    } else if (user.membershipStatus === "pending_cancellation") {
      pendingCancellations.push(user);
    }
  }

  if (awaitingApproval.length === 0 && pendingCancellations.length === 0) {
    return `<p class="empty-state" style="padding: 12px; font-size: 0.9rem;">Ingen nye søknader eller oppsigelser til behandling.</p>`;
  }

  let html = "";

  if (awaitingApproval.length > 0) {
    html += `
      <div style="display: flex; flex-direction: column; gap: 14px; width: 100%; margin-bottom: 24px;">
        <h3 style="font-size: 0.95rem; font-weight: 600; color: #0f172a; margin: 0 0 4px 0; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">Nye Medlemssøknader</h3>
        <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
    `;

    for (let i = 0; i < awaitingApproval.length; i++) {
      const user = awaitingApproval[i];
      const membershipName = getMembershipName(user.membershipType);

      html += /*HTML*/ `
        <div class="applicationItem">
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div class="avatarCircle"></div>
            <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; word-break: break-word; font-size: 0.9rem;">
              <div><strong style="color: #0f172a;">${user.username}</strong></div>
              <small style="font-weight: 600; color: #475569;">${membershipName} Medlemskap</small>
              <span style="color: #64748b; font-size: 0.85rem;"><strong>Adresse:</strong> ${user.address}, ${user.postCode}</span>
              <span style="color: #64748b; font-size: 0.85rem;"><strong>Betaling:</strong> ${user.paymentMethod}</span>
              <span style="color: #64748b; font-size: 0.85rem;"><strong>Startdato:</strong> ${user.membershipStartUpDate}</span>
            </div>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 12px;">
            <button onclick="approveMembership(${user.userId})">Godkjenn</button>
            <button onclick="denyMembership(${user.userId})">Avslå</button>
          </div>
        </div>
      `;
    }
    html += `</div></div>`;
  }

  if (pendingCancellations.length > 0) {
    html += `
      <div style="display: flex; flex-direction: column; gap: 14px; width: 100%;">
        <h3 style="font-size: 0.95rem; font-weight: 600; color: #0f172a; margin: 0 0 4px 0; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">Innleverte Oppsigelser</h3>
        <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
    `;

    for (let i = 0; i < pendingCancellations.length; i++) {
      const user = pendingCancellations[i];
      const membershipName = getMembershipName(user.membershipType);

      html += /*HTML*/ `
        <div class="applicationItem" style="background: #fef2f2; border-color: #fca5a5;">
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div class="avatarCircle" style="background: #fee2e2; color: #991b1b; border-color: #fca5a5;"></div>
            <div style="display: flex; flex-direction: column; gap: 4px; flex: 1; word-break: break-word; font-size: 0.9rem;">
              <div><strong style="color: #0f172a;">${user.username}</strong> <span style="color: #ef4444; font-size: 0.75rem; font-weight: 600;">(Ønsker oppsigelse)</span></div>
              <small style="font-weight: 600; color: #475569;">${membershipName} Medlemskap</small>
              <span style="color: #64748b; font-size: 0.85rem;"><strong>Startdato:</strong> ${user.membershipStartUpDate}</span>
            </div>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 12px;">
            <button onclick="approveCancellation(${user.userId})">Godkjenn</button>
            <button onclick="denyCancellation(${user.userId})">Avslå</button>
          </div>
        </div>
      `;
    }
    html += `</div></div>`;
  }

  return html;
}

function drawManageApplication() {
  const applicationsContent = /*HTML*/ `
    <div class="adminCard" style="width: 100%; box-sizing: border-box;">
      <h2>Behandle Søknader og Oppsigelser</h2>
      ${drawDetailedApplications()}
    </div>
  `;

  return drawAdminShell(applicationsContent);
}

function toggleBookingRights(userId) {
  const user = model.users.find((u) => u.userId === userId);
  if (user) {
    user.isBookingAllowed = !user.isBookingAllowed;
    updateView();
  }
}

function approveCancellation(userId) {
  const user = model.users.find((u) => u.userId === userId);
  if (!user) return;

  if (
    confirm(
      `Godkjenn oppsigelse for ${user.username}? Medlemskapet vil bli avsluttet.`,
    )
  ) {
    user.membershipType = null;
    user.membershipStatus = "standard";
    user.approved = false;
    user.membershipStartUpDate = "";
    updateView();
  }
}

function denyCancellation(userId) {
  const user = model.users.find((u) => u.userId === userId);
  if (!user) return;

  if (confirm(`Avslå oppsigelsesforespørsel for ${user.username}?`)) {
    user.membershipStatus = "standard";
    updateView();
  }
}

function generateCodeOfTheDay() {
  const today = new Date().toISOString().slice(0, 10);

  if (model.codeDate === today && model.codeOfTheDay) {
    return model.codeOfTheDay;
  }

  let dailyCode = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < 6; i++) {
    dailyCode += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }

  model.codeOfTheDay = dailyCode;
  model.codeDate = today; 

  console.log("New daily code generated:", model.codeOfTheDay);
  return model.codeOfTheDay;
}
