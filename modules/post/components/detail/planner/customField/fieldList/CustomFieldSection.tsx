import React, { memo, useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { isEmpty } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';

import usePlannerManagementByStatus from '@post/hooks/usePlannerManagementByStatus';
import useKeyboardAwareScroll from '@shared/hooks/useKeyboardAwareScroll';
import { fullScreenContainer } from '@shared/constants/style';
import useStyles from './style';
import CustomField from '../field/CustomField';
import FieldSelector from '../header/FieldSelector';
import Button from '../footer/SubmitButton';
import { MetaData } from '../type';
import EmptyTextField from '../../fieldDisplay/EmptyTextField';

const SubmitButton = memo(Button);

function CustomFieldSection() {
  const { scrollViewContainer } = useStyles();
  const {
    plannerState: { customModuleFields: fields },
  } = usePlannerManagementByStatus();
  const scrollViewRef = useRef<ScrollView>(null);
  const [setYCoordinate, setFocusedItemKey] =
    useKeyboardAwareScroll(scrollViewRef);
  const renderItem = (item: MetaData) => {
    return (
      <CustomField
        key={item.itemKey}
        metaData={item}
        onLayout={(event) => setYCoordinate(event, item.itemKey)}
        onFocus={() => setFocusedItemKey(item.itemKey)}
      />
    );
  };

  return (
    <SafeAreaView style={fullScreenContainer}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={fullScreenContainer}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={scrollViewContainer}
        >
          <FieldSelector />
          {isEmpty(fields) ? (
            <EmptyTextField />
          ) : (
            <View style={fullScreenContainer}>{fields.map(renderItem)}</View>
          )}
          <SubmitButton />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CustomFieldSection;
