"use client";

import CallAgent from "@/components/CallAgent";
import { useState } from "react";

export default function Home() {
  const [demoType, setDemoType] = useState("bill-chaser");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 relative">
      <a
        href="https://meetings-ap1.hubspot.com/katie-mcrae"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Request More Information
      </a>
      <div className="mb-10 text-left min-w-2xl">
        <img
          src="https://yabbr.com.au/assets/yabbr-logo-blue.91a6ee06af1b.png"
          alt="Yabbr"
        />

        <p className="text-gray-600 mt-2">
          Enter a phone number to trigger an outbound demo call.
        </p>
      </div>
      <div className="w-full max-w-2xl grid grid-cols-2 gap-4">
        <CallAgent demoType={demoType} onDemoTypeChange={setDemoType} />
        {demoType === "bill-chaser" && (
          <div className="bg-gray-200 rounded-3xl p-4 text-sm">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">
              Demo Scenario
            </h2>
            <p className="text-black">
              <strong>Name:</strong> Homer Simpson
            </p>
            <p className="text-black">
              <strong>Date of Birth:</strong> 12 May 1956
            </p>
            <p className="text-black">
              <strong>Address:</strong> 742 Evergreen Terrace, Springfield, IL
              62704
            </p>

            <p className="text-black">
              <strong>Debt:</strong> $250 with Anytime Fitness, due on 1 August
              2025
            </p>
            <p className="text-black">
              <strong>Minimum payment plan amount:</strong> $25
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
