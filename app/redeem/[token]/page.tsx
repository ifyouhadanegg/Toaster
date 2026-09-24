import Link from 'next/link';

export default function RedeemPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-panel ring-1 ring-orange-100 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-orange-600">Codename:PhewBar</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
          Thanks for testing the Toast experience on Codename:PhewBar
        </h1>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          Back to the demo
        </Link>
      </div>
    </main>
  );
}