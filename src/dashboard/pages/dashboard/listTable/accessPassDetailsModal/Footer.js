import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  footer: {
    borderTop: '1px solid #c4c4c4',
    display: 'flex',
    alignItems: 'center',
    padding: '16px 40px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      padding: '12px 24px',
      fontSize: 18,
    },
  },
  edit: {
    color: theme.palette.linkPurple,
    textDecoration: 'none',
    fontSize: 16,
  },
  save: {
    textDecoration: 'none',
    fontSize: 16,
  },
}));

const Footer = ({ handleSave }) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => { setIsEdit(true); }
  return (
    <Box className={classes.footer}>
      <div className={classes.grow} />
      {isEdit ? (
        <Button
          variant="outlined"
          color="primary"
          className={classes.save}
          href="#"
          onClick={handleSave}>
          Save
        </Button>
      ) : (
          <Button className={classes.edit} onClick={handleEdit}>
            Edit
          </Button>
        )
      }
    </Box>
  );
}

Footer.propTypes = {
  handleSave: PropTypes.func,
};

export default Footer;