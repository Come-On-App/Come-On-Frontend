import React, { useEffect, useState } from 'react';

import { ScreenTitle } from '@shared/components/font/Font';
import PressableInput from '@shared/components/input/PressableInput';
import { useNavigation } from '@react-navigation/native';
import { postListNavigationProps } from '@post/navigation/type';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { formatDateRange } from '@shared/utils';
import { postCreatorPayload } from '@post/payload/creatorPayload';
import useStyles from './style';

const TITLE = '투표 기간';
const DESCRIPTION = '날짜 범위를 선택해 주세요';
const OVERWRITE = true;

export default function VotingTimeRangePicker() {
  const [range, setRange] = useState<string | null>(null);
  const { container, icon, font } = useStyles();
  const navigation = useNavigation<postListNavigationProps>();
  const onPressHandler = () => {
    navigation.navigate('MeetingDateSelector');
  };

  useEffect(() => {
    postCreatorPayload.observe(
      ({ meetingDateRange: { startFrom, endTo } }) => {
        if (!startFrom) {
          setRange(null);

          return;
        }

        // startFrom이 존재하는 경우, startFrom.dateString을 포맷하여 범위 설정
        if (startFrom) {
          const formattedStartDate = formatDateRange({
            startFrom: startFrom.dateString,
          });

          setRange(formattedStartDate);
        }

        // startFrom과 endTo가 모두 존재하는 경우, 두 날짜를 포맷하여 범위 설정
        if (startFrom && endTo) {
          const formatedDate = formatDateRange({
            startFrom: startFrom.dateString,
            endTo: endTo.dateString,
          });

          setRange(formatedDate);
        }
      },
      'post_observe_range',
      OVERWRITE,
    );
  }, []);

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{TITLE}</ScreenTitle>
        </ContentHeader>
        <PressableInput
          onPress={onPressHandler}
          text={range ?? DESCRIPTION}
          icon={icon}
          containerStyle={container}
          fontColor={font.color}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
