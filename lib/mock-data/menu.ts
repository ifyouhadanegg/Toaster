import { menuResponseSchema, type MenuResponse } from '@/lib/schemas/menu';

export const mockMenu: MenuResponse = menuResponseSchema.parse({
  groups: [
    {
      id: 'lunch-entrees',
      name: 'Lunch Entrées',
      items: [
        {
          id: 'grilled-chicken-bowl',
          name: 'Grilled Chicken Bowl',
          description: 'Grilled chicken, rice, greens, and herb dressing.',
          priceCents: 1295,
          modifierGroups: [
            {
              id: 'chicken-bowl-protein',
              label: 'Protein style',
              description: 'Choose the protein preparation for this bowl.',
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: 'grilled', label: 'Grilled', priceDeltaCents: 0 },
                { id: 'blackened', label: 'Blackened', priceDeltaCents: 50 },
                { id: 'crispy', label: 'Crispy', priceDeltaCents: 100 }
              ]
            }
          ]
        },
        {
          id: 'salmon-skillet',
          name: 'Salmon Skillet',
          description: 'Seared salmon with potatoes, vegetables, and lemon butter.',
          priceCents: 1680,
          modifierGroups: [
            {
              id: 'salmon-side',
              label: 'Side choice',
              description: 'Choose the side to serve with the salmon.',
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: 'seasonal-veg', label: 'Seasonal vegetables', priceDeltaCents: 0 },
                { id: 'loaded-mash', label: 'Loaded mashed potatoes', priceDeltaCents: 125 },
                { id: 'caesar-salad', label: 'Caesar salad', priceDeltaCents: 100 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'chef-signatures',
      name: 'Chef Signatures',
      items: [
        {
          id: 'mushroom-risotto',
          name: 'Mushroom Risotto',
          description: 'Creamy risotto with wild mushrooms, parmesan, and herbs.',
          priceCents: 1425,
          modifierGroups: [
            {
              id: 'risotto-cheese',
              label: 'Cheese finish',
              description: 'Pick the final cheese finish.',
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: 'parm', label: 'Parmesan', priceDeltaCents: 0 },
                { id: 'grana-padano', label: 'Grana Padano', priceDeltaCents: 75 }
              ]
            }
          ]
        },
        {
          id: 'bbq-pork-sandwich',
          name: 'BBQ Pork Sandwich',
          description: 'Slow-cooked pork, slaw, pickles, and smoky barbecue sauce.',
          priceCents: 1380,
          modifierGroups: [
            {
              id: 'pork-side',
              label: 'Side choice',
              description: 'Select a side with the sandwich.',
              minSelections: 1,
              maxSelections: 1,
              options: [
                { id: 'fries', label: 'Fries', priceDeltaCents: 0 },
                { id: 'onion-rings', label: 'Onion rings', priceDeltaCents: 100 }
              ]
            }
          ]
        }
      ]
    }
  ]
});

export function getMenu() {
  return mockMenu;
}