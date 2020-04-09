import React, { useEffect, useMemo } from 'react';
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
import { usePagination, useSortBy, useTable, useGlobalFilter } from 'react-table';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Colors } from '../../../common/constants/Colors';
import { setCurrentAccessPass } from '../../../store/slices';
import { AccessPassPropType } from '../../../types';

import { ListHeaderCell } from './listTable/ListHeaderCell';
import { ListTablePaginationActions } from './listTable/ListTablePaginationActions';
import { ListRowActions } from './listTable/ListRowActions';
import { SkeletonTable } from './listTable/SkeletonTable';

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

export const ListTable = ({
  value,
  loading,
  searchValue,
  disabledActions,
  onApproveClick,
  onDenyClick,
  onViewDetailsClick,
}) => {
  const dispatch = useDispatch();
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

    // ? TODO - Remove later once search thru API is ready
    setGlobalFilter,
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
      data: useMemo(() => value, [value]),
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  /** API Hooks */

  // ? TODO - Remove later once search thru API is ready
  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue, setGlobalFilter]);

  /** Modals' States  */

  useEffect(() => {
    return () => {
      dispatch(setCurrentAccessPass({}));
    };
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    gotoPage(0);
  };

  const totalRecordsCount = rows.length;
  const lastColumnIndex = 5;

  return (
    <>
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
                    {...column.getHeaderProps(column.getSortByToggleProps())}
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
            <SkeletonTable />
          ) : (
            <TableBody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);

                return (
                  <TableRow {...row.getRowProps()} className={classes[`striped${rowIndex % 2}`]}>
                    {row.cells.map((cell, cellIndex) => {
                      return cellIndex === lastColumnIndex ? (
                        <TableCell align="right" key={cell.row.values.id}>
                          <ListRowActions
                            status={cell.row.values.status}
                            onApproveClick={() => onApproveClick(cell.row.original)}
                            onDenyClick={() => onDenyClick(cell.row.original)}
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
                rowsPerPageOptions={[5, 10, 25, 50]}
                colSpan={headerGroups[0].headers.length}
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
    </>
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
  value: PropTypes.arrayOf(PropTypes.shape(AccessPassPropType)),
  loading: PropTypes.bool,
  searchValue: PropTypes.string,
  disabledActions: PropTypes.bool,
  onApproveClick: PropTypes.func,
  onDenyClick: PropTypes.func,
  onViewDetailsClick: PropTypes.func,
};

export default ListTable;
