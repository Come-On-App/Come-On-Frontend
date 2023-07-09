export interface IinvitationModal {
  isVisible: boolean;
  code: string;
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
      onPress: () => void;
    };
  };
}
