type ModalStatus = 'Loading' | 'Created' | 'Expired' | 'Copied';

export type ModalType = {
  [Key in ModalStatus]: {
    message: {
      status: string;
      subStatus: string;
    };
    button: {
      left: {
        text: string;
        color?: string;
        disabled: boolean;
      };
      right: {
        text: string;
        color?: string;
        disabled: boolean;
      };
    };
  };
};

export interface IinvitationModal {
  isVisible: boolean;
  code: string;
  type: ModalStatus;
  onPressRight: () => void;
}
