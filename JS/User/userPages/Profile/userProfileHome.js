function drawUserProfileHomePage() {
  const user = model.users.find((u) => u.userId === model.app.loggedInUserId);
  const membership =
    user && user.membershipType !== null
      ? model.memberships.find((m) => m.id === user.membershipType)
      : null;

  // Filter for bestillinger basert på hvem som er logget inn
  const userOrders = model.orders.filter(
    (order) => order.userId === model.app.loggedInUserId,
  );

  let ordersHtml = "";
  for (const order of userOrders) {
    let itemsList = "";
    for (const item of order.items) {
      const product = model.webStoreProducts.find(
        (p) => p.productId === item.productId,
      );
      const productName = product ? product.productName : "Ukjent produkt";
      itemsList += `<div style="font-size: 11px; color: #444;">• ${productName} (x${item.quantity})</div>`;
    }

    ordersHtml += /*HTML*/ `
      <div style="border: 2px solid #000; border-radius: 10px; padding: 8px; margin-bottom: 8px; background: #fafafa;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; margin-bottom: 4px;">
          <span>Bestilling #${order.orderId}</span>
          <span>${formatDate(order.date)}</span>
        </div>
        <div style="margin-bottom: 6px;">
          ${itemsList}
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; border-top: 1px dashed #ccc; padding-top: 4px;">
          <span><strong>Total:</strong> ${order.totalPrice} kr</span>
          <span style="color: #0044aa; font-style: italic;">${order.status}</span>
        </div>
      </div>
    `;
  }

  if (ordersHtml === "") {
    ordersHtml = `<div style="padding: 6px 0; font-style: italic; color: #666; text-align: center; font-size: 12px;">Ingen aktive bestillinger</div>`;
  }

  const userProfileHomePageContent = /*HTML*/ `
    <div class="userContentArea">
      
      <div class="info-box">
        <h3>Personalia</h3>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <div class="profile-picture">${displayUserName().substring(0, 1).toUpperCase()}</div>
          <div>
            <div style="font-weight: bold;">${displayUserName()}</div>
            <div style="font-size: 12px; color: #666;">${user ? `${user.address || ""}, ${user.postCode || ""}` : ""}</div>
          </div>
        </div>
        <button class="wide-button" onclick="navigateTo('userEditProfile')">Administrer</button>
      </div>

      <div class="info-box">
        <h3>Medlemskap</h3>
        ${
          membership
            ? /*HTML*/ `
          <div class="price-row">
            <span>Type:</span>
            <strong>${membership.name}</strong>
          </div>
          <div class="price-row" style="margin-bottom: 8px;">
            <span>Pris:</span>
            <strong>${membership.price} kr / mnd</strong>
          </div>
        `
            : /*HTML*/ `
          <div style="padding: 6px 0; font-style: italic; color: #666; text-align: center;">Ingen aktivt medlemskap</div>
        `
        }
        <button class="wide-button" onclick="navigateTo('userEditSubscription')">Administrer</button>
      </div>

      <div class="info-box">
        <h3>Mine treningsprogram</h3>
        ${createMyProgramsHtml()}
        <button class="wide-button" onclick="navigateTo('userTrainingProgram')">Lag treningsprogram</button>
      </div>

      <div class="info-box">
        <h3>Dine Bestillinger</h3>
        <div style="display: flex; flex-direction: column; gap: 4px; max-height: 200px; overflow-y: auto;">
          ${ordersHtml}
        </div>
      </div>

    </div>
  `;

  return drawUserShell(userProfileHomePageContent);
}
