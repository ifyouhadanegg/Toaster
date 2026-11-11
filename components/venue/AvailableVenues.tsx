'use client';

import { useEffect, useState } from 'react';
import { VenueList } from '@/components/venue/VenueList';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { loadVenues } from '@/lib/toast-client/venues';
import type { Venue } from '@/lib/schemas/venue';

export function AvailableVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadVenues()
      .then((data) => {
        if (!cancelled) setVenues(data.venues);
      })
      .catch((exception) => {
        if (!cancelled) setError(exception instanceof Error ? exception.message : 'Failed to load locations.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="space-y-4" aria-labelledby="available-locations-heading">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-toastDark">Explore the area</p>
        <h2 id="available-locations-heading" className="mt-1 text-xl font-black text-ink">App-enabled locations in Pacific Beach</h2>
        <p className="mt-2 text-sm text-stone-600">These demo merchants are available in Pacific Beach, San Diego.</p>
      </div>
      {error ? <ErrorState message={error} /> : null}
      {loading ? <LoadingState label="Loading locations..." /> : null}
      {!loading && !error && venues.length === 0 ? <p className="text-sm text-stone-600">No app-enabled locations are available in this area yet.</p> : null}
      {venues.length > 0 ? <VenueList venues={venues} /> : null}
    </section>
  );
}
