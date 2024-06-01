import React, { useState } from "react";
import { Invoice } from "../interfaces/Invoice";

interface InvoiceFormProps {
  invoice?: Invoice;
  onSave: (invoice: Invoice) => void;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onSave,
  onCancel,
}) => {
  const [invoiceItem, setInvoiceItem] = useState(
    invoice ? invoice.invoice_item : ""
  );
  const [amount, setAmount] = useState(invoice ? invoice.amount : 0);
  const [dueDate, setDueDate] = useState(invoice ? invoice.due_date : "");
  const [paidAmount, setPaidAmount] = useState(
    invoice ? invoice.paid_amount : 0
  );
  const [completionStatus, setCompletionStatus] = useState(
    invoice ? invoice.completion_status : "pending"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newInvoice: Invoice = {
      invoice_number: invoice?.invoice_number || `INV${Date.now()}`, // Generate unique invoice number
      invoice_item: invoiceItem,
      creation_date: invoice?.creation_date || new Date().toISOString(),
      due_date: dueDate,
      amount: amount,
      paid_amount: paidAmount,
      balance: amount - paidAmount,
      completion_status: completionStatus,
      days_until_due: Math.ceil(
        (new Date(dueDate).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    };

    onSave(newInvoice);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-4 flex-col">
      <div className="flex flex-col">
        <label className="text-[#080808] font-bold">Invoice Item:</label>
        <input
          type="text"
          value={invoiceItem}
          onChange={(e) => setInvoiceItem(e.target.value)}
          required
          className="border-2 w-full border-[#080808] py-1 px-4 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[#080808] font-bold">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          className="border-2 border-[#080808] py-1 px-4 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[#080808] font-bold">Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="border-2 border-[#080808] py-1 px-4 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[#080808] font-bold">Paid Amount:</label>
        <input
          type="number"
          value={paidAmount}
          onChange={(e) => setPaidAmount(Number(e.target.value))}
          required
          className="border-2 border-[#080808] py-1 px-4 rounded"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[#080808] font-bold">Completion Status:</label>
        <select
          value={completionStatus}
          onChange={(e) =>
            setCompletionStatus(e.target.value as "completed" | "pending")
          }
          className="border-2 border-[#080808] py-1 px-4 rounded"
        >
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="flex gap-4">
        
        <button
          type="submit" onClick={handleSubmit}
          className="bg-[#3570FF] px-4 py-2 rounded-md text-[#fff]"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-[#162D43] px-4 py-2 rounded-md text-[#fff]"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
