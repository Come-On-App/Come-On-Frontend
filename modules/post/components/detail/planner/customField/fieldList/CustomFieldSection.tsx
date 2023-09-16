import React, { memo } from 'react';
import { View, SectionList } from 'react-native';
import { isEmpty } from 'lodash';

import usePlannerManagementByStatus from '@post/hooks/usePlannerManagementByStatus';
import useStyles from './style';
import CustomField from '../field/CustomField';
import FieldSelector from '../header/FieldSelector';
import Button from '../footer/SubmitButton';
import { MetaData } from '../type';
import EmptyTextField from '../../fieldDisplay/EmptyTextField';

const SubmitButton = memo(Button);

function CustomFieldSection() {
  const { sectionContentContainer, sectionListContainer } = useStyles();
  const {
    plannerState: { customModuleFields: fields },
  } = usePlannerManagementByStatus();
  const sections = isEmpty(fields)
    ? []
    : [{ title: 'Custom Fields', data: fields }];
  const renderItem = ({ item }: { item: MetaData }) => {
    return <CustomField key={item.itemKey} metaData={item} />;
  };

  return (
    <View style={sectionListContainer}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.itemKey}
        ListHeaderComponent={<FieldSelector />}
        ListEmptyComponent={<EmptyTextField />}
        contentContainerStyle={sectionContentContainer}
      />
      <SubmitButton />
    </View>
  );
}

export default CustomFieldSection;
