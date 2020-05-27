import { useKeycloak } from '@react-keycloak/web';

import { useCreateAporType } from '../common/hooks/useCreateAporType';
import { useUpdateAporType } from '../common/hooks/useUpdateAporType';
import { useDeleteAporType } from '../common/hooks/useDeleteAporType';
import { KeycloakRoles } from '../common/constants';
import { useSnackbar } from '../hooks';

export const AporTypeActions = (aporList) => {
  const { execute: createAporType } = useCreateAporType();
  const { execute: updateAporType } = useUpdateAporType();
  const { showSnackbar } = useSnackbar();
  const { execute: deleteAporType } = useDeleteAporType();

  const { keycloak } = useKeycloak();

  const allowAddition = keycloak.hasRealmRole(KeycloakRoles.HAS_ADD_APOR_TYPE_ACCESS);
  const allowUpdate = keycloak.hasRealmRole(KeycloakRoles.HAS_UPDATE_APOR_TYPE_ACCESS);
  const allowDelete = keycloak.hasRealmRole(KeycloakRoles.HAS_DELETE_APOR_TYPE_ACCESS);

  const validateAporCode = ({ aporCode }) => /^[A-Z]{2,3}$/.test(aporCode);

  return {
    ...(allowAddition && {
      onRowAdd: (newData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            const isExisting = aporList.some(({ aporCode }) => aporCode === newData.aporCode);

            if (isExisting) {
              showSnackbar({ message: 'APOR code already exist', severity: 'error' });
              reject();
            }

            if (validateAporCode(newData)) {
              createAporType(newData);
              resolve();
            } else {
              showSnackbar({ message: 'Invalid APOR Code', severity: 'error' });
              reject();
            }
          }, 600);
        }),
    }),
    ...(allowUpdate && {
      onRowUpdate: (newData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            updateAporType(newData);
          }, 600);
        }),
    }),
    ...(allowDelete && {
      onRowDelete: (oldData) =>
        new Promise((resolve) => {
          setTimeout(() => {
            deleteAporType(oldData);
            resolve();
          }, 600);
        }),
    }),
  };
};
