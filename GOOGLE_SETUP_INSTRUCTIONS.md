# Mission Remission Website - Google Integration Setup Guide

This guide will help you set up Google Drive Gallery and Google Calendar Events integration for the Mission Remission website.

## Prerequisites
- A Google Account
- Google Drive folder with photos
- Google Calendar with events

---

## Part 1: Google Drive Gallery Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name it "Mission Remission Website" and click "Create"

### Step 2: Enable Google Drive API
1. In the Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

### Step 3: Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key (you'll need this later)
4. Click "Restrict Key" to secure it:
   - Under "API restrictions", select "Restrict key"
   - Check "Google Drive API"
   - Click "Save"

### Step 4: Set Up Google Drive Folder
1. Go to [Google Drive](https://drive.google.com/)
2. Create a new folder or select an existing one for gallery photos
3. Right-click the folder → "Share" → "Get link"
4. Set permissions to "Anyone with the link can view"
5. Copy the folder URL (looks like: `https://drive.google.com/drive/folders/ABC123xyz...`)
6. Extract the folder ID (the part after `/folders/`) - this is your FOLDER_ID

### Step 5: Update gallery.js
1. Open `gallery.js` in a text editor
2. Find these lines near the top:
   ```javascript
   const GOOGLE_API_KEY = 'YOUR_API_KEY_HERE';
   const DRIVE_FOLDER_ID = 'YOUR_FOLDER_ID_HERE';
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual API key
4. Replace `YOUR_FOLDER_ID_HERE` with your folder ID
5. Save the file

---

## Part 2: Google Calendar Events Setup

### Step 1: Enable Google Calendar API
1. In the same Google Cloud project, go to "APIs & Services" → "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

### Step 2: Create API Key (if you haven't already)
1. If you already created an API key for Drive, you can reuse it
2. Go to "APIs & Services" → "Credentials"
3. Click on your existing API key
4. Under "API restrictions", also check "Google Calendar API"
5. Click "Save"

OR create a new API key following the same steps as Part 1, Step 3

### Step 3: Make Your Calendar Public
1. Go to [Google Calendar](https://calendar.google.com/)
2. Click the three dots next to your calendar → "Settings and sharing"
3. Scroll to "Access permissions"
4. Check "Make available to public"
5. Click "Get shareable link" to verify it's public

### Step 4: Get Your Calendar ID
1. Still in Calendar Settings, scroll down to "Integrate calendar"
2. Copy the "Calendar ID" (usually looks like your email address or a long string ending in @group.calendar.google.com)

### Step 5: Update events.js
1. Open `events.js` in a text editor
2. Find these lines near the top:
   ```javascript
   const GOOGLE_CALENDAR_API_KEY = 'YOUR_API_KEY_HERE';
   const CALENDAR_ID = 'YOUR_CALENDAR_ID_HERE';
   ```
3. Replace `YOUR_API_KEY_HERE` with your API key (can be the same as gallery)
4. Replace `YOUR_CALENDAR_ID_HERE` with your calendar ID
5. Save the file

---

## Part 3: Test Your Integration

### Testing Gallery
1. Upload some images to your Google Drive folder
2. Open `gallery.html` in your browser
3. You should see your photos loaded in a grid
4. Click on any photo to view it in the lightbox

### Testing Events
1. Add some events to your Google Calendar
2. Make sure they are in the future
3. Open `events.html` in your browser
4. You should see your upcoming events listed

---

## Troubleshooting

### Gallery Not Loading
- **Error: "Unable to load gallery"**
  - Check that your API key and folder ID are correct
  - Verify the folder is set to "Anyone with the link can view"
  - Check browser console (F12) for specific error messages

- **Photos not appearing**
  - Make sure photos are image files (jpg, png, gif, etc.)
  - Check that files are directly in the folder (not in subfolders)
  - Wait a few minutes for Google Drive to process new uploads

### Events Not Loading
- **Error: "Unable to load events"**
  - Verify your API key and calendar ID are correct
  - Make sure the calendar is set to public
  - Check that you have upcoming events (past events won't show)

- **Events showing but missing details**
  - Add event descriptions and locations in Google Calendar
  - Some fields are optional and won't show if not filled

### API Key Issues
- **"API key not valid" error**
  - Make sure you enabled both Drive API and Calendar API
  - Check that API restrictions include the correct APIs
  - Try regenerating the API key if issues persist

### Quota Limits
- Free tier includes:
  - 10,000 requests per day for Drive API
  - 1,000,000 requests per day for Calendar API
- For a small campaign website, this is more than enough

---

## Security Best Practices

1. **Restrict API Key**: Always restrict your API key to only the APIs you need
2. **HTTP Referrer Restrictions**: Consider adding your website domain to the API key restrictions
3. **Monitor Usage**: Check the Google Cloud Console periodically for unusual activity
4. **Don't Share API Keys**: Keep your API keys private and never commit them to public repositories

---

## Automatic Updates

Once set up correctly:
- **Gallery**: New photos uploaded to the Google Drive folder will automatically appear on the website (may take a few minutes to refresh)
- **Events**: New events added to Google Calendar will automatically show up on the events page
- **No manual website updates needed!**

---

## Support

If you encounter issues:
1. Check the browser console (F12 → Console tab) for error messages
2. Verify all IDs and API keys are copied correctly (no extra spaces)
3. Make sure both the Drive folder and Calendar are set to public

For more help:
- [Google Drive API Documentation](https://developers.google.com/drive/api/v3/about-sdk)
- [Google Calendar API Documentation](https://developers.google.com/calendar/api/guides/overview)
