import type { PricingResponse } from '@/lib/schemas/pricing';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils/money';

type PricingBreakdownProps = {
  pricing: PricingResponse;
};

export function PricingBreakdown({ pricing }: PricingBreakdownProps) {
  return (
    <Card title="Price check" eyebrow="Totals">
      <div className="space-y-3 text-sm">
        <Row label="Subtotal" value={formatCurrency(pricing.subtotalCents)} />
        <Row label="Tax" value={formatCurrency(pricing.taxCents)} />
        <Row label="Total" value={formatCurrency(pricing.totalCents)} emphasize />
      </div>
      <p className="mt-3 text-xs text-stone-500">{pricing.lineItemDescription}</p>
    </Card>
  );
}

function Row({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 ${emphasize ? 'text-base font-bold text-ink' : 'text-stone-700'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}