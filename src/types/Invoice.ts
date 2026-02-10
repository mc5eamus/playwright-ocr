export interface Invoice {
  id: string;
  name: string;
  amount: number;
  date: Date;
  status: 'paid' | 'pending' | 'overdue';
}
