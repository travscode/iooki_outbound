import { NextResponse } from "next/server";

/**
 * API Route to initiate an outbound call via ElevenLabs Agent using Twilio integration.
 * Requires ELEVENLABS_API_KEY, AGENT_ID, and TWILIO_PHONE_NUMBER_ID in environment variables.
 */
export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const agentId = process.env.AGENT_ID;
    const twilioPhoneNumberId = process.env.TWILIO_PHONE_NUMBER_ID;

    if (!apiKey || !agentId || !twilioPhoneNumberId) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Call ElevenLabs API
    const response = await fetch(
      "https://api.elevenlabs.io/v1/convai/twilio/outbound-call",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          agent_id: agentId,
          agent_phone_number_id: twilioPhoneNumberId,
          to_number: phoneNumber,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("ElevenLabs API Error:", errorData);
      return NextResponse.json(
        { error: errorData.message || "Failed to place call with ElevenLabs" },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log("ElevenLabs API Response:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error placing call:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
