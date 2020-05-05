import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getUsername } from '../../store/slices';
import { UserRoles, Roles } from '../constants';

export const useGetRole = () => {
  const username = useSelector(getUsername);

  const selectedRole = useMemo(() => {
    const userRole = UserRoles.find((u) => u.username === username);
    return userRole ? userRole.role : Roles.APPROVER;
  }, [username]);

  if (!username) {
    return null;
  }

  return selectedRole;
};
