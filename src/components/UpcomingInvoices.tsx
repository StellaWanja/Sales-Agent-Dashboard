import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { School, SchoolData } from "../interfaces/School";
import { Invoice } from "../interfaces/Invoice";

const UpcomingInvoices: React.FC<SchoolData> = ({ schools }) => {
  const sortedSchools = schools.map((school: School) => {
    school.invoices
      .sort((a: Invoice, b: Invoice) => {
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      })
      .reverse();
    return school;
  });

  console.log(sortedSchools);

  return (
    <TableContainer component={Paper}>
      <h2 className="text-center text-[#080808] font-bold text-2xl pt-8">
        Upcoming Invoices
      </h2>
      <Table aria-label="simple table">
        {sortedSchools.map((school) => {
          return (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>School Name</TableCell>
                  <TableCell align="right">Invoice Number:</TableCell>
                  <TableCell align="right">Amount Due: </TableCell>
                  <TableCell align="right">Due Date:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {school.invoices.map((invoice) => {
                  return (
                    <TableRow
                      key={invoice.invoice_number}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {invoice.balance !== 0 && school.name}
                      </TableCell>
                      <TableCell align="right">
                        {invoice.balance !== 0 && invoice.invoice_number}
                      </TableCell>
                      <TableCell align="right">
                        {invoice.balance !== 0 && invoice.balance}
                      </TableCell>
                      <TableCell align="right">
                        {invoice.balance !== 0 && invoice.due_date}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
          );
        })}
        ;
      </Table>
    </TableContainer>
  );
};

export default UpcomingInvoices;
