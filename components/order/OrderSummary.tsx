import type { MenuItem } from '@/lib/schemas/menu';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils/money';

type OrderSummaryProps = {
  item: MenuItem;
  selectedModifiers: Record<string, string>;
};

export function OrderSummary({ item, selectedModifiers }: OrderSummaryProps) {
  return (
    <Card title="Draft order" eyebrow="Summary">
      <div className="space-y-3 text-sm text-stone-700">
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-ink">{item.name}</span>
          <span>{formatCurrency(item.priceCents)}</span>
        </div>
        <div className="rounded-2xl bg-stone-100/80 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-stone-500">Selected modifiers</p>
          <ul className="mt-2 space-y-1">
            {item.modifierGroups.map((group) => {
              const optionId = selectedModifiers[group.id];
              const option = group.options.find((candidate) => candidate.id === optionId);

              return (
                <li key={group.id} className="flex items-center justify-between gap-4">
                  <span>{group.label}</span>
                  <span className="font-semibold text-ink">{option ? option.label : 'Not selected'}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Card>
  );
}