// Dag 5 (fördjupning): FACIT.
import type { OrderRad } from "./typer";
export function laggTillIOrder(order: OrderRad[], id: number): OrderRad[] {
  const finns = order.find((rad) => rad.id === id);
  if (finns) {
    return order.map((rad) => (rad.id === id ? { ...rad, antal: rad.antal + 1 } : rad));
  }
  return [...order, { id, antal: 1 }];
}

export function rensaOrder(): OrderRad[] {
  return [];
}

export function antalIOrder(order: OrderRad[]): number {
  return order.reduce((summa, rad) => summa + rad.antal, 0);
}
