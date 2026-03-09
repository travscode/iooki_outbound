"use client";

import CallAgent from "@/components/CallAgent";
import { useState } from "react";
import { cn } from "@/utils/utils";

export default function Home() {
  const [demoType, setDemoType] = useState("");

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-10 text-left max-w-2xl">
        <h1 className="text-3xl font-bold">Voice Demo</h1>

        <p className="text-gray-600 mt-2">
          Enter a phone number to trigger an outbound voice call.
        </p>
      </div>
      <div
        className={cn(
          "w-full max-w-2xl grid grid-cols-1 gap-4",
          demoType === "bill-chaser" && "grid-cols-2",
        )}
      >
        <CallAgent
          demoType={demoType}
          onDemoTypeChange={setDemoType}
          className={demoType !== "bill-chaser" ? "max-w-2xl" : ""}
        />
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
