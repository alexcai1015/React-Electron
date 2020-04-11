import { useApiMutation, HttpMethod } from '../api';
import { maybe } from '../utils/monads';

const isRequestSuccess = (status) => status === 0 || (status >= 200 && status < 400);

export const useUpdateAccessPass = () => {
  const { execute: put, ...others } = useApiMutation(
    '/v1/registry/access-passes/{{referenceId}}',
    HttpMethod.Put
  );
  const httpResponse = maybe({})(others.httpResponse);
  const isSuccess = isRequestSuccess(httpResponse.status) || false;

  const execute = (referenceId, data) => {
    put({
      urlPathParams: {
        referenceId,
      },
      requestData: data,
    });
  };

  return {
    execute,
    isSuccess,
    ...others,
  };
};
