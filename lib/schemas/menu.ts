import { z } from 'zod';

export const modifierOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  priceDeltaCents: z.number().int()
});

export const modifierGroupSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  minSelections: z.number().int().min(0),
  maxSelections: z.number().int().min(1),
  options: z.array(modifierOptionSchema).min(1)
});

export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  priceCents: z.number().int().nonnegative(),
  modifierGroups: z.array(modifierGroupSchema),
  phewBAr: z.boolean().optional()
});

export const menuGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(menuItemSchema).min(1)
});

export const menuResponseSchema = z.object({
  groups: z.array(menuGroupSchema).min(1)
});

export type MenuResponse = z.infer<typeof menuResponseSchema>;
export type MenuGroup = z.infer<typeof menuGroupSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type ModifierGroup = z.infer<typeof modifierGroupSchema>;
export type ModifierOption = z.infer<typeof modifierOptionSchema>;