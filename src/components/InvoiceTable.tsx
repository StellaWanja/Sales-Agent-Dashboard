import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const InvoiceTable = ({ filteredInvoices, setEditingInvoice, handleDeleteInvoice }) => {
  return (
    <>
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
    </>
  )
}

export default InvoiceTable