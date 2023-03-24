import { QueryClient } from 'react-query';

type QueryKeyType = QueryKeys | string | number;

export enum QueryKeys {
  user = 'user',
  meetings = 'meetings',
  meetingDetail = 'meetingDetail',
  place = 'place',
  members = 'members',
  time = 'time',
  voting = 'voting',
  votingDetails = 'votingDetails',
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
    },
  },
});

export const updateCache = <Payload>(
  queryKey: QueryKeyType[],
  payalod: Payload,
) => {
  queryClient.setQueryData(queryKey, payalod);
};

export const getCache = <Payload>(queryKey: QueryKeyType[]) => {
  return queryClient.getQueryData<Payload>(queryKey);
};

export const cancelQueries = (queryKey: QueryKeyType[]) => {
  queryClient.cancelQueries(queryKey);
};

export const invalidateQueries = (queryKey: QueryKeyType[]) => {
  queryClient.invalidateQueries(queryKey);
};

export const useQueryCache = <Payalod>(queryKey: QueryKeyType[]) => {
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
