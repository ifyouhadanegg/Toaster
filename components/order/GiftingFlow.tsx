"use client";

import { useEffect, useState } from 'react';
import { VenueList } from '@/components/venue/VenueList';
import { MenuGroups } from '@/components/menu/MenuGroups';
import { PricingBreakdown } from '@/components/order/PricingBreakdown';
import { GiftPanel } from '@/components/order/GiftPanel';
import { Button } from '@/components/ui/Button';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { loadVenues } from '@/lib/toast-client/venues';
import { loadMenu } from '@/lib/toast-client/menu';
import { requestPricing } from '@/lib/toast-client/pricing';
import { submitOrder } from '@/lib/toast-client/orders';
import { createGift } from '@/lib/toast-client/gifts';
import type { Venue } from '@/lib/schemas/venue';
import type { MenuResponse } from '@/lib/schemas/menu';
import type { PricingResponse } from '@/lib/schemas/pricing';
import type { Gift } from '@/lib/schemas/gift';

export function GiftingFlow({ recipient }: { recipient?: string }) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [pricing, setPricing] = useState<PricingResponse | null>(null);
  const [gift, setGift] = useState<Gift | null>(null);
  const [loadingVenues, setLoadingVenues] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [loadingPricing, setLoadingPricing] = useState(false);
  const [buyingGift, setBuyingGift] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadVenues()
      .then((data) => {
        if (!cancelled) {
          setVenues(data.venues);
        }
      })
      .catch((exception) => {
        if (!cancelled) {
          setError(exception instanceof Error ? exception.message : 'Failed to load venues.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingVenues(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedVenueId) {
      return;
    }

    let cancelled = false;

    setLoadingMenu(true);
    loadMenu(selectedVenueId)
      .then((data) => {
        if (!cancelled) {
          setMenu(data);
        }
      })
      .catch((exception) => {
        if (!cancelled) {
          setError(exception instanceof Error ? exception.message : 'Failed to load the Codename:PhewBar menu.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingMenu(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedVenueId]);

  const selectedItem = menu?.groups.flatMap((group) => group.items).find((item) => item.id === selectedItemId) ?? null;

  function handleSelectVenue(venueId: string) {
    setSelectedVenueId(venueId);
    setMenu(null);
    setSelectedItemId(null);
    setPricing(null);
    setGift(null);
    setError(null);
  }

  function handleSelectItem(itemId: string) {
    setSelectedItemId(itemId);
    setPricing(null);
    setGift(null);
    setError(null);
  }

  async function handlePriceCheck() {
    if (!selectedVenueId || !selectedItem) {
      return;
    }

    try {
      setError(null);
      setLoadingPricing(true);
      const nextPricing = await requestPricing({ venueId: selectedVenueId, itemId: selectedItem.id, selectedModifiers: [] });
      setPricing(nextPricing);
      setGift(null);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Unable to price the gift.');
    } finally {
      setLoadingPricing(false);
    }
  }

  async function handleBuyAndGift() {
    if (!selectedVenueId || !selectedItem || !pricing) {
      return;
    }

    try {
      setError(null);
      setBuyingGift(true);
      const order = await submitOrder({ venueId: selectedVenueId, itemId: selectedItem.id, selectedModifiers: [] });
      const nextGift = await createGift({ venueId: selectedVenueId, itemId: selectedItem.id, orderId: order.orderId });
      setGift(nextGift);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Unable to buy the gift.');
    } finally {
      setBuyingGift(false);
    }
  }

  return (
    <section className="space-y-6" aria-labelledby="gift-heading">
        <div>
          <h2 id="gift-heading" className="text-2xl font-black text-ink">
            {recipient ? `Choose a gift for ${recipient}` : 'Explore gifts'}
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Browse our demo merchants in Pacific Beach, San Diego, pick a beverage, and create a gift link to share{recipient ? ` with ${recipient}` : ''}.
          </p>
        </div>
        {error ? <ErrorState message={error} /> : null}

        {loadingVenues ? <LoadingState label="Loading venues..." /> : null}
        {venues.length > 0 ? <VenueList venues={venues} selectedVenueId={selectedVenueId} onSelectVenue={handleSelectVenue} /> : null}

        {selectedVenueId ? (
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
            <div className="space-y-6">
              {loadingMenu ? <LoadingState label="Loading the Codename:PhewBar menu..." /> : null}
              {menu ? <MenuGroups groups={menu.groups} selectedItemId={selectedItemId} onSelectItem={handleSelectItem} /> : null}
            </div>

            <div className="space-y-6">
              {selectedItem ? (
                <div className="flex flex-wrap gap-3">
                  <Button type="button" onClick={handlePriceCheck} disabled={loadingPricing}>
                    {loadingPricing ? 'Calculating...' : 'Get price'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleBuyAndGift} disabled={!pricing || buyingGift}>
                    {buyingGift ? 'Buying...' : 'Buy & gift this beverage'}
                  </Button>
                </div>
              ) : null}

              {pricing ? <PricingBreakdown pricing={pricing} /> : null}

              {gift ? <GiftPanel gift={gift} /> : null}
            </div>
          </div>
        ) : null}
    </section>
  );
}
