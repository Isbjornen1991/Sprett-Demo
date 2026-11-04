function tegnBookeUtstyrSide() {
  cleanBookings();
  const tilstand = model.viewState.bookingPage;
  const canBook = checkUserRights(model.app.loggedInUserId);

  const kategorier = model.equipmentCategories
    .map(
      (kategori) => /*HTML*/ `
        <option value="${kategori.id}" ${
          String(tilstand.setFilter.filter) === String(kategori.id)
            ? "selected"
            : ""
        }>
          ${unnslippUtstyrHtml(kategori.name)}
        </option>
      `,
    )
    .join("");

  const innhold = /*HTML*/ `
    ${
      !canBook
        ? /*HTML*/ `
            <div style="background: #fef2f2; border: 1px solid #f87171; border-radius: 12px; padding: 16px; margin-bottom: 16px; color: #991b1b; font-size: 0.9rem; text-align: center;">
              <strong>Du kan ikke booke utstyr for øyeblikket.</strong><br>
              Dette kan skyldes at du allerede har en aktiv booking, mangler godkjent medlemskap, eller at medlemskapet ditt ikke tillater utstyrsbooking.
            </div>
          `
        : ""
    }

    <section class="info-box">
      <h3>Book Utstyr</h3>
      <form onsubmit="event.preventDefault(); updateView();" style="display: flex; flex-direction: column; gap: 12px; margin: 0;">
        <label style="display: flex; flex-direction: column; gap: 6px;">
          Søk etter utstyr
          <input
            type="search"
            placeholder="Skriv inn navn på utstyr"
            value="${unnslippUtstyrHtml(tilstand.searchForm.input || "")}"
            oninput="model.viewState.bookingPage.searchForm.input = this.value"
          >
        </label>

        <label style="display: flex; flex-direction: column; gap: 6px;">
          Sett filter
          <select onchange="model.viewState.bookingPage.setFilter.filter = this.value; updateView()">
            <option value="" ${
              tilstand.setFilter.filter === null ||
              tilstand.setFilter.filter === ""
                ? "selected"
                : ""
            }>Alle typer</option>
            ${kategorier}
          </select>
        </label>

        <button type="submit" class="wide-button" style="margin: 0;">
          Søk
        </button>
      </form>
    </section>

    <section class="info-box">
      <h3>Utstyr</h3>
      ${lagUtstyrsSokeresultaterHtml(canBook)}
    </section>
  `;

  return drawUserShell(innhold);
}

function lagUtstyrsSokeresultaterHtml(canBook = true) {
  const tilstand = model.viewState.bookingPage;
  const soketekst = (tilstand.searchForm.input || "").trim().toLowerCase();
  const kategorifilter = tilstand.setFilter.filter;

  const utstyr = model.equipment.filter((element) => {
    const passerSok = element.name.toLowerCase().includes(soketekst);
    const elementCategories = Array.isArray(element.category)
      ? element.category
      : [element.category];
    const passerKategori =
      kategorifilter === null ||
      kategorifilter === "" ||
      elementCategories.some(
        (kategoriId) => String(kategoriId) === String(kategorifilter),
      );
    return passerSok && passerKategori;
  });

  if (utstyr.length === 0 && soketekst !== "") {
    return "<p>Fant ikke utstyr som passer søket eller filteret.</p>";
  }

  let html = "";
  const valgteKategorier =
    kategorifilter === null || kategorifilter === ""
      ? model.equipmentCategories
      : model.equipmentCategories.filter(
          (kategori) => String(kategori.id) === String(kategorifilter),
        );

  for (const kategori of valgteKategorier) {
    const elementer = utstyr.filter((element) => {
      const elementCategories = Array.isArray(element.category)
        ? element.category
        : [element.category];
      return elementCategories.some(
        (kategoriId) => String(kategoriId) === String(kategori.id),
      );
    });

    const tilgjengeligeAntall = elementer.filter(
      erUtstyrTilgjengeligIDag,
    ).length;

    html += /*HTML*/ `
      <div class="reservation-row" style="margin-bottom: 10px;">
        <h4 style="margin: 0 0 8px 0; font-size: 0.95rem; font-weight: 600; color: #0f172a;">${unnslippUtstyrHtml(kategori.name)}</h4>
        <p style="margin: 0 0 8px 0; color: #64748b;">Antall tilgjengelige: ${tilgjengeligeAntall}</p>
        ${
          elementer.length === 0
            ? "<p>Det finnes ikke utstyr i denne kategorien som matcher søkekriteriet.</p>"
            : elementer
                .map((element) => {
                  const erTilgjengelig = erUtstyrTilgjengeligIDag(element);
                  const status = !element.reservable
                    ? "Kan ikke reserveres"
                    : erTilgjengelig
                      ? "Tilgjengelig"
                      : "Allerede booket i dag";

                  const isSelected =
                    tilstand.selectedEquipmentId === element.id;

                  return /*HTML*/ `
                    <div style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <span style="font-weight: 500;">${unnslippUtstyrHtml(element.name)}</span>
                        <div style="font-size: 0.8rem; color: #64748b;">${status}</div>
                      </div>
                      ${
                        element.reservable && erTilgjengelig && canBook
                          ? /*HTML*/ `
                              <button 
                                class="wide-button" 
                                style="width: auto; margin: 0; padding: 6px 12px; font-size: 0.8rem; background: #10b981;" 
                                onclick="model.viewState.bookingPage.selectedEquipmentId = ${element.id}; navigateTo('userChooseBookingDate');"
                              >
                                Velg og gå videre
                              </button>
                            `
                          : ""
                      }
                    </div>
                  `;
                })
                .join("")
        }
      </div>
    `;
  }

  return html;
}
