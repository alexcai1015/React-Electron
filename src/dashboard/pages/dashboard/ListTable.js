import React, { useMemo, useState } from 'react';
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
import { useDispatch } from 'react-redux';

import { Colors } from '../../../common/constants/Colors';
import { SnackbarAlert } from '../../../common/components/SnackbarAlert';
import { useUpdateAccessPass } from '../../../common/hooks';
import { approveAccessPassById } from '../../../store/slices';
import { ApprovalStatus } from '../../../common/constants';

import { ListHeaderCell } from './listTable/ListHeaderCell';
import { ListTablePaginationActions } from './listTable/ListTablePaginationActions';
import { ListRowActions } from './listTable/ListRowActions';
import DenyApplicationModal from './DenyApplicationModal';
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

export function ListTable({ getAccessPassesQuery, value, isLoading }) {
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
    useSortBy,

    // ! `usePagination()` must come after `useSortBy()`
    usePagination
  );

  /** API Hooks */
  const { execute: executeUpdate, error: errorUpdate } = useUpdateAccessPass();

  /** Modals' States  */

  const [isDenyModalOpen, setIsDenyModalOpen] = useState(false);
  const [isDetailsOpen, setIsdDetailsOpen] = useState(false);

  // ! TODO: remove this `accessPassReferenceId` state
  const [accessPassReferenceId, setAccessPassReferenceId] = useState('');
  const [updatedAccessPass, setUpdatedAccessPass] = useState(null);
  const [errorFromUpdate, setErrorFromUpdate] = useState('');
  const [passDetails, setPassDetails] = useState(null);

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    gotoPage(0);
  };

  const handleApproveActionClick = (accessPass) => {
    const { referenceId, id, status } = accessPass;

    if (status !== ApprovalStatus.Pending) {
      return;
    }

    executeUpdate(referenceId, { status: 'APPROVED' });
    dispatch(approveAccessPassById(id));

    setUpdatedAccessPass(accessPass);
    setErrorFromUpdate(errorUpdate);
  };

  const handleDenyActionClick = (referenceId) => {
    setIsDenyModalOpen(true);
    setAccessPassReferenceId(referenceId);
  };

  const handleViewDetailsClick = ({ referenceId, details }) => {
    setIsdDetailsOpen(true);
    setAccessPassReferenceId(referenceId);
    setPassDetails(details);
  };

  const handleSetPassDetailsClose = () => {
    setIsdDetailsOpen(false);
    setPassDetails(null);
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
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()} className={classes[`striped${index % 2}`]}>
                    {row.cells.map((cell, index) => {
                      return index === lastColumnIndex ? (
                        <TableCell align="center" key={cell.row.values.id}>
                          <ListRowActions
                            status={cell.row.values.status}
                            onApproveClick={() => handleApproveActionClick(cell.row.original)}
                            onDenyClick={() => handleDenyActionClick(cell.row.values.idNumber)}
                            onViewDetailsClick={() =>
                              handleViewDetailsClick({
                                referenceId: cell.row.values.idNumber,
                                details: row.original,
                              })}
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

      <DenyApplicationModal
        open={isDenyModalOpen}
        handleClose={() => setIsDenyModalOpen(false)}
        accessPassReferenceId={accessPassReferenceId}
      />
      <AccessPassDetailsModal
        open={isDetailsOpen}
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

export default ListTable;
