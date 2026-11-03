function focusBulletin(bulletinId) {
  model.viewState.bulletinPage.selectedBulletinId = bulletinId;
  model.viewState.bulletinPage.selectedEventId = null;
  updateView();
}

function focusEvent(eventId) {
  model.viewState.bulletinPage.selectedEventId = eventId;
  model.viewState.bulletinPage.selectedBulletinId = null;
  updateView();
}

function clearBulletinFocus() {
  model.viewState.bulletinPage.selectedBulletinId = null;
  model.viewState.bulletinPage.selectedEventId = null;
  updateView();
}

function addComment(bulletinId) {
  const text = model.viewState.bulletinPage.inputComment;
  if (!text || text.trim() === "") return;

  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (!bulletin) return;

  if (!bulletin.comments) {
    bulletin.comments = [];
  }

  let newCommentId = 0;
  if (bulletin.comments.length > 0) {
    newCommentId = Math.max(...bulletin.comments.map((c) => c.commentId)) + 1;
  }

  bulletin.comments.push({
    commentId: newCommentId,
    userId: model.app.loggedInUserId,
    text: text.trim(),
  });

  model.viewState.bulletinPage.inputComment = "";
  updateView();
}

function deleteUserComment(bulletinId, commentId) {
  if (!confirm("Er du sikker på at du vil slette denne kommentaren?")) {
    return;
  }

  const bulletin = model.bulletins.find((b) => b.bulletinId === bulletinId);
  if (!bulletin || !bulletin.comments) return;

  const commentIndex = bulletin.comments.findIndex(
    (c) => c.commentId === commentId,
  );
  if (commentIndex !== -1) {
    const comment = bulletin.comments[commentIndex];

    if (
      comment.userId === model.app.loggedInUserId ||
      model.app.loggedInUserId === 0
    ) {
      bulletin.comments.splice(commentIndex, 1);
      updateView();
    }
  }
}

function getUsernameById(userId) {
  if (!model.users) return "Unknown user";
  const user = model.users.find((u) => u.userId === userId);
  return user ? user.username : "Unknown user";
}

function toggleEventSignup(eventId) {
  const event = model.events.find((e) => String(e.id) === String(eventId));
  if (!event) return;

  const userId = model.app.loggedInUserId;
  if (!event.signups) event.signups = [];

  const existingSignupIndex = event.signups.findIndex(
    (s) => s.userId === userId,
  );

  if (existingSignupIndex >= 0) {
    event.signups.splice(existingSignupIndex, 1);
  } else {
    event.signups.push({ userId: userId, approved: true });
  }

  updateView();
}

function drawUserBulletinsList() {
  const pageState = model.viewState.bulletinPage;
  const selectedBulletinId = pageState.selectedBulletinId;
  const selectedEventId = pageState.selectedEventId;

  if (selectedEventId != null) {
    return drawFocusedEvent(selectedEventId);
  }

  let html = "";

  html += `<div style="font-weight: bold; font-size: 14px; margin-bottom: 6px;">Oppslag</div>`;
  const bulletinsToDisplay =
    selectedBulletinId !== null
      ? model.bulletins.filter((b) => b.bulletinId === selectedBulletinId)
      : model.bulletins;

  for (let i = 0; i < bulletinsToDisplay.length; i++) {
    const bulletin = bulletinsToDisplay[i];
    if (bulletin.isArchived) continue;

    const isFocused = selectedBulletinId !== null;
    const maxLength = 140;
    const rawText = bulletin.description || "";
    let displayText = rawText;
    if (!isFocused && rawText.length > maxLength) {
      displayText = rawText.substring(0, maxLength) + "...";
    }
    const formattedText = displayText.replace(/\n/g, "<br>");

    let linkedEventHtml = "";
    if (isFocused && bulletin.link) {
      const linkedEvent = model.events.find(
        (e) => String(e.id) === String(bulletin.link),
      );
      if (linkedEvent) {
        const userId = model.app.loggedInUserId;
        const isSignedUp =
          linkedEvent.signups &&
          linkedEvent.signups.some((s) => s.userId === userId);
        const signupCount = linkedEvent.signups
          ? linkedEvent.signups.length
          : 0;

        linkedEventHtml = /*HTML*/ `
          <div style="margin-top: 12px; border: 2px solid #0044aa; border-radius: 8px; padding: 10px; background: #f0f8ff; display: flex; flex-direction: column; gap: 6px;">
            <div style="font-weight: bold; font-size: 14px; color: #0044aa; border-bottom: 1px solid #0044aa; padding-bottom: 4px;">
              Tilknyttet arrangement: ${linkedEvent.title}
            </div>
            <div style="font-size: 12px; color: #444;">
              <strong>Tidspunkt:</strong> ${formatDate(linkedEvent.startDate)} kl. ${linkedEvent.startTime || "00.00"} - ${linkedEvent.endTime || "00.00"}
            </div>
            <div style="font-size: 12px; color: #333;">
              ${linkedEvent.description || ""}
            </div>
            <div style="font-size: 11px; color: #666;">
              Påmeldte deltakere: ${signupCount} / ${linkedEvent.maxParticipants || "Ubegrenset"}
            </div>
            <button class="wide-button" style="margin-top: 6px; background-color: ${isSignedUp ? "#fff0f0" : "#e6f4ea"}; color: ${isSignedUp ? "#cc0000" : "#006600"}; font-weight: bold;" onclick="toggleEventSignup('${linkedEvent.id}')">
              ${isSignedUp ? "Meld meg av arrangement" : "Meld deg på arrangement"}
            </button>
          </div>
        `;
      }
    }

    html += /*HTML*/ `
      <div 
        onclick="${isFocused ? "" : `focusBulletin(${bulletin.bulletinId})`}"
        style="
          border: 2px solid #000000; 
          border-radius: 10px; 
          padding: 12px; 
          background: #ffffff; 
          display: flex; 
          flex-direction: column; 
          gap: 6px; 
          cursor: ${isFocused ? "default" : "pointer"};
          margin-bottom: 10px;
        "
      >
        <div style="font-weight: bold; font-size: 14px; border-bottom: 1px solid #000000; padding-bottom: 4px;">
          ${bulletin.title}
        </div>
        <div style="font-size: 13px; color: #333333; word-break: break-word; line-height: 1.4;">
          ${formattedText}
        </div>
        ${
          !isFocused && rawText.length > maxLength
            ? /*HTML*/ `
          <div style="font-size: 11px; color: #666; font-style: italic; margin-top: 2px;">Trykk for å se mer...</div>
        `
            : ""
        }

        ${linkedEventHtml}

        ${
          isFocused
            ? /*HTML*/ `
          <div style="margin-top: 15px; border-top: 1px solid #000000; padding-top: 10px; display: flex; flex-direction: column; gap: 8px;">
            <div style="font-weight: bold; font-size: 13px;">Kommentarer</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              ${drawBulletinCommentsList(bulletin)}
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;" onclick="event.stopPropagation()">
              <textarea 
                style="width: 100%; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; font-size: 13px; padding: 8px; border: 2px solid #000000; border-radius: 6px; resize: vertical; min-height: 60px;"
                placeholder="Skriv en kommentar..."
                oninput="model.viewState.bulletinPage.inputComment = this.value"
              >${model.viewState.bulletinPage.inputComment || ""}</textarea>
              <button class="wide-button" onclick="addComment(${bulletin.bulletinId})" style="margin: 0; width: 100%;">Legg til Kommentar...</button>
            </div>
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  if (selectedBulletinId === null) {
    html += `<div style="font-weight: bold; font-size: 14px; margin: 16px 0 6px 0;">Arrangementer</div>`;
    const events = model.events.filter((e) => !e.isArchived);

    if (events.length === 0) {
      html += `<p style='font-size: 12px; color: #666; font-style: italic;'>Ingen arrangementer.</p>`;
    }

    for (const event of events) {
      html += /*HTML*/ `
        <div 
          onclick="focusEvent('${event.id}')"
          style="
            border: 2px solid #000000; 
            border-radius: 10px; 
            padding: 12px; 
            background: #f0f8ff; 
            display: flex; 
            flex-direction: column; 
            gap: 6px; 
            cursor: pointer;
            margin-bottom: 10px;
          "
        >
          <div style="font-weight: bold; font-size: 14px; border-bottom: 1px solid #000000; padding-bottom: 4px; color: #0044aa;">
            ${event.title}
          </div>
          <div style="font-size: 12px; color: #444;">
            Dato: ${formatDate(event.startDate) || "Ikke satt"} kl. ${event.startTime || "00.00"}
          </div>
        </div>
      `;
    }
  }

  return html;
}

function drawFocusedEvent(eventId) {
  const event = model.events.find((e) => String(e.id) === String(eventId));
  if (!event) return "<p>Arrangementet ble ikke funnet.</p>";

  const userId = model.app.loggedInUserId;
  const isSignedUp =
    event.signups && event.signups.some((s) => s.userId === userId);
  const signupCount = event.signups ? event.signups.length : 0;

  return /*HTML*/ `
    <div style="border: 2px solid #000000; border-radius: 10px; padding: 12px; background: #ffffff; display: flex; flex-direction: column; gap: 8px;">
      <div style="font-weight: bold; font-size: 16px; border-bottom: 1px solid #000000; padding-bottom: 4px; color: #0044aa;">
        ${event.title}
      </div>
      <div style="font-size: 13px;">
        <strong>Tidspunkt:</strong> ${formatDate(event.startDate)} kl. ${event.startTime || "00.00"} - ${event.endTime || "00.00"}
      </div>
      <div style="font-size: 13px; line-height: 1.4;">
        ${event.description}
      </div>
      <div style="font-size: 12px; color: #666;">
        Påmeldte deltakere: ${signupCount} / ${event.maxParticipants || "Ubegrenset"}
      </div>

      <button class="wide-button" style="margin-top: 10px; background-color: ${isSignedUp ? "#fff0f0" : "#e6f4ea"}; color: ${isSignedUp ? "#cc0000" : "#006600"}; font-weight: bold;" onclick="toggleEventSignup('${event.id}')">
        ${isSignedUp ? "Meld meg av" : "Meld deg på"}
      </button>
    </div>
  `;
}

function drawBulletinCommentsList(bulletin) {
  if (!bulletin.comments || bulletin.comments.length === 0) {
    return `<p style="font-size: 12px; color: #666; font-style: italic; margin: 0;">No comments yet.</p>`;
  }

  let html = "";
  for (let j = 0; j < bulletin.comments.length; j++) {
    const comment = bulletin.comments[j];
    const username = getUsernameById(comment.userId);
    const isOwner =
      comment.userId === model.app.loggedInUserId ||
      model.app.loggedInUserId === 0;

    html += /*HTML*/ `
      <div style="border: 1px solid #000000; border-radius: 6px; padding: 8px; background: #fafafa; position: relative; display: flex; flex-direction: column; gap: 4px; ${isOwner ? "padding-right: 25px;" : ""}">
        <div style="font-weight: bold; font-size: 12px; color: #000;">${username}</div>
        <div style="font-size: 13px; color: #333; word-break: break-word;">${comment.text}</div>
        
        ${
          isOwner
            ? /*HTML*/ `
          <span onclick="deleteUserComment(${bulletin.bulletinId}, ${comment.commentId})" style="position: absolute; right: 8px; top: 6px; font-weight: bold; cursor: pointer; font-size: 16px;" title="Delete comment">&times;</span>
        `
            : ""
        }
      </div>
    `;
  }
  return html;
}
