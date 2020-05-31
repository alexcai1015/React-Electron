import { Dashboard } from '../../../dashboard/pages/Dashboard';
import { BulkUpload } from '../../../bulkUpload/BulkUpload';
import { ChangePassword } from '../../../pages/ChangePassword';
import { CheckApplicationStatus } from '../../../dashboard/pages/CheckApplicationStatus';
import { KeycloakRoles } from '../../constants';
import { AporTypes } from '../../../aporTypes/AporTypes';
import { CheckpointDevices } from '../../../pages/CheckpointDevices';

export const PROTECTED_ROUTES = [
  {
    path: '/access-passes',
    exact: true,
    title: 'Applications',
    component: Dashboard,
    show: true,
    role: KeycloakRoles.HAS_VIEW_DETAILS_ACCESS,
  },
  {
    path: '/bulk-upload',
    exact: true,
    title: 'Bulk Upload',
    component: BulkUpload,
    show: true,
    role: KeycloakRoles.HAS_BULK_UPLOAD_ACCESS,
  },
  {
    path: '/check-status',
    exact: true,
    title: 'Check Status',
    component: CheckApplicationStatus,
    show: true,
    role: KeycloakRoles.HAS_CHECK_APPLICATION_STATUS,
  },
  {
    path: '/apor-types',
    exact: true,
    title: 'APOR',
    component: AporTypes,
    show: true,
    role: KeycloakRoles.HAS_VIEW_APOR_TYPE_ACCESS,
  },
  {
    path: '/change-password',
    exact: true,
    title: 'Change Password',
    component: ChangePassword,
    show: false,
    role: KeycloakRoles.HAS_VIEW_DETAILS_ACCESS,
  },
  {
    path: '/checkpoint-devices',
    exact: true,
    title: 'Checkpoint Devices',
    component: CheckpointDevices,
    show: true,
    role: KeycloakRoles.HAS_ADD_DEVICE_RECORD_ACCESS,
  },
];
