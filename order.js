// Dag 5 (fördjupning): FACIT.
export function laggTillIOrder(order, id) {
  const finns = order.find((rad) => rad.id === id);
  if (finns) {
    return order.map((rad) => (rad.id === id ? { ...rad, antal: rad.antal + 1 } : rad));
  }
  return [...order, { id, antal: 1 }];
}

export function rensaOrder() {
  return [];
}

export function antalIOrder(order) {
  return order.reduce((summa, rad) => summa + rad.antal, 0);
}
