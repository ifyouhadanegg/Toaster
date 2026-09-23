import { z } from 'zod';

export const venueKindSchema = z.enum(['coffee_shop', 'bar']);

export const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
  kind: venueKindSchema,
  tagline: z.string(),
  location: z.string()
});

export const venuesResponseSchema = z.object({
  venues: z.array(venueSchema).min(1)
});

export type VenueKind = z.infer<typeof venueKindSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type VenuesResponse = z.infer<typeof venuesResponseSchema>;
