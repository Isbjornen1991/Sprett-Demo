function deleteBulletin(bulletinId) {
  const index = model.bulletins.findIndex((b) => b.bulletinId === bulletinId);
  if (index !== -1) {
    model.bulletins.splice(index, 1);
  }
  updateView();
}

function toggleArchiveBulletin(bulletinId) {
  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (bulletin) {
    bulletin.isArchived = !bulletin.isArchived;
  }
  updateView();
}

function deleteComment(bulletinId, commentId) {
  if (!confirm("Er du sikker på at du vil slette denne kommentaren?")) {
    return;
  }

  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (bulletin && bulletin.comments) {
    const commentIndex = bulletin.comments.findIndex(
      (c) => c.commentId === commentId,
    );
    if (commentIndex !== -1) {
      bulletin.comments.splice(commentIndex, 1);
    }
  }
  updateView();
}

function getLatestCommentActivity() {
  if (!model.bulletins || model.bulletins.length === 0) return null;

  let allComments = [];

  for (let i = 0; i < model.bulletins.length; i++) {
    const bulletin = model.bulletins[i];
    if (bulletin.comments && bulletin.comments.length > 0) {
      for (let j = 0; j < bulletin.comments.length; j++) {
        const comment = bulletin.comments[j];
        allComments.push({
          bulletinTitle: bulletin.title,
          bulletinId: bulletin.bulletinId,
          userId: comment.userId,
          text: comment.text,
          commentId: comment.commentId,
          totalCommentsInBulletin: bulletin.comments.length,
        });
      }
    }
  }

  if (allComments.length === 0) return null;

  const latest = allComments[allComments.length - 1];

  const user = model.users.find((u) => u.userId === latest.userId);
  latest.userName = user ? user.username : "Ukjent bruker";

  return latest;
}

function drawDashboardLatestActivity() {
  const latest = getLatestCommentActivity();

  if (!latest) {
    return `
      <div class="subSection">
        <h3>Siste Aktivitet</h3>
        <p style="font-size: 0.85rem; color: #666; margin: 0;">Ingen nylige kommentarer.</p>
        <button onclick="navigateTo('manageBulletins')">Se og moderer</button>
      </div>
    `;
  }

  return /*HTML*/ `
    <div class="subSection">
      <h3>Siste Aktivitet</h3>
      <div class="bulletinItem">
        <div class="bulletinHeader">
          <div class="avatarCircle"></div>
          <div>
            <strong>${latest.bulletinTitle}</strong>
            <div>${latest.userName}</div>
            <small>${latest.text}</small>
          </div>
          <span class="closeX" onclick="deleteComment(${latest.bulletinId}, ${latest.commentId})" title="Slett kommentar">✕</span>
        </div>
        <small>Antall kommentarer: ${latest.totalCommentsInBulletin}</small>
      </div>
      <button onclick="navigateTo('manageBulletins')">Se og moderer</button>
    </div>
  `;
}

function generateEventDropdown() {
  const currentLink = model.viewState.adminCreatePostPage.link;
  const isDefaultSelected =
    currentLink === "" || currentLink === null || currentLink === undefined;

  let html = `<option value="" ${isDefaultSelected ? "selected" : ""}>Velg arrangement...</option>`;

  for (let i = 0; i < model.events.length; i++) {
    const event = model.events[i];
    const isSelected =
      String(currentLink) === String(event.id) ? "selected" : "";
    html += `<option value="${event.id}" ${isSelected}>ID: ${event.id} - ${event.title}</option>`;
  }
  return html;
}

function createPost(publishingState) {
  const postState = model.viewState.adminCreatePostPage;

  if (!postState.title && !postState.inputText) {
    alert("Vennligst fyll ut tittel eller tekst før du publiserer.");
    return;
  }

  let newId = 0;
  if (model.bulletins && model.bulletins.length > 0) {
    const maxId = Math.max(...model.bulletins.map((b) => b.bulletinId));
    newId = maxId + 1;
  }

  const newBulletin = {
    title: postState.title || "",
    description: postState.inputText || "",
    bulletinId: newId,
    link: postState.link || "",
    isPublished: publishingState,
    isArchived: false,
    comments: [],
  };

  model.bulletins.push(newBulletin);

  model.viewState.adminCreatePostPage = {
    title: "",
    link: "",
    inputText: "",
  };

  updateView();
}

function selectEventForPost(eventId) {
  const postState = model.viewState.adminCreatePostPage;
  postState.link = eventId === "" ? null : eventId;
  updateView();
}

function publishDraft(bulletinId) {
  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (bulletin) {
    bulletin.isPublished = true;
    updateView();
  }
}