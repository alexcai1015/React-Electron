import { withStyles } from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';

export const ListHeaderCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
