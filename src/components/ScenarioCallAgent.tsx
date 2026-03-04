"use client";

import { useState } from "react";
import { Person } from "@/data/scenarios";

interface ScenarioCallAgentProps {
  selectedPerson: Person | null;
}

export default function ScenarioCallAgent({
  selectedPerson,
}: ScenarioCallAgentProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPerson) {
      setStatus({ type: "error", message: "Please select a scenario first." });
      return;
    }

    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const dynamic_variables = {
        first_name: selectedPerson.firstName,
        last_name: selectedPerson.lastName,
        dob: selectedPerson.dob,
        address: selectedPerson.address,
        name: `${selectedPerson.firstName} ${selectedPerson.lastName}`,

        debt_amount: selectedPerson.debtAmount,
        creditor: selectedPerson.creditor,
        min_payment: selectedPerson.minPayment,
        debt_due_date: selectedPerson.debtDueDate,
        // Passing the full name as well if needed
      };

      const response = await fetch("/api/make-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          demoType: "dynamic-id", // Assuming bill-chaser for this scenario
          dynamic_variables,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to place call");
      }

      setStatus({ type: "success", message: "Call initiated successfully!" });
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <form onSubmit={handleCall} className="space-y-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            Your Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="0400 000 000"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter your number to receive the call acting as the selected person.
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !selectedPerson}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            isLoading || !selectedPerson
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {isLoading ? "Calling..." : "Initiate Scenario Call"}
        </button>
      </form>

      {status.message && (
        <div
          className={`mt-4 p-3 rounded-md text-sm ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}
