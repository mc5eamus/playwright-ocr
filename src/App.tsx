import { useState } from 'react';
import { faker } from '@faker-js/faker';
import type { Invoice } from './types';
import { SummaryBar } from './SummaryBar';
import { InvoiceTable } from './InvoiceTable';
import { InvoiceDetail } from './InvoiceDetail';
import './App.css';

function generateInvoices(): Invoice[] {
  // Seed faker for reproducibility
  faker.seed(12345);

  // Generate 5-10 random invoices
  const count = faker.number.int({ min: 5, max: 10 });
  const statuses: Array<'Paid' | 'Pending' | 'Overdue'> = ['Paid', 'Pending', 'Overdue'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1001,
    customer: faker.person.fullName(),
    amount: faker.finance.amount({ min: 100, max: 10000, dec: 2 }),
    date: faker.date.recent({ days: 90 }),
    status: faker.helpers.arrayElement(statuses),
    notes: faker.lorem.sentence(),
  }));
}

function App() {
  const [invoices] = useState<Invoice[]>(generateInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Invoice Management System</h1>
      </header>
      <SummaryBar invoices={invoices} />
      <InvoiceTable 
        invoices={invoices} 
        onRowClick={setSelectedInvoice}
      />
      <InvoiceDetail 
        invoice={selectedInvoice} 
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}

export default App;
