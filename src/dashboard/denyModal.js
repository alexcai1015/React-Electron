import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Form, Modal } from 'react-bootstrap';

const useStyles = makeStyles(theme => ({
  center: {
   textAlign: 'center'
  },
}));

export default function DenyApplicationModal() {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);

  const openPopup = () => {
    setShow(true);
  };

  const closePopup = () => {
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" onClick={openPopup}>
        Deny
      </Button>
      <Modal
        show={show}
        onHide={closePopup}
      >
          <Modal.Header>
            <Modal.Title>Deny Application?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p className={classes.center}>
              Are you sure you want to <br />
              DENY APPLICATION?
            </p>
            <div>
              Remarks
              <Form.Control as="textarea" rows="7" columns="7" placeholder="State reason" />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={closePopup}>YES, DENY</Button>
            <Button variant="secondary" onClick={closePopup}>CANCEL</Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}
