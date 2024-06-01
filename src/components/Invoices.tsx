import React, { useState } from "react";
import { School } from "../interfaces/School";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import InvoiceForm from "./InvoiceForm";
import { Invoice } from "../interfaces/Invoice";

interface SchoolDetailsProps {
  school: School;
}

const Invoices: React.FC<SchoolDetailsProps> = ({ school }) => {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>(school.invoices);

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
      school.invoices = updatedInvoices;
    } else {
      setInvoices([...invoices, invoice]);
      school.invoices = [...invoices, invoice];
    }
    setIsCreatingInvoice(false);
  };

  const handleDeleteInvoice = (invoiceNumber: string) => {
    const updatedInvoices = invoices.filter(
      (inv) => inv.invoice_number !== invoiceNumber
    );
    school.invoices = updatedInvoices;
    setInvoices(updatedInvoices);
  };

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
  };

  return (
    <div>
      <h3 className="text-[#080808] font-bold text-xl">Invoices</h3>
      <div>
        <label>Filter: </label>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "completed" | "pending")
          }
          className="cursor-pointer mt-4 border-2 px-8 py-1 rounded-md"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <TableContainer
        component={Paper}
        className="bg-[#F9F8FE] p-6 rounded-md mt-6"
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number:</TableCell>
              <TableCell align="right">Amount Due:</TableCell>
              <TableCell align="right">Due Date:</TableCell>
              <TableCell align="right">Balance:</TableCell>
              <TableCell align="right">Status:</TableCell>
              <TableCell align="right">Days Until Due:</TableCell>
              <TableCell align="right">Actions:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow
                key={invoice.invoice_number}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {invoice.invoice_number}
                </TableCell>
                <TableCell align="right">{invoice.amount}</TableCell>
                <TableCell align="right">{invoice.due_date}</TableCell>
                <TableCell align="right">{invoice.balance}</TableCell>
                <TableCell align="right">{invoice.completion_status}</TableCell>
                <TableCell align="right">{invoice.days_until_due}</TableCell>
                <TableCell align="right">
                  <button
                    className="bg-[#3570FF] px-4 py-2 rounded-md text-[#fff]"
                    onClick={() => setEditingInvoice(invoice)}
                  >
                    Edit Invoice
                  </button>
                  <button
                    className="bg-[#162D43] px-4 py-2 rounded-md text-[#fff] ml-2"
                    onClick={() => handleDeleteInvoice(invoice.invoice_number)}
                  >
                    Delete Invoice
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
