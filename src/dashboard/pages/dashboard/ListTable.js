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
  styled,
  TableSortLabel,
  Typography,
} from '@material-ui/core';
import { usePagination, useSortBy, useTable } from 'react-table';

import { ListHeaderCell } from './listTable/ListHeaderCell';
import { ListTablePaginationActions } from './listTable/ListTablePaginationActions';
import { ListRowActions } from './listTable/ListRowActions';
import { Colors } from '../../../common/constants/Colors';
import { tableData } from './data/approvals'; // TODO: remove when API is ready

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
          { Header: 'Approval action', accessor: 'status' },
        ],
        []
      ),
      data: useMemo(() => tableData, []),
    },
    useSortBy,

    // ! `usePagination()` must come after `useSortBy()`
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

  const lastColumnIndex = 3;
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
              headerGroup.headers.map((column, index) => (
                <ListHeaderCell align={index === lastColumnIndex ? 'center' : 'right'}
                  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                  >
                    {column.render('Header')}
                    {column.isSorted ? (
                      <StyledSortAccessibilityLabel component="span">
                        {column.isSortedDesc ? 'sorted descending' : 'sorted ascending'}
                      </StyledSortAccessibilityLabel>
                    ) : null}
                  </TableSortLabel>
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

                {row.cells.map((cell, index) => {
                  return index == lastColumnIndex ? (
                    // Last cell is status with custom component
                    <TableCell align="center" key={index}>
                      <ListRowActions
                        status={'pending'}
                        onApproveClick={() => console.log('Trigger Approval')}
                        onDenyClick={() => console.log('Trigger Deny Popover')}
                        onViewDetailsClick={() => console.log('Trigger View details popup')}>
                      </ListRowActions>
                    </TableCell>
                  ) : <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>;
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

const StyledSortAccessibilityLabel = styled(Typography)({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
});

export default ListTable;
