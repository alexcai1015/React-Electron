import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
import { useFilters, usePagination, useTable } from 'react-table';

import { useQueryString } from '../../../hooks';
import { setCurrentAccessPass } from '../../../store/slices';
import { AccessPassPropType } from '../../../types';

import { ListHeaderCell } from './listTable/ListHeaderCell';
import { ListTablePaginationActions } from './listTable/ListTablePaginationActions';
import { ListRowActions } from './listTable/ListRowActions';
import { SkeletonTable } from './listTable/SkeletonTable';

const defaultRowsPerPage = 15;
const listTableStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
    '& .MuiTableRow-root:nth-child(odd)': {
      backgroundColor: theme.palette.rowStripeGray,
    },
  },
}));

export const ListTable = ({
  data,
  fetchData,
  filterStatus,
  searchValue,
  loading,
  pageCount,
  pageIndex: controlledPageIndex = 0,
  pageSize: controlledPageSize = defaultRowsPerPage,
  disabledActions,
  onApproveClick,
  onDenyClick,
  onSuspendClick,
  onViewDetailsClick,
  rowCount,
}) => {
  const dispatch = useDispatch();
  const classes = listTableStyles();

  const { queryString, setQueryString } = useQueryString();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    gotoPage,
    page,
    prepareRow,
    setFilter,
    setPageSize,
    state: { pageIndex, pageSize, filters },
  } = useTable(
    {
      columns: useMemo(
        () => [
          { Header: 'Company', accessor: 'company' },
          { Header: 'Name', accessor: 'name' },
          { Header: 'APOR type', accessor: 'aporType' },
          { Header: 'ID Type', accessor: 'idType' },
          { Header: 'ID Number', accessor: 'id' },
          { Header: 'Approval Action', accessor: 'status' },
        ],
        []
      ),
      data,
      initialState: {
        // ! TODO: get from query string
        pageIndex: controlledPageIndex,
        pageSize: controlledPageSize,
        filters: [
          {
            id: 'status',
            value: (queryString && queryString.status) || 'show_all',
          },
        ],
      },
      manualPagination: true,
      manualFilters: true,
      pageCount,
    },
    useFilters,
    usePagination
  );

  /** Modals' States  */

  useEffect(() => {
    return () => {
      dispatch(setCurrentAccessPass({}));
    };
  }, [dispatch]);

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    fetchData({ filters, pageIndex, pageSize, search: searchValue });
  }, [fetchData, filters, isFirstRender, pageIndex, pageSize, searchValue]);

  useEffect(() => {
    setIsFirstRender(false);
  }, [setIsFirstRender]);

  useEffect(() => {
    gotoPage(controlledPageIndex);
    setFilter('status', filterStatus);
  }, [controlledPageIndex, filterStatus, gotoPage, setFilter]);

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

  const lastColumnIndex = 5;

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
                <ListHeaderCell
                  align={index === lastColumnIndex ? 'center' : 'left'}
                  {...column.getHeaderProps()}
                >
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
        {loading ? (
          <SkeletonTable pageNo={pageIndex} rowsPerPage={pageSize} />
        ) : (
          <TableBody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);

              return (
                <TableRow
                  title={`Row #${pageIndex * rowCount + (rowIndex + 1)}`}
                  {...row.getRowProps()}
                  className={classes.striped}
                >
                  {row.cells.map((cell, cellIndex) => {
                    return cellIndex === lastColumnIndex ? (
                      <TableCell align="right" key={cell.row.values.id}>
                        <ListRowActions
                          status={cell.row.values.status}
                          onApproveClick={() => onApproveClick(cell.row.original)}
                          onDenyClick={() => onDenyClick(cell.row.original)}
                          onSuspendClick={() => onSuspendClick(cell.row.original)}
                          onViewDetailsClick={() => onViewDetailsClick(row.original)}
                          loading={disabledActions}
                        />
                      </TableCell>
                    ) : (
                      <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
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

ListTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(AccessPassPropType)),
  fetchData: PropTypes.func.isRequired,
  filterStatus: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  pageCount: PropTypes.number.isRequired,
  searchValue: PropTypes.string,
  disabledActions: PropTypes.bool,
  rowCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  onApproveClick: PropTypes.func,
  onDenyClick: PropTypes.func,
  onSuspendClick: PropTypes.func,
  onViewDetailsClick: PropTypes.func,
};

export default ListTable;
