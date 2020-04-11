import React from 'react';
import { TableBody } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';


const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

export function SkeletonTable({ pageNo, rowsPerPage }) {
  return (
    <TableBody>
      {range(1, (rowsPerPage || 10)).map((i) => (
        <tr key={i} height="80px">
          <td colSpan={6} title={`Rows #${(pageNo * rowsPerPage) + i}`}>
            <Skeleton animation="wave" height={80} />
          </td>
        </tr>
      ))}
    </TableBody>
  );
}
