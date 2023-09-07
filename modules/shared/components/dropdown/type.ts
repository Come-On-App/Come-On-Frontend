type Payload = {
  key: string;
  label: string;
};

export interface IDropdown {
  list: Payload[];
  placeholder?: string;
  onChange: (payload: Payload) => void;
}
