# Connecting RSVP to Google Sheets

To automatically save your RSVP form submissions to a Google Sheet, follow these simple steps using Google Apps Script.

---

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Rename the first sheet tab to **RSVPs** (or leave it as default "Sheet1").
3. Create the headers in the first row (Row 1):
   * **Column A**: Timestamp
   * **Column B**: Full Name
   * **Column C**: Phone Number
   * **Column D**: Attending
   * **Column E**: Guest Count
   * **Column F**: Special Note

---

## Step 2: Open the Apps Script Editor
1. In your Google Sheet menu, click on **Extensions** > **Apps Script**.
2. Delete any default code in the script editor.

---

## Step 3: Paste the Integration Script
Paste the following code into the script editor (`Code.gs`):

```javascript
function doPost(e) {
  try {
    // Open the spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Extract variables matching the fields sent from our Next.js backend
    var timestamp = data.timestamp || new Date().toISOString();
    var fullName = data.fullName || "";
    var phoneNumber = data.phoneNumber || "";
    var attending = data.attending || "";
    var guestCount = data.guestCount || 1;
    var specialNote = data.specialNote || "";
    
    // Append a new row to the sheet
    sheet.appendRow([
      timestamp,
      fullName,
      phoneNumber,
      attending,
      guestCount,
      specialNote
    ]);
    
    // Return a successful JSON response
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    // Return error message if anything fails
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Step 4: Deploy as a Web App
1. Click the **Save** icon (disk symbol).
2. Click the blue **Deploy** button at the top-right and select **New deployment**.
3. Click the gear icon next to "Select type" and select **Web app**.
4. Configure the deployment settings:
   * **Description**: `Wedding RSVP Webhook`
   * **Execute as**: `Me (your-email@gmail.com)`
   * **Who has access**: `Anyone` (Crucial so our server can send requests to it).
5. Click **Deploy**.
6. Google will request authorization. Click **Authorize access**, log in with your Google account, click **Advanced**, and then click **Go to Untitled project (unsafe)** to allow permissions.
7. Copy the **Web app URL** provided in the deployment confirmation dialog. It should look like:
   `https://script.google.com/macros/s/.../exec`

---

## Step 5: Configure Next.js Environmental Variable
1. Create a file named `.env.local` in the root of your project: `/Users/maryamnawas/Desktop/Wedding invitation/.env.local`
2. Add your deployment URL to the file like this:
   ```env
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/PASTE_YOUR_WEB_APP_URL_HERE/exec
   ```
3. Restart your Next.js development server to load the environment variables:
   ```bash
   npm run dev
   ```

---

## Local Database Backup
Every RSVP submitted is also automatically saved as a fallback to a local file in your project directory at:
[src/data/rsvp_responses.json](file:///Users/maryamnawas/Desktop/Wedding%20invitation/src/data/rsvp_responses.json)

This ensures you will never lose any responses if the network or Google Sheet configuration fails.
