"use client";

import { useState } from "react";
import ScenarioCallAgent from "@/components/ScenarioCallAgent";
import { SCENARIOS } from "@/data/scenarios";

export default function DemoScenarios() {
  const [selectedPersonId, setSelectedPersonId] = useState<string>(
    SCENARIOS[0].id,
  );

  const selectedPerson =
    SCENARIOS.find((p) => p.id === selectedPersonId) || SCENARIOS[0];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-10 text-left min-w-2xl">
        <img
          src="https://yabbr.com.au/assets/yabbr-logo-blue.91a6ee06af1b.png"
          alt="Yabbr"
          className="mb-4"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Outbound Scenarios
        </h1>
        <p className="text-gray-600">
          Select a persona to simulate an outbound call with specific
          verification data.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <label
              htmlFor="persona-select"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Select Persona
            </label>
            <select
              id="persona-select"
              value={selectedPersonId}
              onChange={(e) => setSelectedPersonId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black bg-white"
            >
              {SCENARIOS.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.firstName} {person.lastName} - ${person.debtAmount}{" "}
                  Debt
                </option>
              ))}
            </select>
          </div>

          <ScenarioCallAgent selectedPerson={selectedPerson} />
        </div>

        <div className="bg-gray-200 rounded-3xl p-6 text-sm h-fit">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Scenario Details
          </h2>

          <div className="space-y-3">
            <p className="text-black text-lg">
              <strong className="block text-gray-600 text-xs uppercase tracking-wide">
                Name
              </strong>
              {selectedPerson.firstName} {selectedPerson.lastName}
            </p>
            <p className="text-black text-lg">
              <strong className="block text-gray-600 text-xs uppercase tracking-wide">
                Date of Birth
              </strong>
              {selectedPerson.dob}
            </p>
            <p className="text-black text-lg">
              <strong className="block text-gray-600 text-xs uppercase tracking-wide">
                Phone (Mock)
              </strong>
              {selectedPerson.phone}
            </p>
            <p className="text-black text-lg">
              <strong className="block text-gray-600 text-xs uppercase tracking-wide">
                Address
              </strong>
              {selectedPerson.address}
            </p>

            <div className="border-t border-gray-300 my-4 pt-4 space-y-3">
              <p className="text-black text-lg">
                <strong className="block text-gray-600 text-xs uppercase tracking-wide">
                  Debt Amount
                </strong>
                ${selectedPerson.debtAmount}
              </p>
              <p className="text-black text-lg">
                <strong className="block text-gray-600 text-xs uppercase tracking-wide">
                  Creditor
                </strong>
                {selectedPerson.creditor}
              </p>
              <p className="text-black text-lg">
                <strong className="block text-gray-600 text-xs uppercase tracking-wide">
                  Debt Due Date
                </strong>
                {selectedPerson.debtDueDate}
              </p>
              <p className="text-black text-lg">
                <strong className="block text-gray-600 text-xs uppercase tracking-wide">
                  Minimum Payment
                </strong>
                ${selectedPerson.minPayment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
