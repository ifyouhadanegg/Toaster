import { randomUUID } from 'node:crypto';

export function createOrderId(): string {
  return `ORD-${randomUUID().slice(0, 8).toUpperCase()}`;
}