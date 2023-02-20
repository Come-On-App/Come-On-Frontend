import { QueryClient } from 'react-query';

export enum QueryKeys {
  user = 'user',
  meeting = 'meeting',
}

export const queryClient = new QueryClient({});

export const updateCache = <Payload>(queryKey: QueryKeys, payalod: Payload) => {
  queryClient.setQueryData(queryKey, payalod);
};

export const getCache = <Payload>(queryKey: QueryKeys) => {
  return queryClient.getQueryData<Payload>(queryKey);
};

export const cancelQueries = (queryKey: QueryKeys) => {
  queryClient.cancelQueries(queryKey);
};

export const invalidateQueries = (queryKey: QueryKeys[]) => {
  queryClient.invalidateQueries(queryKey);
};

export const useQueryCache = <Payalod>(queryKey: QueryKeys) => {
  const updateQueryCache = (payload: Partial<Payalod>) => {
    updateCache(queryKey, payload);
  };
  const getQueryCache = () => {
    return getCache<Payalod>(queryKey);
  };
  const cancelQueryCache = () => {
    cancelQueries(queryKey);
  };

  return {
    updateQueryCache,
    getQueryCache,
    cancelQueryCache,
  };
};
