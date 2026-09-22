"use client";

import { useEffect, useState } from 'react';
import { MenuGroups } from '@/components/menu/MenuGroups';
import { ModifierPicker } from '@/components/order/ModifierPicker';
import { OrderSummary } from '@/components/order/OrderSummary';
import { PricingBreakdown } from '@/components/order/PricingBreakdown';
import { ConfirmationPanel } from '@/components/order/ConfirmationPanel';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { loadMenu } from '@/lib/toast-client/menu';
import { requestPricing } from '@/lib/toast-client/pricing';
import { submitOrder } from '@/lib/toast-client/orders';
import type { MenuItem, MenuResponse } from '@/lib/schemas/menu';
import type { PricingResponse } from '@/lib/schemas/pricing';
import type { OrderResponse } from '@/lib/schemas/order';

export default function HomePage() {
  const [menu, setMenu] = useState<MenuResponse | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedModifiers, setSelectedModifiers] = useState<Record<string, string>>({});
  const [pricing, setPricing] = useState<PricingResponse | null>(null);
  const [confirmation, setConfirmation] = useState<OrderResponse | null>(null);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [loadingPricing, setLoadingPricing] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function bootstrapMenu() {
      try {
        setLoadingMenu(true);
        const data = await loadMenu();

        if (!cancelled) {
          setMenu(data);
          setSelectedItemId(data.groups[0]?.items[0]?.id ?? null);
        }
      } catch (exception) {
        if (!cancelled) {
          setError(exception instanceof Error ? exception.message : 'Failed to load menu.');
        }
      } finally {
        if (!cancelled) {
          setLoadingMenu(false);
        }
      }
    }

    bootstrapMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedItem = menu?.groups.flatMap((group) => group.items).find((item) => item.id === selectedItemId) ?? null;
  const draftOrder = selectedItem
    ? {
        itemId: selectedItem.id,
        selectedModifiers: selectedItem.modifierGroups
          .map((group) => {
            const optionId = selectedModifiers[group.id];

            return optionId ? { groupId: group.id, optionId } : null;
          })
          .filter((value): value is { groupId: string; optionId: string } => Boolean(value))
      }
    : null;

  const hasRequiredModifiers =
    selectedItem !== null && selectedItem.modifierGroups.every((group) => Boolean(selectedModifiers[group.id]));

  async function handlePriceCheck() {
    if (!draftOrder || !hasRequiredModifiers) {
      setError('Choose one option from each required modifier group first.');
      return;
    }

    try {
      setError(null);
      setLoadingPricing(true);
      const nextPricing = await requestPricing(draftOrder);
      setPricing(nextPricing);
      setConfirmation(null);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Unable to price the order.');
    } finally {
      setLoadingPricing(false);
    }
  }

  async function handleSubmitOrder() {
    if (!draftOrder || !pricing) {
      setError('Get a price estimate before submitting the order.');
      return;
    }

    try {
      setError(null);
      setSubmittingOrder(true);
      const nextConfirmation = await submitOrder(draftOrder);
      setConfirmation(nextConfirmation);
    } catch (exception) {
      setError(exception instanceof Error ? exception.message : 'Unable to submit the order.');
    } finally {
      setSubmittingOrder(false);
    }
  }

  function handleSelectItem(itemId: string) {
    setSelectedItemId(itemId);
    setSelectedModifiers({});
    setPricing(null);
    setConfirmation(null);
    setError(null);
  }

  function handleSelectModifier(groupId: string, optionId: string) {
    setSelectedModifiers((current) => ({ ...current, [groupId]: optionId }));
    setPricing(null);
    setConfirmation(null);
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-hero-grid px-6 py-8 text-paper shadow-panel sm:px-10 sm:py-10">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-mint">Toast Demo</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-6xl">A Toast-style restaurant ordering flow for hospitality teams to explore.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-200 sm:text-base">
          Pick a restaurant item, choose the required modifier, price the draft order, and submit it through the Toast demo workflow.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-6">
          {loadingMenu ? <LoadingState label="Loading menu..." /> : null}
          {error ? <ErrorState message={error} /> : null}

          {menu ? <MenuGroups groups={menu.groups} selectedItemId={selectedItemId} onSelectItem={handleSelectItem} /> : null}
        </div>

        <div className="space-y-6">
          {selectedItem ? (
            <Card title={selectedItem.name} eyebrow="Active selection">
              <p className="text-sm leading-6 text-stone-600">{selectedItem.description}</p>
            </Card>
          ) : null}

          {selectedItem ? (
            <ModifierPicker item={selectedItem} selectedModifiers={selectedModifiers} onSelectModifier={handleSelectModifier} />
          ) : null}

          {selectedItem ? <OrderSummary item={selectedItem} selectedModifiers={selectedModifiers} /> : null}

          {selectedItem ? (
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handlePriceCheck} disabled={!hasRequiredModifiers || loadingPricing}>
                {loadingPricing ? 'Calculating...' : 'Get price'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleSubmitOrder} disabled={!pricing || submittingOrder}>
                {submittingOrder ? 'Submitting...' : 'Submit order'}
              </Button>
            </div>
          ) : null}

          {pricing ? <PricingBreakdown pricing={pricing} /> : null}

          {confirmation ? <ConfirmationPanel confirmation={confirmation} /> : null}
        </div>
      </div>
    </main>
  );
}