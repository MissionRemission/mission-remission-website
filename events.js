/* ========================================
   GOOGLE CALENDAR EVENTS INTEGRATION
   ======================================== */

// SETUP INSTRUCTIONS:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable Google Calendar API
// 4. Create credentials (API Key)
// 5. Replace 'YOUR_API_KEY_HERE' below with your actual API key
// 6. In Google Calendar, make your calendar public:
//    - Go to calendar settings
//    - Under "Access permissions" check "Make available to public"
// 7. Get your Calendar ID from settings (usually your email or a specific ID)
// 8. Replace 'YOUR_CALENDAR_ID_HERE' below with your calendar ID

const GOOGLE_CALENDAR_API_KEY = 'AIzaSyDrHGEOjkN9gikDRKPSF7UEYXKOFh9RiMA';
const CALENDAR_ID = '8ff1bbe4d78ba18405d670baca0c3ddb01da5dbbd361ec2aaacd021ccd2c2053@group.calendar.google.com'; // Usually your email address

// Load upcoming events from Google Calendar
async function loadUpcomingEvents() {
    const loadingMessage = document.getElementById('loading-message');
    const eventsList = document.getElementById('events-list');
    const noEvents = document.getElementById('no-events');
    const errorMessage = document.getElementById('error-message');

    // Check if API key and calendar ID are configured
    if (GOOGLE_CALENDAR_API_KEY === 'YOUR_API_KEY_HERE' || CALENDAR_ID === 'YOUR_CALENDAR_ID_HERE') {
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        const now = new Date().toISOString();
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${now}&maxResults=10&singleEvents=true&orderBy=startTime`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        const events = data.items || [];

        loadingMessage.style.display = 'none';

        if (events.length === 0) {
            noEvents.style.display = 'block';
            return;
        }

        // Display events
        events.forEach(event => {
            const eventCard = createEventCard(event);
            eventsList.appendChild(eventCard);
        });

    } catch (error) {
        console.error('Error loading events:', error);
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}

// Create event card HTML
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';

    const startDate = event.start.dateTime || event.start.date;
    const endDate = event.end.dateTime || event.end.date;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const isAllDay = !event.start.dateTime;

    // Format date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = start.toLocaleDateString('en-US', dateOptions);

    // Format time
    let timeString = '';
    if (!isAllDay) {
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const startTime = start.toLocaleTimeString('en-US', timeOptions);
        const endTime = end.toLocaleTimeString('en-US', timeOptions);
        timeString = `${startTime} - ${endTime}`;
    } else {
        timeString = 'All Day';
    }

    // Create card content
    card.innerHTML = `
        <div class="event-date-badge">
            <div class="event-month">${start.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</div>
            <div class="event-day">${start.getDate()}</div>
        </div>
        <div class="event-details">
            <h3 class="event-title">${event.summary || 'Untitled Event'}</h3>
            <div class="event-meta">
                <div class="event-date-time">
                    <span class="event-icon">📅</span>
                    <span>${formattedDate}</span>
                </div>
                <div class="event-time">
                    <span class="event-icon">🕐</span>
                    <span>${timeString}</span>
                </div>
                ${event.location ? `
                <div class="event-location">
                    <span class="event-icon">📍</span>
                    <span>${event.location}</span>
                </div>
                ` : ''}
            </div>
            ${event.description ? `
            <p class="event-description">${event.description}</p>
            ` : ''}
            ${event.htmlLink ? `
            <a href="${event.htmlLink}" target="_blank" class="btn-event-details">View in Google Calendar</a>
            ` : ''}
        </div>
    `;

    return card;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadUpcomingEvents();
});
