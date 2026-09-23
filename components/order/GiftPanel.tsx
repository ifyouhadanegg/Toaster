'use client';

import { useState } from 'react';
import type { Gift } from '@/lib/schemas/gift';
import { Card } from '@/components/ui/Card';
import { Button, buttonClassName } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils/money';

type GiftPanelProps = {
  gift: Gift;
};

export function GiftPanel({ gift }: GiftPanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    await navigator.clipboard.writeText(gift.shareLinks.url);
    setCopied(true);
  }

  return (
    <Card title="Gift ready to share" eyebrow="Codename:PhewBar">
      <div className="space-y-3 text-sm text-stone-700">
        <p className="text-base font-semibold text-ink">
          {gift.itemName} at {gift.venueName}
        </p>
        <p>{formatCurrency(gift.priceCents)} · Gift token {gift.token}</p>
        <div className="flex flex-wrap gap-3">
          <a href={gift.shareLinks.mailto} className={buttonClassName('secondary')}>
            Share via email
          </a>
          <a href={gift.shareLinks.sms} className={buttonClassName('secondary')}>
            Share via text
          </a>
          <Button type="button" variant="ghost" onClick={handleCopyLink}>
            {copied ? 'Link copied!' : 'Copy redeem link'}
          </Button>
        </div>
        <p className="break-all text-xs text-stone-500">{gift.shareLinks.url}</p>
      </div>
    </Card>
  );
}
