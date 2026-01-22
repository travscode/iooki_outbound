import CallAgent from "@/components/CallAgent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Outbound Demo</h1>
        <p className="text-gray-600">
          Enter a phone number to trigger an outbound call.
        </p>
      </div>
      <CallAgent />
    </main>
  );
}
