import type { Invoice } from './types';

interface InvoiceDetailProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export function InvoiceDetail({ invoice, onClose }: InvoiceDetailProps) {
  if (!invoice) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Invoice Details</h2>
        <div className="detail-section">
          <div className="detail-row">
            <span className="detail-label">Invoice #:</span>
            <span className="detail-value">{invoice.id}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Customer:</span>
            <span className="detail-value">{invoice.customer}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">${invoice.amount}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{invoice.date.toLocaleDateString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
              {invoice.status}
            </span>
          </div>
        </div>
        <div className="notes-section">
          <h3>Notes</h3>
          <p>{invoice.notes}</p>
        </div>
      </div>
    </div>
  );
}
