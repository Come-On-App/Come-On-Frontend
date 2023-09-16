export type DropdownKey = 'LINK' | 'TEXT' | 'NOTE' | 'TEL';

export type DropdownLabel = '링크' | '텍스트' | '메모' | '전화번호';

export type DropdownPayload = {
  key: string;
  label: string;
};

export interface IDropdown {
  list: DropdownPayload[];
  placeholder?: string;
  onChange: (payload: DropdownPayload) => void;
  value?: DropdownPayload;
}
