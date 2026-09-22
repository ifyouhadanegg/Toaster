import type { OrderResponse } from '@/lib/schemas/order';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils/money';

type ConfirmationPanelProps = {
  confirmation: OrderResponse;
};

export function ConfirmationPanel({ confirmation }: ConfirmationPanelProps) {
  return (
    <Card title="Order confirmed" eyebrow="Receipt">
      <div className="space-y-3 text-sm text-stone-700">
        <p className="text-base font-semibold text-ink">Order ID: {confirmation.orderId}</p>
        <p>{confirmation.lineItemDescription}</p>
        <div className="grid grid-cols-3 gap-3 rounded-2xl bg-stone-100/80 p-4">
          <Metric label="Subtotal" value={formatCurrency(confirmation.subtotalCents)} />
          <Metric label="Tax" value={formatCurrency(confirmation.taxCents)} />
          <Metric label="Total" value={formatCurrency(confirmation.totalCents)} />
        </div>
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-stone-500">{label}</p>
      <p className="mt-1 font-bold text-ink">{value}</p>
    </div>
  );
}