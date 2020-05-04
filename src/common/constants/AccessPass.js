import PropTypes from 'prop-types';

/** Shape for Access Pass */
export const AccessPass = {
  aporType: PropTypes.string,
  company: PropTypes.string,
  referenceId: PropTypes.string,
  destCity: PropTypes.string,
  destName: PropTypes.string,
  destProvince: PropTypes.string,
  destStreet: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
  idType: PropTypes.string,
  name: PropTypes.string,
  passType: PropTypes.string,
  remarks: PropTypes.string,
  updates: PropTypes.string,
  status: PropTypes.string,
  controlCode: PropTypes.string,
  notified: PropTypes.boolean,
}