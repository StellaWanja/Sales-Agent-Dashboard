export interface Invoice {
  invoice_number: string;
  invoice_item: string;
  creation_date: string;
  due_date: string;
  amount: number;
  paid_amount: number;
  balance: number;
  completion_status: string;
  days_until_due: number;
}
