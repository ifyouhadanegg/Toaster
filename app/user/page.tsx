'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { GiftingFlow } from '@/components/order/GiftingFlow';
import { AvailableVenues } from '@/components/venue/AvailableVenues';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import {
  areFriends,
  celebrationSchema,
  celebrationsSchema,
  celebrationsStorageKey,
  demoArea,
  demoUsers,
  type Celebration,
  type DemoUserId
} from '@/lib/demo/celebrations';

export default function UserPage() {
  const [activeUserId, setActiveUserId] = useState<DemoUserId>('lauren');
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [giftRecipientId, setGiftRecipientId] = useState<DemoUserId | null>(null);
  const [browseGifts, setBrowseGifts] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(celebrationsStorageKey);
      if (saved !== null) {
        setCelebrations(celebrationsSchema.parse(JSON.parse(saved)).map((celebration) => ({ ...celebration, location: demoArea })));
      }
      setStorageReady(true);
    } catch {
      setStorageError('Could not load saved celebrations from this browser. Check your browser storage settings or clear the demo data before trying again.');
    }
  }, []);

  const activeUser = demoUsers.find((user) => user.id === activeUserId)!;
  const ownCelebration = celebrations.find((celebration) => celebration.userId === activeUserId);
  const friendCelebrations = celebrations.filter((celebration) => areFriends(activeUserId, celebration.userId));
  const recipient = demoUsers.find((user) => user.id === giftRecipientId);

  function saveCelebrations(next: Celebration[]): boolean {
    try {
      localStorage.setItem(celebrationsStorageKey, JSON.stringify(next));
      setCelebrations(next);
      setStorageError(null);
      return true;
    } catch {
      setStorageError('Could not save your celebration in this browser. Check your browser storage settings and try again.');
      return false;
    }
  }

  function changeUser(userId: DemoUserId) {
    setActiveUserId(userId);
    setEditing(false);
    setFormError(null);
    setMessage('');
    setLocation('');
    setGiftRecipientId(null);
    setBrowseGifts(false);
  }

  function startEditing() {
    setMessage(ownCelebration?.message ?? '');
    setLocation(ownCelebration?.location ?? '');
    setFormError(null);
    setEditing(true);
  }

  function submitCelebration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = celebrationSchema.safeParse({ userId: activeUserId, message, location });
    if (!result.success || location !== demoArea) {
      setFormError('Please tell your friends what you are celebrating and where you are.');
      return;
    }
    if (saveCelebrations([...celebrations.filter((celebration) => celebration.userId !== activeUserId), result.data])) {
      setEditing(false);
      setFormError(null);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="mb-5 inline-flex text-sm font-bold text-toastDark hover:underline">
        &larr; Back to demo home
      </Link>
      <header className="rounded-[2rem] bg-[linear-gradient(135deg,#ff7a1a_0%,#ff5f00_100%)] px-6 py-8 text-white shadow-panel ring-1 ring-orange-300 sm:px-10 sm:py-10">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-orange-100">Codename:PhewBar &middot; User experience</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Celebrate together.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
          Share your moment, see what your friends are celebrating, and send a little something their way.
        </p>
      </header>

      <details className="mt-5 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm">
        <summary className="cursor-pointer font-semibold text-toastDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-toast">
          Demo user: {activeUser.name} <span className="font-normal text-stone-600">&middot; Switch user</span>
        </summary>
        <div className="mt-4 max-w-xs">
          <label htmlFor="demo-user" className="mb-1 block font-bold text-ink">Demo user</label>
          <select id="demo-user" value={activeUserId} onChange={(event) => {
            const user = demoUsers.find((candidate) => candidate.id === event.target.value);
            if (user) changeUser(user.id);
          }} className="w-full rounded-xl border border-orange-300 bg-white px-4 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-toast">
            {demoUsers.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
          <p className="mt-2 text-xs text-stone-600">All five demo users are friends with each other.</p>
        </div>
      </details>

      <div className="mt-6 space-y-6">
        {storageError ? <ErrorState message={storageError} /> : null}
        <section className="rounded-[1.5rem] border border-orange-200 bg-white p-5 shadow-panel sm:p-6" aria-labelledby="your-moment-heading">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-toastDark">Your moment</p>
          <h2 id="your-moment-heading" className="mt-1 text-xl font-black text-ink">What are you celebrating, {activeUser.name}?</h2>
          {ownCelebration && !editing ? (
            <div className="mt-4 space-y-2">
              <p className="text-lg font-bold text-ink">{ownCelebration.message}</p>
              <p className="text-sm text-stone-600">{ownCelebration.location}</p>
              <p className="text-sm text-stone-600">Shared with your demo friends in this browser.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button type="button" variant="secondary" onClick={startEditing}>Edit celebration</Button>
                <Button type="button" variant="ghost" onClick={() => saveCelebrations(celebrations.filter((item) => item.userId !== activeUserId))}>End celebration</Button>
              </div>
            </div>
          ) : editing ? (
            <form onSubmit={submitCelebration} className="mt-5 max-w-xl space-y-4">
              {formError ? <p role="alert" className="text-sm font-semibold text-red-700">{formError}</p> : null}
              <div>
                <label htmlFor="celebration-message" className="mb-1 block text-sm font-bold text-ink">What are you celebrating?</label>
                <input id="celebration-message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={140} required placeholder="A promotion, a birthday, just because..." className="w-full rounded-xl border border-orange-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-toast" />
              </div>
              <div>
                <label htmlFor="celebration-location" className="mb-1 block text-sm font-bold text-ink">Where are you celebrating?</label>
                <select id="celebration-location" value={location} onChange={(event) => setLocation(event.target.value)} required className="w-full rounded-xl border border-orange-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-toast">
                  <option value="">Select an area</option>
                  <option value={demoArea}>{demoArea}</option>
                </select>
                <p className="mt-1 text-xs text-stone-500">Pacific Beach is the available demo area.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="submit">Share celebration</Button>
                <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </form>
          ) : (
            <div className="mt-4">
              <p className="text-sm leading-6 text-stone-600">Let your friends know what you&apos;re up to and where to celebrate with you.</p>
              <Button type="button" className="mt-4" onClick={startEditing} disabled={!storageReady}>I&apos;m Celebrating</Button>
            </div>
          )}
        </section>

        {((editing && location === demoArea) || (!editing && ownCelebration)) && !recipient && !browseGifts ? <AvailableVenues /> : null}

        <section className="rounded-[1.5rem] border border-orange-200 bg-white p-5 shadow-panel sm:p-6" aria-labelledby="friends-heading">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-toastDark">Your network</p>
          <h2 id="friends-heading" className="mt-1 text-xl font-black text-ink">Friends celebrating</h2>
          {friendCelebrations.length === 0 ? (
            <p className="mt-3 text-sm text-stone-600">No friends are celebrating yet. Switch users to share a moment.</p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {friendCelebrations.map((celebration) => {
                const friend = demoUsers.find((user) => user.id === celebration.userId)!;
                return (
                  <article key={friend.id} className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
                    <h3 className="font-black text-ink">{friend.name} is celebrating!</h3>
                    <p className="mt-2 text-sm text-ink">{celebration.message}</p>
                    <p className="mt-2 text-sm text-stone-600">{celebration.location}</p>
                    <Button type="button" className="mt-4" onClick={() => { setGiftRecipientId(friend.id); setBrowseGifts(false); }}>
                      Choose a gift for {friend.name}
                    </Button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {!recipient && !browseGifts ? (
          <Button type="button" variant="secondary" onClick={() => setBrowseGifts(true)}>Browse venues and gifts</Button>
        ) : null}
        {recipient || browseGifts ? (
          <GiftingFlow key={`${activeUserId}-${recipient?.id ?? 'browse'}`} recipient={recipient?.name} />
        ) : null}
      </div>
    </main>
  );
}
