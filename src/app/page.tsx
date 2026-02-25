import CallAgent from "@/components/CallAgent";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
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
        <CallAgent />
        <div className="bg-gray-200 rounded-3xl p-4 text-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">
            Identify Info
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
            <strong>Debt:</strong> $250 with Koala Bank, due on 1 August 2024
          </p>
          <p className="text-black">
            <strong>Minimum payment plan amount:</strong> $25
          </p>
        </div>
      </div>
    </main>
  );
}
