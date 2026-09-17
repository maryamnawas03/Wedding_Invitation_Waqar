import { NextRequest, NextResponse } from "next/server";
import { RsvpFormData, RsvpApiResponse } from "@/types/wedding";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest): Promise<NextResponse<RsvpApiResponse>> {
  try {
    const body: RsvpFormData = await req.json();

    // Validation
    if (!body.fullName || !body.phoneNumber || !body.attending) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields (Name, Phone, Attending)." },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      attending: body.attending === "yes" ? "Attending" : "Declined",
      guestCount: body.guestCount || 1,
      specialNote: body.specialNote || "",
    };

    // 1. Save locally to a JSON file as backup/database
    try {
      const dataFilePath = path.join(process.cwd(), "src/data/rsvp_responses.json");
      let responses: any[] = [];
      
      try {
        const fileContent = await fs.readFile(dataFilePath, "utf8");
        responses = JSON.parse(fileContent);
      } catch (readError) {
        // File doesn't exist or is empty, start fresh
      }

      // Check if this person has already submitted (by phone number) and update or add new
      const existingIndex = responses.findIndex(
        (r) => r.phoneNumber.replace(/\s+/g, "") === payload.phoneNumber.replace(/\s+/g, "")
      );

      if (existingIndex > -1) {
        responses[existingIndex] = payload;
      } else {
        responses.push(payload);
      }

      await fs.writeFile(dataFilePath, JSON.stringify(responses, null, 2), "utf8");
    } catch (localWriteError) {
      console.error("Failed to save RSVP response locally:", localWriteError);
    }

    // 2. Forward to Google Sheets Webhook URL if configured
    const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    console.log("🔗 Webhook URL configured:", !!googleSheetsWebhookUrl);
    console.log("🔗 Webhook URL value:", googleSheetsWebhookUrl);

    if (googleSheetsWebhookUrl) {
      try {
        const webhookRes = await fetch(googleSheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          redirect: "follow",
        });
        const responseText = await webhookRes.text();
        console.log("✅ Webhook response status:", webhookRes.status);
        console.log("✅ Webhook response body:", responseText.substring(0, 500));
      } catch (webhookError) {
        console.error("❌ Failed to forward RSVP to Google Sheets:", webhookError);
      }
    } else {
      console.warn("⚠️ No GOOGLE_SHEETS_WEBHOOK_URL set in .env.local");
    }

    return NextResponse.json(
      { success: true, message: "Thank you! Your RSVP has been received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("RSVP API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while processing your response." },
      { status: 500 }
    );
  }
}
