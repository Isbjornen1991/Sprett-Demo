function tegnBookeUtstyrSide() {
  const tilstand = model.viewState.bookingPage;
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
      ${lagUtstyrsSokeresultaterHtml()}
      ${
        tilstand.selectedEquipmentId !== null
          ? /*HTML*/ `
              <button class="wide-button" style="margin-top: 16px;" onclick="navigateTo('userChooseBookingDate')">
                Gå videre til dato
              </button>
            `
          : ""
      }
    </section>
  `;

  return drawUserShell(innhold);
}

function lagUtstyrsSokeresultaterHtml() {
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
            ? "<p>Ingen utstyr i denne kategorien passer søket.</p>"
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
                        element.reservable && erTilgjengelig
                          ? /*HTML*/ `
                              <button 
                                class="wide-button" 
                                style="width: auto; margin: 0; padding: 6px 12px; font-size: 0.8rem; ${isSelected ? "background: #10b981;" : ""}" 
                                onclick="model.viewState.bookingPage.selectedEquipmentId = ${element.id}; updateView();"
                              >
                                ${isSelected ? "Valgt ✓" : "Velg"}
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

function erUtstyrTilgjengeligIDag(element) {
  if (!element.reservable) return false;

  const dagensDato = new Date();
  const dagensDatoTekst = [
    dagensDato.getFullYear(),
    String(dagensDato.getMonth() + 1).padStart(2, "0"),
    String(dagensDato.getDate()).padStart(2, "0"),
  ].join("-");

  return !model.equipmentBookings.some(
    (bestilling) =>
      bestilling.equipmentId === element.id &&
      bestilling.date === dagensDatoTekst &&
      bestilling.approved !== false,
  );
}

function unnslippUtstyrHtml(verdi) {
  return String(verdi ?? "").replace(/[&<>"']/g, (tegn) => {
    const htmlEntiteter = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return htmlEntiteter[tegn];
  });
}
