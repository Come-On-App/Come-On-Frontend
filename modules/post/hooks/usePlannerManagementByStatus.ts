import useDetailManagement from './useDetailManagement';
import usePlannerManagement from './usePlannerManagement';
import usePlannerEditManagement from './usePlannerEditManagement';

export default function usePlannerManagementByStatus() {
  const { detailState } = useDetailManagement();
  const management =
    detailState.status === 'CREATE'
      ? usePlannerManagement
      : usePlannerEditManagement;

  return management();
}
