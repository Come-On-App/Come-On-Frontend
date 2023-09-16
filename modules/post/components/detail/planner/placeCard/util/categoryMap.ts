import { CategoryKey, CategoryLabel } from '@post/api/v2/type';

export const tagInfo = [
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

const categoryMap = {
  SCHOOL: '학교',
  CAFE: '카페',
  BAR: '술집',
  SPORT: '스포츠',
  SHOPPING: '쇼핑',
  ATTRACTION: '관광명소',
  RESTAURANT: '음식점',
  ACCOMMODATION: '숙박',
  CULTURE: '문화시설',
  ACTIVITY: '액티비티',
  ETC: '기타',
} as {
  [Key in CategoryKey]: CategoryLabel;
};

/**
 * 장소 카테고리 문자열 치환.
 */
export function replaceCategoryLabelToKey(categoryKey: CategoryKey) {
  return categoryMap[categoryKey];
}
