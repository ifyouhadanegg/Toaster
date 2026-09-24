export default async function RedeemPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-panel ring-1 ring-orange-100 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-orange-600">Codename:PhewBar</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">
          Thanks for testing the Toast experience on Codename:PhewBar
        </h1>
        <p className="mt-6 text-sm text-stone-500">Gift token</p>
        <p className="mt-1 break-all font-mono text-lg font-bold text-ink">{token}</p>
      </div>
    </main>
  );
}