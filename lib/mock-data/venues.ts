import { menuResponseSchema, type MenuItem, type MenuResponse } from '@/lib/schemas/menu';
import { venuesResponseSchema, type Venue } from '@/lib/schemas/venue';

type VenueRecord = Venue & { phewBArItems: MenuItem[] };

const venueRecords: VenueRecord[] = [
  {
    id: 'daybreak-coffee',
    name: 'Daybreak Coffee Roasters',
    kind: 'coffee_shop',
    tagline: 'Neighborhood coffee bar, small batch roasted daily.',
    location: '4th & Pine',
    phewBArItems: [
      {
        id: 'daybreak-drip-coffee',
        name: 'House Drip Coffee',
        description: 'Our daily roast, brewed fresh all morning.',
        priceCents: 350,
        modifierGroups: [],
        phewBAr: true
      },
      {
        id: 'daybreak-oat-latte',
        name: 'Oat Milk Latte',
        description: 'Double shot espresso with steamed oat milk.',
        priceCents: 550,
        modifierGroups: [],
        phewBAr: true
      },
      {
        id: 'daybreak-matcha',
        name: 'Iced Matcha Latte',
        description: 'Ceremonial grade matcha shaken with cold milk over ice.',
        priceCents: 525,
        modifierGroups: [],
        phewBAr: true
      }
    ]
  },
  {
    id: 'amber-anchor',
    name: 'The Amber Anchor',
    kind: 'bar',
    tagline: 'Dockside taps and easygoing cocktails.',
    location: 'Harbor Row',
    phewBArItems: [
      {
        id: 'amber-house-lager',
        name: 'House Lager',
        description: 'Crisp, sessionable lager on draft.',
        priceCents: 700,
        modifierGroups: [],
        phewBAr: true
      },
      {
        id: 'amber-old-fashioned',
        name: 'Old Fashioned',
        description: 'Bourbon, bitters, and orange peel, stirred down.',
        priceCents: 1200,
        modifierGroups: [],
        phewBAr: true
      },
      {
        id: 'amber-spiked-lemonade',
        name: 'Spiked Lemonade',
        description: 'Vodka, fresh lemon, and a splash of soda.',
        priceCents: 950,
        modifierGroups: [],
        phewBAr: true
      }
    ]
  },
  {
    id: 'neon-alley',
    name: 'Neon Alley Tavern',
    kind: 'bar',
    tagline: 'Late-night bites and a rotating cocktail list.',
    location: 'Arts District',
    phewBArItems: [
      {
        id: 'neon-margarita',
        name: 'Classic Margarita',
        description: 'Tequila, lime, and orange liqueur, salt rim optional.',
        priceCents: 1100,
        modifierGroups: [],
        phewBAr: true
      },
      {
        id: 'neon-pale-ale',
        name: 'Local Pale Ale',
        description: 'Hazy pale ale from a rotating local brewery.',
        priceCents: 750,
        modifierGroups: [],
        phewBAr: true
      },
      {
        id: 'neon-paloma',
        name: 'Paloma',
        description: 'Tequila, grapefruit soda, and lime over ice.',
        priceCents: 1050,
        modifierGroups: [],
        phewBAr: true
      }
    ]
  }
];

export const mockVenues = venuesResponseSchema.parse({
  venues: venueRecords.map(({ phewBArItems: _phewBArItems, ...venue }) => venue)
}).venues;

export function getVenues(): Venue[] {
  return mockVenues;
}

export function getVenueById(venueId: string): Venue | undefined {
  return mockVenues.find((venue) => venue.id === venueId);
}

export function getPhewBArMenu(venueId: string): MenuResponse | undefined {
  const record = venueRecords.find((venue) => venue.id === venueId);

  if (!record) {
    return undefined;
  }

  return menuResponseSchema.parse({
    groups: [
      {
        id: 'phewbar',
        name: 'Codename:PhewBar',
        items: record.phewBArItems
      }
    ]
  });
}

export function findPhewBArItem(venueId: string, itemId: string): MenuItem | undefined {
  return getPhewBArMenu(venueId)?.groups[0]?.items.find((item) => item.id === itemId);
}
