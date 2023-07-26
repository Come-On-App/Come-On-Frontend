import React, { useEffect, useState } from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import PressableInput from '@shared/components/input/PressableInput';
import { useNavigation } from '@react-navigation/native';
import { postListNavigationProps } from '@post/navigation/type';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import useStyles from './style';
import { ItimeRange } from './type';

export default function TimeRange({
  prevRange,
  title,
  description,
  onPressDay,
}: ItimeRange) {
  const [range, setRange] = useState<string | null>(prevRange);
  const { container, icon, font } = useStyles();
  const navigation = useNavigation<postListNavigationProps>();
  const onPressHandler = () => {
    navigation.navigate('MeetingDateSelector');
  };

  useEffect(() => {
    onPressDay(setRange);
  }, [onPressDay]);

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{title}</ScreenTitle>
        </ContentHeader>
        <PressableInput
          onPress={onPressHandler}
          text={range ?? description}
          icon={icon}
          containerStyle={container}
          fontColor={font.color}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
