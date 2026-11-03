function tegnArrangementDetaljerSide() {
  const arrangement = model.events.find(
    (element) => String(element.id) === String(model.app.valgtArrangementId),
  );

  if (!arrangement || arrangement.isArchived || isEventPast(arrangement)) {
    return drawUserShell(/*HTML*/ `
      <section class="info-box">
        <h3>Arrangementer</h3>
        <p>Arrangementet finnes ikke lenger.</p>
        <button class="wide-button" onclick="navigateTo('bookingHomePage')">
          Tilbake
        </button>
      </section>
    `);
  }

  const erPameldt =
    arrangement.signups &&
    arrangement.signups.some(
      (pamelding) => pamelding.userId === model.app.loggedInUserId,
    );
  const pameldteAntall = arrangement.signups ? arrangement.signups.length : 0;

  const innhold = /*HTML*/ `
    <section class="info-box">
      <h3>Arrangementer</h3>
      <div class="reservation-row">
        <strong>${unnslippBookingHtml(arrangement.title || "Et arrangement")}</strong>
        <span style="font-weight: 600; color: #475569; margin-top: 4px;">Detaljer om arrangementet</span>
        <span>Dato: ${unnslippBookingHtml(formatDate(arrangement.startDate))}</span>
        <span>Tid: ${unnslippBookingHtml(arrangement.startTime || "Ikke oppgitt")} - ${unnslippBookingHtml(arrangement.endTime || "Ikke oppgitt")}</span>
        ${
          arrangement.description
            ? `<span>${unnslippBookingHtml(arrangement.description)}</span>`
            : "<span>Ingen flere detaljer er lagt til.</span>"
        }
        <span>Påmeldte: ${pameldteAntall} / ${arrangement.maxParticipants || "Ubegrenset"}</span>
      </div>
      <button
        class="wide-button"
        onclick="togglePameldingPaArrangement('${arrangement.id}')"
      >
        ${erPameldt ? "Meld deg av" : "Meld deg på"}
      </button>
      <button
        class="wide-button"
        style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;"
        onclick="navigateTo('bookingHomePage')"
      >
        Tilbake
      </button>
    </section>
  `;

  return drawUserShell(innhold);
}

