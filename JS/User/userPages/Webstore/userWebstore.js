function drawUserWebstore() {
  const pageState = model.viewState.userWebStorePage;
  const selectedId = pageState.selectedProductId;

  let contentHtml = "";

  if (selectedId !== null) {
    const product = model.webStoreProducts.find(
      (p) => p.productId === selectedId,
    );
    if (!product) {
      pageState.selectedProductId = null;
      updateView();
      return "";
    }

    const subtotal = (
      product.productPrice * pageState.selectedQuantity
    ).toFixed(2);

    contentHtml = /*HTML*/ `
      <div class="info-box">
        <button class="wide-button" onclick="clearProductFocus()" style="margin: 0 0 12px 0; width: fit-content;">← Tilbake</button>
        
        <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${product.productName}</h3>
        <div style="font-size: 12px; color: #666; margin-bottom: 6px;">Produsent: ${product.productProducer}</div>
        <div style="font-size: 16px; font-weight: bold; color: #000000; margin-bottom: 12px;">Pris: ${product.productPrice} kr</div>
        
        <div style="font-size: 13px; line-height: 1.4; background: #f9f9f9; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 12px;">
          ${product.productDescription}
        </div>

        <div style="font-size: 12px; color: ${product.productQuantity > 0 ? "#059669" : "#dc2626"}; font-weight: bold; margin-bottom: 12px;">
          Lagerbeholdning: ${product.productQuantity > 0 ? product.productQuantity + " stk på lager" : "Utsolgt"}
        </div>

        ${
          product.productQuantity > 0
            ? /*HTML*/ `
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px; background: #f8fafc;">
            <span>Antall:</span>
            <button onclick="changeProductQuantity(-1)" style="padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; cursor: pointer; font-weight: 600;">-</button>
            <span style="font-weight: bold; font-size: 14px;">${pageState.selectedQuantity}</span>
            <button onclick="changeProductQuantity(1)" style="padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; cursor: pointer; font-weight: 600;">+</button>
            <span style="margin-left: auto; font-weight: bold;">Sum: ${subtotal} kr</span>
          </div>

          <button class="wide-button" onclick="addToCart(${product.productId})">
            Legg i handlekurv
          </button>
        `
            : ""
        }
      </div>
    `;
  } else {
    const itemsPerPage = 8;
    const totalPages =
      Math.ceil(model.webStoreProducts.length / itemsPerPage) || 1;

    if (pageState.currentPage > totalPages) {
      pageState.currentPage = totalPages;
    }
    if (!pageState.currentPage || pageState.currentPage < 1) {
      pageState.currentPage = 1;
    }

    const startIndex = (pageState.currentPage - 1) * itemsPerPage;
    const paginatedProducts = model.webStoreProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );

    let productsHtml = "";
    for (const product of paginatedProducts) {
      productsHtml += /*HTML*/ `
        <div 
          onclick="focusProduct(${product.productId})"
          style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; background: #fff; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: border-color 0.15s;"
        >
          <div style="font-weight: bold; font-size: 13px; color: #0f172a;">${product.productName}</div>
          <div style="font-size: 11px; color: #64748b;">${product.productProducer}</div>
          <div style="font-size: 12px; font-weight: bold; color: #0f172a;">${product.productPrice} kr</div>
          <div style="font-size: 10px; color: ${product.productQuantity > 0 ? "#64748b" : "#dc2626"};">
            ${product.productQuantity > 0 ? `Lager: ${product.productQuantity}` : "Utsolgt"}
          </div>
        </div>
      `;
    }

    if (productsHtml === "") {
      productsHtml = "<p>Ingen produkter tilgjengelig.</p>";
    }

    // Pagination controls HTML using styled button classes
    let paginationHtml = "";
    if (totalPages > 1) {
      paginationHtml = /*HTML*/ `
        <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 16px; grid-column: span 2;">
          <button class="user-nav button" onclick="changeWebstorePage(-1)" ${pageState.currentPage === 1 ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : "style='padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; cursor: pointer; font-size: 0.8rem;'"}>Forrige</button>
          <span style="font-size: 12px; color: #64748b; font-weight: 500;">Side ${pageState.currentPage} av ${totalPages}</span>
          <button class="user-nav button" onclick="changeWebstorePage(1)" ${pageState.currentPage === totalPages ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : "style='padding: 6px 12px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; cursor: pointer; font-size: 0.8rem;'"}>Neste</button>
        </div>
      `;
    }

    let cartItemsHtml = "";
    let cartTotal = 0;

    for (const item of model.viewState.shoppingCart) {
      const prod = model.webStoreProducts.find(
        (p) => p.productId === item.productId,
      );
      if (prod) {
        const itemTotal = prod.productPrice * item.quantity;
        cartTotal += itemTotal;
        cartItemsHtml += /*HTML*/ `
          <div style="display: flex; justify-content: space-between; font-size: 12px; padding: 6px 0; border-bottom: 1px dashed #e2e8f0; color: #334155;">
            <span>${prod.productName} (x${item.quantity})</span>
            <span style="font-weight: 500;">${itemTotal.toFixed(2)} kr</span>
          </div>
        `;
      }
    }

    contentHtml = /*HTML*/ `
      <div class="info-box" style="background: #f8fafc;">
        <h3>Handlekurv</h3>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${cartItemsHtml || '<p style="font-size: 12px; color: #64748b; font-style: italic; text-align: center; margin: 4px 0;">Handlekurven er tom.</p>'}
        </div>
        ${
          model.viewState.shoppingCart.length > 0
            ? /*HTML*/ `
          <div style="border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 8px; display: flex; justify-content: space-between; font-weight: bold; font-size: 13px; color: #0f172a;">
            <span>Totalt:</span>
            <span>${cartTotal.toFixed(2)} kr</span>
          </div>
          <div style="font-size: 10px; color: #64748b; font-style: italic; margin-top: 4px; text-align: center;">Betaling skjer ved henting på lokasjon.</div>
          <button class="wide-button" onclick="placeOrder()">
            Fullfør bestilling (Henting)
          </button>
        `
            : ""
        }
      </div>

      <div class="info-box">
        <h3>Nettbutikk - Produkter</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${productsHtml}
          ${paginationHtml}
        </div>
      </div>
    `;
  }

  return drawUserShell(contentHtml);
}

function changeWebstorePage(direction) {
  model.viewState.userWebStorePage.currentPage += direction;
  updateView();
}
