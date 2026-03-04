import { NextResponse } from "next/server";

/**
 * API Route to initiate an outbound call via ElevenLabs Agent using Twilio integration.
 * Requires ELEVENLABS_API_KEY, AGENT_ID, and TWILIO_PHONE_NUMBER_ID in environment variables.
 */
export async function POST(request: Request) {
  try {
    const { phoneNumber, demoType, dynamic_variables } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 },
      );
    }

    // Format phone number
    // Remove spaces, dashes, parentheses
    let formattedPhoneNumber = phoneNumber.replace(/[\s\-\(\)]/g, "");

    // If it starts with '0', replace with '+61' (Australia country code)
    if (formattedPhoneNumber.startsWith("0")) {
      formattedPhoneNumber = formattedPhoneNumber.replace(/^0/, "+61");
    }
    // If it starts with '61' but no '+', add the '+'
    else if (formattedPhoneNumber.startsWith("61")) {
      formattedPhoneNumber = "+" + formattedPhoneNumber;
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    const twilioPhoneNumberId = process.env.TWILIO_PHONE_NUMBER_ID;

    // Select agent ID based on demo type
    let agentId = process.env.AGENT_ID; // Default fallback

    if (demoType === "bill-chaser") {
      agentId = process.env.AGENT_ID_BILL_CHASER || agentId;
    } else if (demoType === "market-research") {
      agentId = process.env.AGENT_ID_MARKET_RESEARCH || agentId;
    } else if (demoType === "dynamic-id") {
      agentId = process.env.AGENT_ID_DYNAMIC_ID || agentId;
    }

    if (!apiKey || !agentId || !twilioPhoneNumberId) {
      console.error("Missing environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const payload: {
      agent_id: string;
      agent_phone_number_id: string;
      to_number: string;
      conversation_initiation_client_data?: {
        dynamic_variables: Record<string, string | number | boolean>;
      };
    } = {
      agent_id: agentId,
      agent_phone_number_id: twilioPhoneNumberId,
      to_number: formattedPhoneNumber,
    };

    if (dynamic_variables) {
      payload.conversation_initiation_client_data = {
        dynamic_variables,
      };
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
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Failed to place call" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error placing call:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
