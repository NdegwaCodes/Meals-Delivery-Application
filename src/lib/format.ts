const shillings = new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 });

export function formatKES(amount: number): string {
  return `KSh ${shillings.format(Math.round(amount))}`;
}

export function formatMinutes(range: [number, number]): string {
  return `${range[0]}-${range[1]} min`;
}
