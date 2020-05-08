import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { removeUser, clearAccessPass } from '../../store/slices';

export const useLogout = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const execute = () => {
    dispatch(removeUser());
    dispatch(clearAccessPass());
    push('/auth/logout');
  };

  return {
    execute,
  };
};
