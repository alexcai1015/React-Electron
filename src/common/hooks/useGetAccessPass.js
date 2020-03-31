import { useCallback } from 'react';

import { useApiQuery } from '../api';

const mapToAccessPass = (data) => ({
  ...data,
  id: data.identifierNumber,
  status: String(data.status).toLowerCase(),
});

export const useGetAccessPass = () => {
  const { data: accessPasses, query: execute, ...others } = useApiQuery(
    '/v1/registry/access-passes/{{referenceId}}'
  );

  const query = useCallback(
    (referenceId) => {
      if (referenceId) {
        execute({
          urlPathParams: {
            referenceId,
          },
        });
      }
    },
    [execute]
  );

  const data = accessPasses ? mapToAccessPass(accessPasses) : {};

  return {
    data,
    query,
    ...others,
  };
};
