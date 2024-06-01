import React, { useState } from "react";
import { School } from "../interfaces/School";

import InvoiceForm from "./InvoiceForm";
import { Invoice } from "../interfaces/Invoice";
import FilterInvoices from "./FilterInvoices";
import InvoiceTable from "./InvoiceTable";

interface SchoolDetailsProps {
  school: School;
}

const Invoices: React.FC<SchoolDetailsProps> = ({ school }) => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>(school.invoices);

  const defaultInvoice: Invoice = {
    invoice_number: "",
    invoice_item: "",
    creation_date: new Date().toISOString().split("T")[0],
    due_date: "",
    amount: 0,
    paid_amount: 0,
    balance: 0,
    completion_status: "Pending",
    days_until_due: 0,
    collections: []
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === "all") return true;
    return filter === "completed"
      ? invoice.completion_status === "Completed"
      : invoice.completion_status === "Pending";
  });

  const handleSaveInvoice = (invoice: Invoice) => {
    if (editingInvoice) {
      const updatedInvoices = invoices.map((inv) =>
        inv.invoice_number === invoice.invoice_number ? invoice : inv
      );
      setInvoices(updatedInvoices);
      setEditingInvoice(null);
    } else {
      setInvoices([...invoices, invoice]);
    }
    setIsCreatingInvoice(false);
  };

  const handleDeleteInvoice = (invoiceNumber: string) => {
    const updatedInvoices = invoices.filter(
      (inv) => inv.invoice_number !== invoiceNumber
    );
    setInvoices(updatedInvoices);
  };

  const handleAddCollection = (
    invoiceNumber: string,
    collectionAmount: number
  ) => {
    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.invoice_number === invoiceNumber) {
        const updatedInvoice = { ...invoice };
        updatedInvoice.paid_amount += collectionAmount;
        updatedInvoice.balance -= collectionAmount;
        // Update completion status based on balance
        updatedInvoice.completion_status =
          updatedInvoice.balance === 0 ? "Completed" : "Pending";
        return updatedInvoice;
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  return (
    <div>
      <h3 className="text-[#080808] font-bold text-xl">Invoices</h3>
      <div>
        <FilterInvoices filter={filter} setFilter={setFilter} />
      </div>

      <InvoiceTable
        filteredInvoices={filteredInvoices}
        setEditingInvoice={setEditingInvoice}
        handleDeleteInvoice={handleDeleteInvoice}
        handleAddCollection={handleAddCollection}
      />

      <div>
        {isCreatingInvoice && (
          <InvoiceForm
            invoice={defaultInvoice}
            onSave={handleSaveInvoice}
            onCancel={() => setIsCreatingInvoice(false)}
          />
        )}
        {editingInvoice && (
          <InvoiceForm
            invoice={editingInvoice}
            onSave={handleSaveInvoice}
            onCancel={() => setEditingInvoice(null)}
          />
        )}
        {!isCreatingInvoice && (
          <button
            onClick={() => setIsCreatingInvoice(true)}
            className="bg-[#3570FF] px-4 py-2 mt-8 rounded-md text-[#fff]"
          >
            Add New Invoice
          </button>
        )}
      </div>
    </div>
  );
};

export default Invoices;
