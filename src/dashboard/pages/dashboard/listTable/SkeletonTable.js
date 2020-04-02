import React from 'react';
import { TableBody } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const defaultRowsPerPage = 15; // probably import from ListTable pagination
const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

export function SkeletonTable() {
  return (
    <>
      <TableBody>
        {range(0, defaultRowsPerPage).map((i) => (
          <tr key={i}>
            <td colSpan={6}>
              <Skeleton animation="wave" height={80} />
            </td>
          </tr>
        ))}
      </TableBody>
    </>
  );
}
