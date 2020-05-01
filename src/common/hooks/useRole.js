import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';

export const useRole = (role) => {
  const { keycloak } = useKeycloak();
  const hasRole = keycloak.hasRealmRole(role);
  const { push } = useHistory();

  useEffect(() => {
    if (hasRole !== true) {
      push('/login');
    }
  }, [hasRole]);
};
