function drawBookingOverviewScreen(){
    const loggedInUser = model.users.find(user => user.userId === model.app.loggedInUserId);
    const usernameToShow = loggedInUser ? loggedInUser.username : "kunde";

    let html = /*HTML*/`
    <div class="userLayout">
    
    
<div class="front-header">
    <div class="profile-picture">
    <h1>Sprett</h1>
    <p>Velkommen, ${usernameToShow}!</p>
    <p>Sal medlem</p>
</div>

<div class="user.nav">
    <button onclick="navigateTo('loggedInPage')">Hjem</button>
    <button class="selected" onclick="navigateTo('bookingPage')">Booking</button>
    <button onclick="navigateTo('bulletinPage')">Oppslag</button>
    <button onclick="navigateTo('profilePage')">profil</button>
</div>

    <div class="userContentArea">

    <div class="info-box">
    <h3>Din nåværende Reservasjoner</h3>
    
    <div class="reservation-row">
        her kommer en booking...
    </div>
</div>

<div class="info-box">
<h3>Din nåværende påmeldinger</h3>
    <div class="reservation-row">
    Her kommer en påmelding
    </div>
</div>
    


        </div>
    </div>
    `;
    
    return html;
}
    
    
    

