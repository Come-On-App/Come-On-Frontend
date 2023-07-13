import { IinvitationModal } from '@post/components/invitation/modal/type';

/**
 * 초대코드 생성할때
 */
export const mockInvitationModal1: IinvitationModal = {
  isVisible: true,
  code: '------',
  type: 'Loading',
};

/**
 * 초대코드가 만료됐을때
 */
export const mockInvitationModal2: IinvitationModal = {
  isVisible: true,
  code: '------',
  type: 'Expired',
};

/**
 * 초대코드 생성됐을때
 */
export const mockInvitationModal3: IinvitationModal = {
  isVisible: true,
  code: '4AABCA',
  type: 'Created',
};

/**
 * 초대코드 복사됐을때
 */
export const mockInvitationModal4: IinvitationModal = {
  isVisible: true,
  code: '4AABCA',
  type: 'Copied',
};
