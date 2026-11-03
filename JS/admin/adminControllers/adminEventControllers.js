function saveNewEvent() {
  const pageState = model.viewState.adminCreateEventPage;

  if (!pageState.title) {
    alert("Arrangementet må ha en tittel!");
    return;
  }

  const newId =
    pageState.eventID !== null && pageState.eventID !== undefined
      ? pageState.eventID
      : model.events.length;

  const newEvent = {
    id: newId,
    title: pageState.title,
    description: pageState.description,
    startDate: pageState.startDate,
    endDate: pageState.endDate,
    startTime: pageState.startTime,
    endTime: pageState.endTime,
    maxParticipants: pageState.maxParticipants,
    reservedRoom:
      pageState.reservedRoom !== null ? [pageState.reservedRoom] : [],
    signups: [],
    isArchived: false,
  };

  model.events.push(newEvent);

  if (pageState.startDate) {
    let calEntry = model.calender.find((c) => c.date === pageState.startDate);
    if (calEntry) {
      calEntry.eventIds.push(newId);
    } else {
      model.calender.push({
        date: pageState.startDate,
        eventIds: [newId],
        equipBookings: [],
      });
    }
  }

  model.viewState.adminCreateEventPage = {
    title: "",
    description: "",
    type: null,
    maxParticipants: 30,
    startTime: null,
    endTime: null,
    startDate: null,
    endDate: null,
    reservedRoom: null,
    eventID: null,
  };

  updateView();
}

function createHourOptions(selectedValue) {
  const hours = [
    "06.00",
    "06.15",
    "06.30",
    "06.45",
    "07.00",
    "07.15",
    "07.30",
    "07.45",
    "08.00",
    "08.15",
    "08.30",
    "08.45",
    "09.00",
    "09.15",
    "09.30",
    "09.45",
    "10.00",
    "10.15",
    "10.30",
    "10.45",
    "11.00",
    "11.15",
    "11.30",
    "11.45",
    "12.00",
    "12.15",
    "12.30",
    "12.45",
    "13.00",
    "13.15",
    "13.30",
    "13.45",
    "14.00",
    "14.15",
    "14.30",
    "14.45",
    "15.00",
    "15.15",
    "15.30",
    "15.45",
    "16.00",
    "16.15",
    "16.30",
    "16.45",
    "17.00",
    "17.15",
    "17.30",
    "17.45",
    "18.00",
    "18.15",
    "18.30",
    "18.45",
    "19.00",
    "19.15",
    "19.30",
    "19.45",
    "20.00",
    "20.15",
    "20.30",
    "20.45",
    "21.00",
    "21.15",
    "21.30",
    "21.45",
    "22.00",
    "22.15",
    "22.30",
    "22.45",
    "23.00",
    "23.15",
    "23.30",
    "23.45",
    "24.00",
  ];

  let options = `<option value="">Velg tid...</option>`;
  for (const hour of hours) {
    const isSelected = selectedValue === hour ? "selected" : "";
    options += `<option value="${hour}" ${isSelected}>${hour}</option>`;
  }
  return options;
}

function setCalenderTab(tabName) {
  model.viewState.adminCalenderPage.selectedTab = tabName;
  updateView();
}

function setCalenderDate(date) {
  model.viewState.adminCalenderPage.selectedDate = date;
  updateView();
}

function selectEvent(eventId) {
  model.viewState.adminCalenderPage.selectedEventId = eventId;
  updateView();
}

function getSelectedEvent() {
  const state = model.viewState.adminCalenderPage;

  for (const event of model.events) {
    if (event.id == state.selectedEventId) {
      return event;
    }
  }

  return null;
}

function getUsername(userId) {
  for (const user of model.users) {
    if (user.userId === userId) {
      return user.username;
    }
  }

  return "Ukjent bruker";
}

function getEquipmentName(equipmentId) {
  for (const item of model.equipment) {
    if (item.id === equipmentId) {
      return item.name;
    }
  }

  return "Ukjent utstyr";
}

function getRoomName(roomIds) {
  for (const room of model.rooms) {
    if (roomIds.includes(room.id)) {
      return room.name;
    }
  }

  return "Ingen sal";
}

function generateCalendarEntries() {
  model.calender = model.calender || [];

  for (const event of model.events) {
    if (event.isArchived || !event.startDate) continue;

    let dayEntry = model.calender.find((c) => c.date === event.startDate);

    if (dayEntry) {
      if (!dayEntry.eventIds.includes(event.id)) {
        dayEntry.eventIds.push(event.id);
      }
    } else {
      model.calender.push({
        date: event.startDate,
        eventIds: [event.id],
        equipBookings: [],
      });
    }
  }

  for (const booking of model.equipmentBookings) {
    if (!booking.date) continue;

    let dayEntry = model.calender.find((c) => c.date === booking.date);

    if (dayEntry) {
      if (!dayEntry.equipBookings.includes(booking.bookingId)) {
        dayEntry.equipBookings.push(booking.bookingId);
      }
    } else {
      model.calender.push({
        date: booking.date,
        eventIds: [],
        equipBookings: [booking.bookingId],
      });
    }
  }

  // Optional: Sort calendar chronologically by date
  model.calender.sort((a, b) => new Date(a.date) - new Date(b.date));
}