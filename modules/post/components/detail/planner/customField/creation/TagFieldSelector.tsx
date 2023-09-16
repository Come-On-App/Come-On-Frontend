import { View } from 'react-native';
import React, { useState } from 'react';

import { DropdownPayload } from '@shared/components/dropdown/type';
import FieldDropdown from './FieldDropdown';
import AddFieldButton from './AddButton';
import useStyles from './style';

/**
 * 커스텀 모듈 선택 드롭박스 버튼
 */
function TagFieldSelector() {
  const { selectorContainer } = useStyles();
  const [selectedTag, setSelectedTag] = useState<DropdownPayload>();

  return (
    <View style={selectorContainer}>
      <FieldDropdown tagDispatcher={setSelectedTag} />
      <AddFieldButton selectedTag={selectedTag} />
    </View>
  );
}

export default TagFieldSelector;
