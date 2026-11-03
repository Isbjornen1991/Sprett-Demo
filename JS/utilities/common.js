function navigateTo(pageName) {
  model.app.currentPage = pageName;
  updateView();
}

function logoutUser() {
  model.app.loggedInUserId = null;
  model.app.currentPage = "startPage";
  updateView();
}

function displayUserName() {
  const loggedInUser = model.users.find(
    (user) => user.userId === model.app.loggedInUserId,
  );

  return loggedInUser ? loggedInUser.username : "Gjest";
}

function checkUserRights(userId) {
  let user = null;

  for (const u of model.users) {
    if (u.userId === userId) {
      user = u;
    }
  }

  if (user === null) return false;
  if (user.role === "admin") return false;

  if (user.isBookingAllowed !== true) return false;
  if (user.approved !== true) return false;
  if (user.activeBooking === true) return false;

  for (const membership of model.memberships) {
    if (membership.id === user.membershipType) {
      return membership.bookingAllowed;
    }
  }

  return false;
}

function formatDate(dateString) {
  if (!dateString || !dateString.includes("-")) return "-";

  const parts = dateString.split("-");
  const year = parts[0].slice(2);
  const month = parts[1];
  const day = parts[2];

  return `${day}.${month}.${year}`;
}

function cleanBookings() {
  const now = new Date();

  const expiredBookings = model.equipmentBookings.filter((booking) => {
    const [hours, minutes] = booking.endTime.replace(".", ":").split(":");
    const bookingDateTime = new Date(booking.date);
    bookingDateTime.setHours(Number(hours), Number(minutes), 0);

    return bookingDateTime < now;
  });

  if (expiredBookings.length === 0) return; 

  const expiredIds = expiredBookings.map((b) => b.bookingId);

  model.equipmentBookings = model.equipmentBookings.filter((booking) => {
    const [hours, minutes] = booking.endTime.replace(".", ":").split(":");
    const bookingDateTime = new Date(booking.date);
    bookingDateTime.setHours(Number(hours), Number(minutes), 0);
    return bookingDateTime >= now;
  });

  for (const user of model.users) {
    if (user.bookings && user.bookings.length > 0) {
      user.bookings = user.bookings.filter((bId) => !expiredIds.includes(bId));
    }
  }

  if (model.calender) {
    for (const day of model.calender) {
      if (day.equipBookings) {
        day.equipBookings = day.equipBookings.filter(
          (bId) => !expiredIds.includes(bId),
        );
      }
    }
  }
}

function isEventPast(event) {
  const date = event.endDate || event.startDate;
  if (!date) return false;

  const today = new Date().toISOString().slice(0, 10);
  return date < today;
}