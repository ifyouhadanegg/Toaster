import { formatCurrency } from '@/lib/utils/money';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { MenuItem } from '@/lib/schemas/menu';

type MenuItemCardProps = {
  item: MenuItem;
  selected: boolean;
  onSelect: (itemId: string) => void;
};

export function MenuItemCard({ item, selected, onSelect }: MenuItemCardProps) {
  return (
    <Card className={selected ? 'ring-2 ring-toast ring-offset-2 ring-offset-white' : ''}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-ink">{item.name}</h3>
          <p className="mt-1 text-sm leading-6 text-stone-600">{item.description}</p>
          <p className="mt-3 text-sm font-semibold text-[#d9480f]">{formatCurrency(item.priceCents)}</p>
        </div>
        <Button type="button" variant={selected ? 'secondary' : 'primary'} onClick={() => onSelect(item.id)}>
          {selected ? 'Selected' : 'Choose item'}
        </Button>
      </div>
    </Card>
  );
}