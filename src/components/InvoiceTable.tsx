import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Invoice } from "../interfaces/Invoice";

interface InvoiceTableProps {
  filteredInvoices: Invoice[];
  setEditingInvoice: (invoice: Invoice | null) => void;
  handleDeleteInvoice: (invoiceNumber: string) => void;
  handleAddCollection: (
    invoiceNumber: string,
    collectionAmount: number
  ) => void;
 
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  filteredInvoices,
  setEditingInvoice,
  handleDeleteInvoice,
  handleAddCollection,
}) => {
  return (
    <>
      <TableContainer
        component={Paper}
        className="bg-[#F9F8FE] p-6 rounded-md mt-6"
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold ">Invoice Number:</span>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold ">Amount Due:</span>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold ">Due Date:</span>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold ">Balance:</span>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold ">Status:</span>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold ">Days Until Due:</span>
              </TableCell>
              <TableCell align="right">
                <span className="font-bold ">Add Collections:</span>
              </TableCell>
              <TableCell align="center">
                <span className="font-bold ">Actions:</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice: Invoice) => (
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
                  <input
                    type="number"
                    placeholder="Amount"
                    className="border-2 border-[#080808] py-1 px-4 rounded"
                    onChange={(e) =>
                      handleAddCollection(
                        invoice.invoice_number,
                        parseInt(e.target.value)
                      )
                    }
                  />
                </TableCell>

                <TableCell align="right">
                  <div className="flex">
                    <button
                      className="bg-[#3570FF] px-4 py-2 rounded-md text-[#fff]"
                      onClick={() => setEditingInvoice(invoice)}
                    >
                      Edit Invoice
                    </button>
                    <button
                      className="bg-[#162D43] px-4 py-2 rounded-md text-[#fff] ml-2"
                      onClick={() =>
                        handleDeleteInvoice(invoice.invoice_number)
                      }
                    >
                      Delete Invoice
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvoiceTable;
