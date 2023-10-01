import { View } from 'react-native';
import React, { memo } from 'react';

import { DropdownPayload } from '@shared/components/dropdown/type';
import Dropdown from '@shared/components/dropdown/Dropdown';
import { fullScreenContainer } from '@shared/constants/style';
import { IFieldDropdown } from './type';

const DROPDONW_PLACEHOLDER = '필요한 모듈을 선택해주세요!';
const dropdownItems: DropdownPayload[] = [
  { key: 'LINK', label: '링크' },
  { key: 'TEXT', label: '텍스트' },
  { key: 'NOTE', label: '메모' },
  { key: 'TEL', label: '전화번호' },
];

function FieldDropdown({ tagDispatcher }: IFieldDropdown) {
  return (
    <View style={fullScreenContainer}>
      <Dropdown
        list={dropdownItems}
        onChange={tagDispatcher}
        placeholder={DROPDONW_PLACEHOLDER}
      />
    </View>
  );
}

export default memo(FieldDropdown);
