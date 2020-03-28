import React, { useMemo } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableFooter,
  TablePagination,
  makeStyles,
} from '@material-ui/core';
import { useTable, usePagination } from 'react-table';

import { ListHeaderCell } from './listTable/ListHeaderCell';
import { ListTablePaginationActions } from './listTable/ListTablePaginationActions';
import { tableData } from './data/approvals'; // remove when API is ready

const listTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  striped0: {
    backgroundColor: 'rgb(246,246,246)',
  },
  striped1: {
    backgroundColor: 'rgb(255,255,255)',
  },
});

export function ListTable() {
  const classes = listTableStyles();

  const {
    headerGroups,
    prepareRow,
    rows,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
    getTableProps,
    getTableBodyProps,
  } = useTable(
    {
      columns: useMemo(
        () => [
          { Header: 'Company', accessor: 'company' },
          { Header: 'Name', accessor: 'name' },
          { Header: 'APOR type', accessor: 'type' },
          { Header: 'Approval action', accessor: 'action' },
        ],
        []
      ),
      data: useMemo(() => tableData, []),
    },
    usePagination
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    gotoPage(0);
  };

  const totalRecordsCount = rows.length;

  return (
    <TableContainer component={Paper}>
      <Table
        {...getTableProps()}
        className={classes.table}
        stickyHeader
        aria-label="sticky header pagination table"
      >
        <TableHead>
          <TableRow>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column) => (
                <ListHeaderCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </ListHeaderCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} className={classes[`striped${index % 2}`]}>
                {row.cells.map((cell) => {
                  return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={4}
              count={totalRecordsCount}
              rowsPerPage={pageSize}
              page={pageIndex}
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
  );
}

export default ListTable;
