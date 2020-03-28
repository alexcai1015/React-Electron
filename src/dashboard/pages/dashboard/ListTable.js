import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableFooter,
  TablePagination,
} from '@material-ui/core';

import { ListHeaderCell } from './listTable/ListHeaderCell';
import { ListTablePaginationActions } from './listTable/ListTablePaginationActions';
import { ListRowActions } from './listTable/ListRowActions';
import { Colors } from '../../../common/constants/Colors';
import { rows } from './data/approvals'; // remove when API is ready
import SubmissionDetailsModal from '../../submission-details-modal';

const listTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  striped0: {
    backgroundColor: Colors.RowStripeGray,
  },
  striped1: {
    backgroundColor: Colors.White,
  },
});

export function ListTable() {
  const classes = listTableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedRapidPassId, setSelectedRapidPassId] = React.useState(null);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (rapidPassId) => {
    setSelectedRapidPassId(rapidPassId);
    setIsDetailsOpen(true);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader aria-label="sticky header pagination table">
          <TableHead>
            <TableRow>
              <ListHeaderCell>Company</ListHeaderCell>
              <ListHeaderCell align="left">Name</ListHeaderCell>
              <ListHeaderCell align="left">APOR Type</ListHeaderCell>
              <ListHeaderCell align="center">Approval Action</ListHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index} className={classes[`striped${index % 2}`]}>
                <TableCell component="th" scope="row">
                  {row.company}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.type}</TableCell>
                <TableCell align="center">
                  <ListRowActions
                    status={row.status}
                    onApproveClick={() => console.log('Trigger Approval')}
                    onDenyClick={() => console.log('Trigger Deny Popover')}
                    onViewDetailsClick={() => handleViewDetails(1)} // TODO: pass rapidPassId
                  ></ListRowActions>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={4}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={ListTablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <SubmissionDetailsModal open={isDetailsOpen} handleClose={() => setIsDetailsOpen(false)} />
    </Container>
  );
}

export default ListTable;
