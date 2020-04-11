import { useHistory } from 'react-router-dom';
import qs from 'query-string';

export const useQueryString = () => {
  const {
    location: { hash, pathname, search },
    push,
  } = useHistory();

  const queryString = search ? qs.parse(search) : undefined;

  const setQueryString = ({ queryString: queryStringObj }) => {
    if (!queryStringObj) {
      throw new Error('Invalid argument passed to `setQueryString()`!');
    }

    const nextQueryString = {
      ...queryString,
      ...queryStringObj,
    };

    const nextSearch = qs.stringify(nextQueryString);

    push({
      pathname,
      search: nextSearch,
      hash,
    });
  };

  return {
    queryString,
    setQueryString,
  };
};
