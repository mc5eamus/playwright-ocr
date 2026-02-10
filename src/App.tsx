import { useState } from 'react'
import './App.css'
import type { Invoice } from './types/Invoice'
import { generateRandomInvoices } from './utils/invoiceGenerator'

function App() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => generateRandomInvoices(10))

  const handleGenerateInvoices = () => {
    setInvoices(generateRandomInvoices(10))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'status-paid'
      case 'pending':
        return 'status-pending'
      case 'overdue':
        return 'status-overdue'
      default:
        return ''
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Invoice Dashboard</h1>
        <button className="generate-btn" onClick={handleGenerateInvoices}>
          Generate New Invoices
        </button>
      </header>
      
      <div className="invoice-table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="invoice-id">{invoice.id}</td>
                <td>{invoice.name}</td>
                <td className="amount">{formatCurrency(invoice.amount)}</td>
                <td>{formatDate(invoice.date)}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(invoice.status)}`}>
                    {invoice.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
