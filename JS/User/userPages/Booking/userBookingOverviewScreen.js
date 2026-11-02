function drawBookingOverviewScreen() {
  const userBookings = model.equipmentBookings.filter(
    (booking) =>
      booking.userId === model.app.loggedInUserId && booking.approved !== false,
  );

  const bookingsHtml =
    userBookings.length === 0
      ? "<p>Du har ingen aktive reservasjoner.</p>"
      : userBookings
          .map((booking) => {
            const equipment = model.equipment.find(
              (e) => e.id === booking.equipmentId,
            );
            const equipmentName = equipment ? equipment.name : "Ukjent utstyr";
            return /*HTML*/ `
                <div style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-weight: 500; color: #0f172a;">${unnslippBookingHtml(equipmentName)}</strong>
                        <div style="font-size: 0.85rem; color: #64748b;">Dato: ${formatDate(booking.date)} | Kl. ${booking.startTime} - ${booking.endTime}</div>
                    </div>
                </div>
            `;
          })
          .join("");

  let html = /*HTML*/ `
        <button class="wide-button" onclick="navigateTo('bookingHomePage')">
             Tilbake til Booking
        </button>

        <div class="userContentArea">
            <div class="info-box">
                <h3>Dine nåværende reservasjoner</h3>
                <div class="reservation-row" style="display: flex; flex-direction: column; gap: 8px;">
                    ${bookingsHtml}
                </div>
            </div>

            <div class="info-box">
                <h3>Dine nåværende påmeldinger</h3>
                <div class="reservation-row">
                    ${lagDinePameldingerHtml()}
                </div>
            </div>
        </div>
    `;

  return drawUserShell(html);
}
