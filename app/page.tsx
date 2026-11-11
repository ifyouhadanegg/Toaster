import Link from 'next/link';

const experiences = [
  {
    number: '01',
    title: 'User experience',
    description: 'Share a celebration, switch between friends, and explore the gifting flow.',
    href: '/user',
    status: 'Ready to explore',
    action: 'Explore the user experience'
  },
  {
    number: '02',
    title: 'Merchant experience',
    description: 'A future home for the merchant side of the Toast integration.',
    href: '/merchant',
    status: 'Coming soon',
    action: 'View merchant placeholder'
  },
  {
    number: '03',
    title: 'PhewBar admin experience',
    description: 'A future home for the PhewBar administration experience.',
    href: '/admin',
    status: 'Coming soon',
    action: 'View admin placeholder'
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#ff7a1a_0%,#ff5f00_100%)] px-6 py-10 text-white shadow-panel ring-1 ring-orange-300 sm:px-10 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-orange-100">Toast integration demo</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">Codename:PhewBar</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-orange-50 sm:text-lg">
          Welcome to our Codename:PhewBar demo site for Toast integration. Choose an experience to see how it all comes together.
        </p>
      </section>

      <section className="py-10 sm:py-12" aria-labelledby="experiences-heading">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-toastDark">The demo</p>
        <h2 id="experiences-heading" className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
          Choose an experience
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
          Explore the user celebration and gifting flow, or preview what&apos;s coming for merchants and PhewBar administrators.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {experiences.map((experience) => (
            <article key={experience.href} className="flex flex-col rounded-[1.5rem] border border-orange-200 bg-white p-6 shadow-panel">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-black text-toastDark">{experience.number}</span>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-800">
                  {experience.status}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-black text-ink">{experience.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-stone-600">{experience.description}</p>
              <Link href={experience.href} className="mt-6 inline-flex self-start font-bold text-toastDark hover:underline">
                {experience.action} <span aria-hidden="true" className="ml-2">&rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
