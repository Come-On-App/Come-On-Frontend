import { useState } from 'react';

type Refetch = () => Promise<unknown>;
export default function useRefreshBy(refetch: Refetch) {
  const [isRefetching, setIsRefetching] = useState(false);

  async function onRefresh() {
    setIsRefetching(true);

    try {
      await refetch();
    } finally {
      setIsRefetching(false);
    }
  }

  return {
    isRefetching,
    onRefresh,
  };
}
