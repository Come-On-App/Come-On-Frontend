import React from 'react';

import Description from '@shared/components/description/Description';

const DESCRIPTION = '공유 받은 입장 코드를 입력해 주세요';

export default function CodeDescription() {
  return <Description description={DESCRIPTION} />;
}
