import { useDispatch } from 'react-redux';

import { removeUser, clearAccessPass } from '../../store/slices';

export const useLogout = () => {
  const dispatch = useDispatch();

  const execute = () => {
    dispatch(removeUser());
    dispatch(clearAccessPass());
  };

  return {
    execute,
  };
};
