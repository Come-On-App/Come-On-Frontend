import React from 'react';

import Description from '@shared/components/description/Description';
import { Status } from '@connection/components/type';

const DEFAULT_DESCRIPTION = '공유 받은 입장 코드를 입력해 주세요.';
const LOADING_DESCRIPTION = '입장 코드를 조회 중입니다. 잠시만 기다려 주세요.';

export default function CodeDescription({
  joinStatus,
}: {
  joinStatus: Status;
}) {
  const { isError, isLoading, errorMessage } = joinStatus;
  const a = isLoading ? LOADING_DESCRIPTION : DEFAULT_DESCRIPTION;
  const DESCRIPTION = isError ? errorMessage : a;

  return (
    <Description
      description={DESCRIPTION}
      fontStyle={{ color: isError ? '#F05E51' : undefined }}
    />
  );
}
