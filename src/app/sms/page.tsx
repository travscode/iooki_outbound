export default function SMSPage() {
  return (
    <div className="flex flex-1 flex-col">
      <iframe
        src="https://autocollectdemo.vercel.app/customers"
        className="flex-1 w-full border-none"
        title="SMS Demo"
      />
    </div>
  );
}
