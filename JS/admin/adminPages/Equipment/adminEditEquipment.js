function drawAdminEditEquipment() {
  const state = model.viewState.adminEditEquipmentPage;
  const isReservable = state.reservable;

  const content = /*HTML*/ `
    <div class="adminCard equipmentList">
        <p>Liste over utstyr</p>
        
        <div style="margin-bottom: 12px;">
            <input 
                type="text"
                placeholder="Søk etter utstyr..."
                value="${state.searchQuery || ""}"
                onchange="setEquipmentSearchQuery(this.value)"
                style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #333; border-radius: 4px;"
            />
        </div>

        ${createEquipmentListHtml()}
    </div>

    <div class="adminCard">
        <div style="margin-bottom: 12px;">
            <input 
                type="text"
                placeholder="Navn på utstyr"
                value="${state.equipmentName || ""}"
                oninput="model.viewState.adminEditEquipmentPage.equipmentName = this.value"
                style="width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #333; border-radius: 4px;"
            />
        </div>

        <div class="subSection" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
            <p style="margin: 0; font-weight: 600;">Kan Reserveres?</p>
            <label class="switch">
                <input 
                    type="checkbox" 
                    ${isReservable ? "checked" : ""} 
                    onchange="model.viewState.adminEditEquipmentPage.reservable = this.checked"
                />
                <span class="slider"></span>
            </label>
        </div>

        <p style="margin-top: 10px;">Kategori</p>
        <select
            onchange="model.viewState.adminEditEquipmentPage.category = this.value === '' ? null : Number(this.value)"
            style="width: 100%; padding: 8px; margin-top: 4px; margin-bottom: 12px; border: 2px solid #333; border-radius: 4px; background: #fff; box-sizing: border-box;"
        >
            <option value="">Velg kategori</option>
            ${createCategoryOptionsHtml(state.category)}
        </select>

        <button onclick="saveEquipmentChanges()" style="width: 100%; padding: 10px;">Lagre</button>
    </div>
  `;

  return drawAdminShell(content);
}

function createEquipmentListHtml() {
  cleanBookings();
  const state = model.viewState.adminEditEquipmentPage;
  const searchQuery = (state.searchQuery || "").toLowerCase();
  const itemsPerPage = 3;

  const filteredEquipment = model.equipment.filter((item) =>
    item.name.toLowerCase().includes(searchQuery),
  );

  if (filteredEquipment.length === 0) {
    return "<p>Ingen utstyr funnet.</p>";
  }

  const totalPages = Math.ceil(filteredEquipment.length / itemsPerPage);

  if (state.currentPage > totalPages) {
    state.currentPage = totalPages || 1;
  }
  if (!state.currentPage || state.currentPage < 1) {
    state.currentPage = 1;
  }

  const startIndex = (state.currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredEquipment.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  let html = "";
  for (const item of paginatedItems) {
    html += /*HTML*/ `
        <div class="subSection equipmentRow" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <button class="equipmentListItem" onclick="startEditEquipment(${item.id})">
                ${item.name}
            </button>
            <button onclick="deleteEquipment(${item.id})">X</button>
        </div>
    `;
  }

  if (totalPages > 1) {
    html += /*HTML*/ `
      <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 16px;">
        <button onclick="changeEquipmentPage(-1)" ${state.currentPage === 1 ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : ""}>Forrige</button>
        <span>Side ${state.currentPage} av ${totalPages}</span>
        <button onclick="changeEquipmentPage(1)" ${state.currentPage === totalPages ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : ""}>Neste</button>
      </div>
    `;
  }

  return html;
}

function setEquipmentSearchQuery(query) {
  model.viewState.adminEditEquipmentPage.searchQuery = query;
  model.viewState.adminEditEquipmentPage.currentPage = 1;
  updateView();
}

function changeEquipmentPage(direction) {
  model.viewState.adminEditEquipmentPage.currentPage += direction;
  updateView();
}
