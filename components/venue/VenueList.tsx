import type { Venue } from '@/lib/schemas/venue';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type VenueListProps = {
  venues: Venue[];
  selectedVenueId: string | null;
  onSelectVenue: (venueId: string) => void;
};

const kindLabels: Record<Venue['kind'], string> = {
  coffee_shop: 'Coffee shop',
  bar: 'Bar'
};

export function VenueList({ venues, selectedVenueId, onSelectVenue }: VenueListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {venues.map((venue) => (
        <Card key={venue.id} className={selectedVenueId === venue.id ? 'ring-2 ring-toast ring-offset-2 ring-offset-white' : ''}>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-toastDark">{kindLabels[venue.kind]}</p>
          <h3 className="mt-1 text-lg font-extrabold text-ink">{venue.name}</h3>
          <p className="mt-1 text-sm leading-6 text-stone-600">{venue.tagline}</p>
          <p className="mt-2 text-xs font-semibold text-stone-500">{venue.location}</p>
          <Button
            type="button"
            className="mt-4 w-full"
            variant={selectedVenueId === venue.id ? 'secondary' : 'primary'}
            onClick={() => onSelectVenue(venue.id)}
          >
            {selectedVenueId === venue.id ? 'Selected' : 'Choose venue'}
          </Button>
        </Card>
      ))}
    </div>
  );
}
