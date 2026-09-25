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

export default function HomePage() {
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
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#ff7a1a_0%,#ff5f00_100%)] px-6 py-8 text-white shadow-panel ring-1 ring-orange-300 sm:px-10 sm:py-10">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-orange-100">Toast Demo</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight text-white sm:text-6xl">Codename:PhewBar</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-orange-50 sm:text-base">
          Placeholder text...
        </p>
      </div>

      <div className="mt-8 space-y-6">
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
      </div>
    </main>
  );
}
