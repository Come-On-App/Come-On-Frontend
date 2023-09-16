import React from 'react';
import { Skeleton } from '@rneui/themed';

import { relativeSizeConverter } from '@shared/utils';

export default function VenueListSkeleton() {
  return (
    <>
      <VenueSkeleton />
      <VenueSkeleton />
    </>
  );
}

function VenueSkeleton() {
  return (
    <Skeleton
      accessibilityHint="loading"
      width="100%"
      height={relativeSizeConverter(80)}
      style={{ marginBottom: relativeSizeConverter(12) }}
    />
  );
}
