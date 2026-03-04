"use client";

import { useState } from "react";

type VerifyCandidateInput = {
  first_name: string;
  last_name: string;
  name: string;
  dob: string;
  address: string;
};

type VerifyResponse =
  | { verified: boolean; accuracy: number }
  | { error: string };

export default function VerifyPage() {
  const [form, setForm] = useState<VerifyCandidateInput>({
    first_name: "",
    last_name: "",
    name: "",
    dob: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerifyResponse | null>(null);

  const updateField = (field: keyof VerifyCandidateInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as VerifyResponse;

      if (!response.ok) {
        const error =
          "error" in data && typeof data.error === "string"
            ? data.error
            : "Request failed";
        setResult({ error });
        return;
      }

      setResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Request failed";
      setResult({ error: message });
    } finally {
      setIsLoading(false);
    }
  };

  const fillExample = () => {
    setForm({
      first_name: "Bob",
      last_name: "Knollys",
      name: "Bob Knollys",
      dob: "May 1, 1980",
      address: "742 Evergreen Terrace, Sydney, NSW 2000",
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-left">
          <h1 className="text-3xl font-bold text-gray-800">Verify API Test</h1>
          <p className="text-gray-600 mt-2">
            Submit candidate details to{" "}
            <span className="font-mono">/api/verify</span> and view the
            response.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  value={form.first_name}
                  onChange={(e) => updateField("first_name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black"
                  placeholder="Bob"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  value={form.last_name}
                  onChange={(e) => updateField("last_name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black"
                  placeholder="Knollys"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Name (Full)
                </label>
                <input
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black"
                  placeholder="Bob Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  DOB
                </label>
                <input
                  value={form.dob}
                  onChange={(e) => updateField("dob", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black"
                  placeholder="May 1, 1980"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Address
              </label>
              <input
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black"
                placeholder="742 Evergreen Terrace, Sydney, NSW 2000"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 px-4 rounded-md text-white font-medium transition-colors ${
                  isLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </button>

              <button
                type="button"
                onClick={fillExample}
                disabled={isLoading}
                className="py-2 px-4 rounded-md border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Fill Example
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Agent Response
          </h2>
          {result ? (
            <pre className="text-sm bg-gray-900 text-gray-100 rounded-md p-4 overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-600 text-sm">
              Submit the form to see the API response.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
