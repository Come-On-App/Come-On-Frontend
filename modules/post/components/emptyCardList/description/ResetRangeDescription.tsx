import React from 'react';

import Description from '@shared/components/description/Description';

const DESCRIPTION = '조건에 맞는 모임이 없습니다.';

export default function ResetRangeDescription() {
  return <Description description={DESCRIPTION} position="marginTop" />;
}
