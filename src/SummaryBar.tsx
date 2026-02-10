import type { Invoice } from './types';

interface SummaryBarProps {
  invoices: Invoice[];
}

export function SummaryBar({ invoices }: SummaryBarProps) {
  const totalCount = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const paidCount = invoices.filter(inv => inv.status === 'Paid').length;
  const pendingCount = invoices.filter(inv => inv.status === 'Pending').length;
  const overdueCount = invoices.filter(inv => inv.status === 'Overdue').length;

  return (
    <div className="summary-bar">
      <div className="summary-item">
        <div className="summary-label">Total Invoices</div>
        <div className="summary-value">{totalCount}</div>
      </div>
      <div className="summary-item">
        <div className="summary-label">Total Amount</div>
        <div className="summary-value">${totalAmount.toFixed(2)}</div>
      </div>
      <div className="summary-item">
        <div className="summary-label">Paid</div>
        <div className="summary-value">{paidCount}</div>
      </div>
      <div className="summary-item">
        <div className="summary-label">Pending</div>
        <div className="summary-value">{pendingCount}</div>
      </div>
      <div className="summary-item">
        <div className="summary-label">Overdue</div>
        <div className="summary-value">{overdueCount}</div>
      </div>
    </div>
  );
}
