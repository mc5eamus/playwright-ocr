import type { Invoice } from '../types/Invoice';

const names = [
  'Acme Corporation',
  'Global Industries',
  'Tech Solutions Inc',
  'Digital Ventures',
  'Innovation Labs',
  'Smart Systems Ltd',
  'Future Enterprises',
  'Cloud Services Co',
  'Data Dynamics LLC',
  'Quantum Computing Inc',
];

const statuses: Invoice['status'][] = ['paid', 'pending', 'overdue'];

export function generateRandomInvoice(): Invoice {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomAmount = Math.floor(Math.random() * 10000) + 100;
  const randomDaysAgo = Math.floor(Math.random() * 90);
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - randomDaysAgo);
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const id = `INV-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  return {
    id,
    name: randomName,
    amount: randomAmount,
    date: randomDate,
    status: randomStatus,
  };
}

export function generateRandomInvoices(count: number): Invoice[] {
  const invoices: Invoice[] = [];
  for (let i = 0; i < count; i++) {
    invoices.push(generateRandomInvoice());
  }
  return invoices;
}
