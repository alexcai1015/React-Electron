import React, { useMemo, useEffect, useRef } from 'react';
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
  Button,
} from '@material-ui/core';
import { useTable, useFilters, usePagination } from 'react-table';
import { useQueryString } from '../../hooks';
import { SkeletonTable } from './SkeletonTable';
import { ListTablePaginationActions } from './checkpointList/ListTablePaginationActions';

const listTableStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
    '& .MuiTableRow-root:nth-child(odd)': {
      backgroundColor: theme.palette.rowStripeGray,
    },
  },
}));

const lastColumnIndex = 4;
const defaultRowsPerPage = 15;
const truncate = (str, n = 20) => (str.length > n ? str.substr(0, n - 1) + '...' : str);
export const CheckpointDevicesList = ({
  data = [],
  loading,
  handleEdit,
  handleDelete,
  allowEdit,
  allowDelete,
  fetchData,
  searchValue,
  selectedFilterOption,
  pageCount,
  rowCount
}) => {
  const classes = listTableStyles();
  const { queryString, setQueryString } = useQueryString();
  const isFirstRender = useRef(true);
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    page,
    gotoPage,
    prepareRow,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: useMemo(
        () => [
          { Header: 'Device ID', accessor: 'id' },
          { Header: 'IMEI', accessor: 'imei' },
          { Header: 'Mobile Number', accessor: 'mobileNumber' },
          { Header: 'Remarks', accessor: 'status' },
          { Header: 'Action', accessor: 'action' },
        ],
        []
      ),
      data,
      initialState: {
        pageIndex: (queryString && queryString.page - 1) || 0,
        pageSize: (queryString && queryString.pageSize - 1) || defaultRowsPerPage,
      },
      pageCount,
      manualPagination: true,
      manualFilters: true,
    },
    useFilters,
    usePagination
  );
  useEffect(() => {
    fetchData({ filterOption: selectedFilterOption, searchValue , pageIndex, pageSize });
  }, [fetchData, searchValue, selectedFilterOption, pageIndex, pageSize]);
  
  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);

    setQueryString({
      queryString: {
        page: newPage + 1,
      },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    const nextPageSize = +event.target.value;
    const nextPageIndex = 0;

    setPageSize(nextPageSize);
    gotoPage(nextPageIndex);

    setQueryString({
      queryString: { page: nextPageIndex + 1, pageSize: nextPageSize },
    });
  };

  useEffect(() => {
    /**
     * ! TODO: find a better solution on how to skip running effect on first
     * render or a different approach to avoid this check.
     */
    if (isFirstRender.current) {
      return;
    }

    gotoPage(0);
  }, [gotoPage]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  });

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
                <TableCell
                  align={index === lastColumnIndex ? 'center' : 'left'}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        {loading ? (
          <SkeletonTable pageNo={pageIndex} rowsPerPage={pageSize} />
        ) : (
          <TableBody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);

              return (
                <TableRow
                  title={`Row #${rowIndex + 1}`}
                  {...row.getRowProps()}
                  className={classes.striped}
                >
                  {row.cells.map((cell, cellIndex) => {
                    return cellIndex === lastColumnIndex ? (
                      <TableCell align="center" key={cell.row.values.id}>
                        {allowEdit && (
                          <Button
                            color="primary"
                            onClick={() => {
                              handleEdit(cell.row.original);
                            }}
                          >
                            View Details
                          </Button>
                        )}
                        {allowDelete && (
                          <Button
                            color="primary"
                            onClick={() => {
                              handleDelete(cell.row.original.id);
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    ) : (
                      <TableCell {...cell.getCellProps()}>
                        {cellIndex === 5
                          ? truncate(cell.row.original.status || '')
                          : cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        )}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[15, 30, 50, 100]}
              colSpan={headerGroups[0].headers.length}
              count={rowCount}
              rowsPerPage={pageSize}
              page={rowCount ? pageIndex : 0}
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
};
