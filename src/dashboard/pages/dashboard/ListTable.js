import React, { useEffect, useMemo, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Colors } from '../../../common/constants/Colors';
import { SnackbarAlert } from '../../../common/components/SnackbarAlert';
import { useUpdateAccessPass, useGetAccessPasses } from '../../../common/hooks';
import { approveAccessPassById, getAccessPasses } from '../../../store/slices';
import { ApprovalStatus } from '../../../common/constants';

import { DenyApplicationModal } from './listTable/DenyApplicationModal';
import { ListHeaderCell } from './listTable/ListHeaderCell';
import { ListTablePaginationActions } from './listTable/ListTablePaginationActions';
import { ListRowActions } from './listTable/ListRowActions';
import AccessPassDetailsModal from './AccessPassDetailsModal';
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

export function ListTable({ searchValue }) {
  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);

  // ! TODO: remove this `accessPass` state
  const [accessPass, setAccessPass] = useState(undefined);

  // ! TODO: use `useSnackbar()` to remove `updatedAccessPass()` state
  const [updatedAccessPass, setUpdatedAccessPass] = useState(null);

  // ! TODO: use `useSnackbar()` to remove `errorFromUpdate()` state
  const [errorFromUpdate, setErrorFromUpdate] = useState('');

  // ! TODO: remove `passDetails` state and use `accessPass` instead
  const [passDetails, setPassDetails] = useState(null);

  const dispatch = useDispatch();
  const classes = listTableStyles();

  const { isLoading, query: getAccessPassesQuery } = useGetAccessPasses();

  const data = useSelector(getAccessPasses);

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
      data: useMemo(() => data, [data]),
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  /** API Hooks */
  const { execute: executeUpdate, error: errorUpdate } = useUpdateAccessPass();

  // ? TODO - Remove later once search thru API is ready
  useEffect(() => {
    setGlobalFilter(searchValue);
  }, [searchValue, setGlobalFilter]);

  /** Modals' States  */

  useEffect(() => {
    getAccessPassesQuery();
  }, [getAccessPassesQuery]);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    gotoPage(0);
  };

  const handleApproveActionClick = (accessPassTableRowData) => {
    const { id, status } = accessPassTableRowData;

    if (status !== ApprovalStatus.Pending) {
      return;
    }

    executeUpdate(accessPassTableRowData.referenceId, {
      status: ApprovalStatus.Approved.toUpperCase(),
    });

    dispatch(approveAccessPassById(id));

    setUpdatedAccessPass(accessPass);
    setErrorFromUpdate(errorUpdate);
  };

  const handleDenyActionClick = (accessPassTableRowData) => {
    setIsDenyModalOpen(true);
    setAccessPass(accessPassTableRowData);
  };

  const handleViewDetailsClick = (accessPassTableRowData) => {
    setPassDetails(accessPassTableRowData);
  };

  const handleSetPassDetailsClose = () => {
    setPassDetails(null);
  };

  const handleOnDenyModalClose = () => {
    setIsDenyModalOpen(false);
    setAccessPass(null);
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
          {isLoading ? (
            <SkeletonTable />
          ) : (
            <TableBody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);

                return (
                  <TableRow {...row.getRowProps()} className={classes[`striped${rowIndex % 2}`]}>
                    {row.cells.map((cell, cellIndex) => {
                      return cellIndex === lastColumnIndex ? (
                        <TableCell align="center" key={cell.row.values.id}>
                          <ListRowActions
                            status={cell.row.values.status}
                            onApproveClick={() => handleApproveActionClick(cell.row.original)}
                            onDenyClick={() => handleDenyActionClick(cell.row.original)}
                            onViewDetailsClick={() => handleViewDetailsClick(row.original)}
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

      <DenyApplicationModal
        open={isDenyModalOpen}
        accessPass={accessPass}
        onClose={handleOnDenyModalClose}
      />

      <AccessPassDetailsModal
        open={!!passDetails}
        handleClose={handleSetPassDetailsClose}
        passDetails={passDetails}
      />
      <SnackbarAlert
        open={!!updatedAccessPass}
        onClose={() => {
          setUpdatedAccessPass(null);
          setErrorFromUpdate('');
        }}
        message={
          updatedAccessPass &&
          `${errorFromUpdate ? 'Failed to approve' : 'Approved'} ${updatedAccessPass.id}`
        }
        severity={!errorFromUpdate ? 'success' : 'warning'}
        autoHideDuration={2500}
      />
    </>
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

ListTable.propTypes = {
  searchValue: PropTypes.string,
};

export default ListTable;
