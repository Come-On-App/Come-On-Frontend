import { IinvitationModal } from '@post/components/invitation/modal/type';

/**
 * 초대코드 생성할때
 */
export const mockInvitationModal1: IinvitationModal = {
  isVisible: false,
  code: '------',
  type: 'Loading',
  onPressLeft: () => null,
  onPressRight: () => null,
};

/**
 * 초대코드가 만료됐을때
 */
export const mockInvitationModal2: IinvitationModal = {
  isVisible: false,
  code: '4ACBCA',
  type: 'Expired',
  onPressLeft: () => null,
  onPressRight: () => null,
};

/**
 * 초대코드 생성됐을때
 */
export const mockInvitationModal3: IinvitationModal = {
  isVisible: false,
  code: '4AABCA',
  type: 'Created',
  onPressLeft: () => null,
  onPressRight: () => null,
};

/**
 * 초대코드 복사됐을때
 */
export const mockInvitationModal4: IinvitationModal = {
  isVisible: false,
  code: '4AABCA',
  type: 'Copied',
  onPressLeft: () => null,
  onPressRight: () => null,
};

/**
 * 초대코드 실패했을때
 */
export const mockInvitationModal5: IinvitationModal = {
  isVisible: false,
  code: '------',
  type: 'Failed',
  onPressLeft: () => null,
  onPressRight: () => null,
};
