import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ContentHeader from '@shared/components/layout/ContentHeader';
import { ScreenTitle } from '@shared/components/font/Font';
import { CategoryType } from '@post/components/detail/planner/venue/card/category/type';
import usePlannerManagement from '@post/hooks/usePlannerManagement';
import useStyles from './style';

const tagInfo = [
  { key: 'SCHOOL', label: '학교' },
  { key: 'CAFE', label: '카페' },
  { key: 'BAR', label: '술집' },
  { key: 'SPORT', label: '스포츠' },
  { key: 'SHOPPING', label: '쇼핑' },
  { key: 'ATTRACTION', label: '관광명소' },
  { key: 'RESTAURANT', label: '음식점' },
  { key: 'ACCOMMODATION', label: '숙박' },
  { key: 'CULTURE', label: '문화시설' },
  { key: 'ACTIVITY', label: '액티비티' },
  { key: 'ETC', label: '기타' },
];
const SCREEN_TITLE = '태그';
const PLACEHOLDER_TEXT = '태그를 선택해 주세요!';
const FONT_FAMILY = 'Pretendard-SemiBold';
const [LABEL_FIELD, KEY_FIELD] = ['label', 'key'] as const;

export default function Tag() {
  const style = useStyles();
  const { dispatchCategory } = usePlannerManagement();

  return (
    <DividerWrapper>
      <ScreenLayout>
        <ContentHeader>
          <ScreenTitle>{SCREEN_TITLE}</ScreenTitle>
        </ContentHeader>
        <Dropdown
          data={tagInfo}
          labelField={LABEL_FIELD}
          valueField={KEY_FIELD}
          placeholder={PLACEHOLDER_TEXT}
          onChange={({ label }) => dispatchCategory(label as CategoryType)}
          style={style.dropdown}
          selectedTextStyle={style.dropdwonSelectedText}
          placeholderStyle={style.dropdwonPlaceholder}
          containerStyle={style.dropdwonContainer}
          itemTextStyle={style.dropdwonItemText}
          fontFamily={FONT_FAMILY}
        />
      </ScreenLayout>
    </DividerWrapper>
  );
}
