import { NextResponse } from "next/server";

type CandidateInput = {
  first_name?: string;
  last_name?: string;
  name?: string;
  dob?: string;
  address?: string;
};

type ReferenceData = {
  name: string;
  dob: string;
  address: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let name = body.name;
    if ((!name || name.trim() === "") && body.first_name && body.last_name) {
      name = `${body.first_name} ${body.last_name}`;
    }

    const candidate: CandidateInput = {
      first_name: body.first_name,
      last_name: body.last_name,
      name,
      dob: body.dob,
      address: body.address,
    };

    const reference: ReferenceData = body.reference ?? {
      name: "Bob Knollys",
      dob: "May 1, 1980",
      address: "742 Evergreen Terrace, Sydney, NSW 2000",
    };

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 },
      );
    }

    const systemPrompt =
      "You verify identity by comparing a candidate with a reference record. " +
      "Use robust fuzzy matching across name, date of birth, and address. " +
      "Consider nicknames, middle names, initials, punctuation, casing, spacing, " +
      "common abbreviations (St↔Street, Rd↔Road, Apt↔Apartment), and date formats. " +
      "Weigh all fields; a strong match on multiple fields increases confidence. " +
      "Return ONLY a strict JSON object with keys: verified (boolean), accuracy (float 0-1), " +
      "name_accuracy (float 0-1), dob_accuracy (float 0-1), and address_accuracy (float 0-1). " +
      "Do not include explanations or extra fields. " +
      "Example JSON response: " +
      '{"verified": true, "accuracy": 0.95, "name_accuracy": 0.98, "dob_accuracy": 1.0, "address_accuracy": 0.85}';

    const userContent = JSON.stringify({
      reference,
      candidate,
      instructions: {
        scoring: {
          name: "Assess full-name equivalence; allow common nicknames and middle names.",
          dob: "Accept equivalent dates across formats; prefer exact match.",
          address:
            "Normalize common abbreviations; tolerate minor punctuation and spacing differences.",
        },
        output: {
          verified:
            "true if overall identity plausibly matches; false otherwise.",
          accuracy:
            "confidence score between 0 and 1 reflecting overall match strength.",
          name_accuracy: "confidence score between 0 and 1 for name match.",
          dob_accuracy: "confidence score between 0 and 1 for DOB match.",
          address_accuracy:
            "confidence score between 0 and 1 for address match.",
        },
      },
    });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.error?.message || "OpenAI request failed" },
        { status: response.status },
      );
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content ?? "{}";

    let parsed: {
      verified?: boolean;
      accuracy?: number;
      name_accuracy?: number;
      dob_accuracy?: number;
      address_accuracy?: number;
    } = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = {};
    }

    const verified =
      typeof parsed.verified === "boolean" ? parsed.verified : false;
    let accuracy =
      typeof parsed.accuracy === "number"
        ? parsed.accuracy
        : verified
          ? 0.7
          : 0.3;

    if (!Number.isFinite(accuracy)) accuracy = verified ? 0.7 : 0.3;
    if (accuracy < 0) accuracy = 0;
    if (accuracy > 1) accuracy = 1;

    const name_accuracy =
      typeof parsed.name_accuracy === "number" ? parsed.name_accuracy : 0;
    const dob_accuracy =
      typeof parsed.dob_accuracy === "number" ? parsed.dob_accuracy : 0;
    const address_accuracy =
      typeof parsed.address_accuracy === "number" ? parsed.address_accuracy : 0;

    return NextResponse.json({
      verified,
      accuracy,
      name_accuracy,
      dob_accuracy,
      address_accuracy,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
