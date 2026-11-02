function tegnArrangementerSide() {
  const arrangementer = model.events.filter(
    (arrangement) => !arrangement.isArchived,
  );

  const arrangementerHtml =
    arrangementer.length === 0
      ? "<p>Ingen arrangementer er lagt ut.</p>"
      : arrangementer
          .map(
            (arrangement) => /*HTML*/ `
              <div class="reservation-row">
                <strong>${unnslippBookingHtml(arrangement.title || "Arrangement")}</strong>
                <span>Dato: ${unnslippBookingHtml(formatDate(arrangement.startDate))}</span>
                <span>Tid: ${unnslippBookingHtml(arrangement.startTime || "Ikke oppgitt")}</span>
                <button
                  class="wide-button"
                  onclick="model.app.valgtArrangementId = '${arrangement.id}'; navigateTo('eventDetailsPage')"
                >
                  Se detaljer og meld på
                </button>
              </div>
            `,
          )
          .join("");

  return drawUserShell(/*HTML*/ `
    <section class="info-box">
      <h3>Arrangementer</h3>
      ${arrangementerHtml}
    </section>
  `);
}
