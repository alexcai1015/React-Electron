import { Dashboard } from '../../../dashboard/pages/Dashboard';
import { BulkUpload } from '../../../bulkUpload/BulkUpload';
import { ChangePassword } from '../../../pages/ChangePassword';

export const PROTECTED_ROUTES = [
  {
    path: '/access-passes',
    exact: true,
    title: 'Approvals',
    component: Dashboard,
    show: true
  },
  {
    path: '/bulk-upload',
    exact: true,
    title: 'Bulk Upload',
    component: BulkUpload,
    show: true
  },
  {
    path: '/change-password',
    exact: true,
    title: 'Change Password',
    component: ChangePassword,
    show: false
  },
];