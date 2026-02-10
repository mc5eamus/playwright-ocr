import type { Invoice } from './types';

interface InvoiceTableProps {
  invoices: Invoice[];
  onRowClick: (invoice: Invoice) => void;
}

export function InvoiceTable({ invoices, onRowClick }: InvoiceTableProps) {
  return (
    <div className="invoice-table-container">
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr 
              key={invoice.id} 
              onClick={() => onRowClick(invoice)}
              className="invoice-row"
            >
              <td>{invoice.id}</td>
              <td>{invoice.customer}</td>
              <td>${invoice.amount}</td>
              <td>{invoice.date.toLocaleDateString()}</td>
              <td>
                <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
                  {invoice.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
