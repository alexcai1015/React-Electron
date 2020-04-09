import PropTypes from 'prop-types';

import { Record } from './Record.type';

export const AccessPassPropType = Record(PropTypes.string)(
  'passType',
  'aporType',
  'referenceId',
  'controlCode',
  'name',
  'company',
  'idType',
  'identifierNumber',
  'plateNumber',
  'originName',
  'originStreet',
  'originCity',
  'originProvince',
  'destName',
  'destStreet',
  'destCity',
  'destProvince',
  'status',
  'validFrom',
  'validUntil',
  'remarks',
  'updates',
  'id'
);
