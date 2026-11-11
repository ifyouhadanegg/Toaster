import Link from 'next/link';

export function ExperiencePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-panel ring-1 ring-orange-100 sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-toastDark">Codename:PhewBar &middot; Toast demo</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">{title}</h1>
        <p className="mt-4 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-800">
          Coming soon
        </p>
        <p className="mt-5 text-base leading-7 text-stone-600">{description}</p>
        <Link href="/" className="mt-8 inline-flex font-bold text-toastDark hover:underline">
          &larr; Back to demo home
        </Link>
      </div>
    </main>
  );
}
