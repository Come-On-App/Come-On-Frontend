import React from 'react';

import Description from '@shared/components/description/Description';

const DESCRIPTION = '등록된 모임이 없습니다. 모임을 등록해주세요!';

export default function EmptyDescription() {
  return <Description description={DESCRIPTION} position="marginTop" />;
}
