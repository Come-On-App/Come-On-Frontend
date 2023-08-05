import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { ScreenTitle } from '@shared/components/font/Font';
import PressableInput from '@shared/components/input/PressableInput';
import { PostListNavigation } from '@post/navigation/type';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { getFormattedDateRange } from '@shared/utils';
import useStyles from './style';
import { ItimeRange } from './type';

export default function DateRange({
  title,
  description,
  disabled,
  dateRange,
}: ItimeRange) {
  const { container, icon, font } = useStyles();
  const navigation = useNavigation<PostListNavigation>();

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{title}</ScreenTitle>
        </ContentHeader>
        <PressableInput
          disabled={disabled}
          onPress={() =>
            navigation.navigate('MeetingDateSelector', {
              prevDateRange: dateRange,
            })
          }
          text={getFormattedDateRange(dateRange) || description}
          icon={icon}
          containerStyle={container}
          fontColor={font.color}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
