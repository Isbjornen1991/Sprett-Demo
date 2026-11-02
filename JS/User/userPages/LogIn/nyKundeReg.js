function drawNewUserRegistration() {
  const form = getNewUserRegistrationForm();
  const membershipOptions = model.memberships
    .map(
      (membership) => /*HTML*/ `
        <option value="${membership.id}" ${
          String(form.membershipType) === String(membership.id)
            ? "selected"
            : ""
        }>
          ${escapeRegistrationHtml(membership.name)} - ${membership.price} kr / mnd
        </option>
      `,
    )
    .join("");

  const content = form.successMessage
    ? /*HTML*/ `
        <div class="info-box">
          <h3>Søknad sendt</h3>
          <p style="margin: 16px 0; color: #475569; text-align: center;">${escapeRegistrationHtml(form.successMessage)}</p>
          <button class="wide-button" onclick="navigateTo('startPage')">
            Tilbake til forsiden
          </button>
        </div>
      `
    : /*HTML*/ `
        <div class="info-box">
          <h3>Bli kunde</h3>
          <form onsubmit="registerUser(); return false;" style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              Navn
              <input type="text" autocomplete="name" required value="${escapeRegistrationHtml(form.name)}"
                oninput="model.viewState.loginPage.newUserForm.name = this.value">
            </label>
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              E-post
              <input type="email" autocomplete="email" required value="${escapeRegistrationHtml(form.mail)}"
                oninput="model.viewState.loginPage.newUserForm.mail = this.value">
            </label>
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              Telefonnummer
              <input type="tel" autocomplete="tel" required value="${escapeRegistrationHtml(form.phone)}"
                oninput="model.viewState.loginPage.newUserForm.phone = this.value">
            </label>
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              Adresse
              <input type="text" autocomplete="street-address" required value="${escapeRegistrationHtml(form.address)}"
                oninput="model.viewState.loginPage.newUserForm.address = this.value">
            </label>
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              Postnummer
              <input type="text" inputmode="numeric" autocomplete="postal-code" required value="${escapeRegistrationHtml(form.postcode)}"
                oninput="model.viewState.loginPage.newUserForm.postcode = this.value">
            </label>
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              Medlemskap
              <select required onchange="model.viewState.loginPage.newUserForm.membershipType = this.value" style="width: 100%; box-sizing: border-box; font-family: inherit; font-size: 0.95rem; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; background: #ffffff;">
                <option value="">Velg medlemskap</option>
                ${membershipOptions}
              </select>
            </label>
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              Ønsket betalingsmåte
              <select required onchange="model.viewState.loginPage.newUserForm.paymentMethod = this.value" style="width: 100%; box-sizing: border-box; font-family: inherit; font-size: 0.95rem; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; background: #ffffff;">
                <option value="">Velg betalingsmåte</option>
                <option value="kort" ${form.paymentMethod === "kort" ? "selected" : ""}>Kort</option>
                <option value="vipps" ${form.paymentMethod === "vipps" ? "selected" : ""}>Vipps</option>
              </select>
            </label>
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              Passord
              <input type="password" autocomplete="new-password" required value="${escapeRegistrationHtml(form.password)}"
                oninput="model.viewState.loginPage.newUserForm.password = this.value">
            </label>
            <label style="display: flex; flex-direction: column; gap: 6px; font-weight: 500;">
              Gjenta passord
              <input type="password" autocomplete="new-password" required value="${escapeRegistrationHtml(form.repeatPassword)}"
                oninput="model.viewState.loginPage.newUserForm.repeatPassword = this.value">
            </label>
            ${
              form.errorMessage
                ? /*HTML*/ `<p role="alert" style="color: #ef4444; font-size: 0.85rem; margin: 0; text-align: center;">${escapeRegistrationHtml(form.errorMessage)}</p>`
                : ""
            }
            <button class="wide-button" type="submit" style="margin-top: 8px;">
              Send søknad
            </button>
            <button class="wide-button" type="button" onclick="navigateTo('startPage')" style="background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; margin-top: 4px;">
              Avbryt
            </button>
          </form>
        </div>
      `;

  return drawNotLoggedInShell(content);
}

function registerUser() {
  const form = getNewUserRegistrationForm();
  const name = form.name.trim();
  const email = form.mail.trim().toLowerCase();
  const phone = form.phone.trim();
  const address = form.address.trim();
  const postcode = form.postcode.trim();
  const password = form.password;
  const hasMembershipSelection = form.membershipType !== "";
  const membershipType = Number(form.membershipType);

  form.errorMessage = "";

  if (!name || !email || !phone || !address || !postcode || !password) {
    form.errorMessage = "Fyll ut alle feltene.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    form.errorMessage = "Skriv inn en gyldig e-postadresse.";
  } else if (!/^\d{8}$/.test(phone)) {
    form.errorMessage = "Telefonnummer må bestå av 8 siffer.";
  } else if (!/^\d{4}$/.test(postcode)) {
    form.errorMessage = "Postnummer må bestå av 4 siffer.";
  } else if (password.length < 8) {
    form.errorMessage = "Passordet må være minst 8 tegn.";
  } else if (password !== form.repeatPassword) {
    form.errorMessage = "Passordene er ikke like.";
  } else if (
    model.users.some(
      (user) => user.email && user.email.trim().toLowerCase() === email,
    )
  ) {
    form.errorMessage =
      "Det finnes allerede en kunde med denne e-postadressen.";
  } else if (
    !hasMembershipSelection ||
    !model.memberships.some((membership) => membership.id === membershipType)
  ) {
    form.errorMessage = "Velg et gyldig medlemskap.";
  } else if (!form.paymentMethod) {
    form.errorMessage = "Velg en betalingsmåte.";
  }

  if (form.errorMessage) {
    updateView();
    return;
  }

  const userId =
    model.users.length > 0
      ? Math.max(...model.users.map((user) => user.userId)) + 1
      : 0;
  const today = new Date().toISOString().slice(0, 10);
  const usernameExists = model.users.some(
    (user) =>
      user.username &&
      user.username.trim().toLowerCase() === name.toLowerCase(),
  );
  const username = usernameExists ? `${name} (${userId})` : name;

  model.users.push({
    userId,
    role: "customer",
    username,
    password,
    membershipType,
    membershipStatus: "standard",
    approved: false,
    paymentDate: null,
    paymentMethod: form.paymentMethod,
    paymentStatus: false,
    activeBooking: false,
    isBookingAllowed: false,
    bookings: [],
    signUps: [],
    penalties: 0,
    registeredShowUps: 0,
    address,
    postCode: postcode,
    phone: Number(phone),
    email,
    membershipApplicationDate: today,
    membershipStartUpDate: today,
    lastCheckInDate: null,
  });

  form.errorMessage = "";
  form.successMessage =
    "Søknaden din er registrert og må godkjennes før medlemskapet blir aktivt.";
  updateView();
}

function getNewUserRegistrationForm() {
  const form = model.viewState.loginPage.newUserForm;
  if (form.membershipType === undefined) form.membershipType = "";
  if (form.errorMessage === undefined) form.errorMessage = "";
  if (form.successMessage === undefined) form.successMessage = "";
  return form;
}

function escapeRegistrationHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}
