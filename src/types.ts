export interface Invoice {
  id: number;
  customer: string;
  amount: string;
  date: Date;
  status: 'Paid' | 'Pending' | 'Overdue';
  notes: string;
}
