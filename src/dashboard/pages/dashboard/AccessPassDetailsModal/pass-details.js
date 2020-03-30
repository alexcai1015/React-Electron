import React from 'react';
import PropTypes from 'prop-types';
import styles from './pass-details.module.css';

const PassDetails = ({ accessPass, renderCloseButton }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>Access Pass Details</div>
        {renderCloseButton}
      </div>
      <div className={styles.fields}>
        <div className={styles.field}>
          <div className={styles.label}>Name</div>
          <div className={styles.attributeValue}>{accessPass.name}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Email</div>
          <div className={styles.attributeValue}>{accessPass.email}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Contact Number</div>
          <div className={styles.attributeValue}>{accessPass.contactNumber}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Access Type</div>
          <div className={styles.attributeValue}>{accessPass.accessType}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Company</div>
          <div className={styles.attributeValue}>{accessPass.company}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Address or Destination</div>
          <div className={styles.attributeValue}>{accessPass.address}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Checkpoint</div>
          <div className={styles.attributeValue}>{accessPass.checkpoint}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Remarks</div>
          <div className={styles.attributeValue}>{accessPass.remarks}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Date of Entry</div>
          <div className={styles.attributeValue}>{accessPass.dateOfEntry}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Plate Number</div>
          <div className={styles.attributeValue}>{accessPass.plateNumber}</div>
        </div>
      </div>
    </div>
  );
};

PassDetails.propTypes = {
  accessPass: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    accessType: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    checkpoint: PropTypes.string.isRequired,
    remarks: PropTypes.string.isRequired,
    dateOfEntry: PropTypes.string.isRequired,
    plateNumber: PropTypes.string.isRequired,
  }).isRequired,
};

PassDetails.defaultProps = {
  accessPass: {
    name: 'Inigo Sarmiento',
    email: 'inigo.sarmiento@gmail.com',
    contactNumber: '96771192',
    accessType: 'Medical',
    company: 'Rizal Medical Center',
    address: 'Pasig Blvd, Pasig, 1600 Metro Manila, Pasig Blvd, Pasig, 1600 Metro Manila',
    checkpoint: 'R THADEUS ST., MRV, STA LUCIA',
    remarks: 'Nurse on duty for COVID-19. Please assist urgently.',
    dateOfEntry: '2020/03/25',
    plateNumber: 'AOZ 1531',
  },
};

export default PassDetails;
