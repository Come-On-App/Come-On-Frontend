import React from 'react';
import { uniqueId } from 'lodash';

import { StyledIconButton } from '@shared/components/button/Button';
import { hapticImpactLight } from '@shared/utils/haptics';
import { EMPTY_STRING } from '@shared/utils';
import { DropdownKey } from '@shared/components/dropdown/type';
import usePlannerManagement from '@post/hooks/usePlannerManagementByStatus';
import { IAddFieldButton } from './type';

export default function AddFieldButton({ selectedTag }: IAddFieldButton) {
  const { dispatchAddField } = usePlannerManagement();

  return (
    <StyledIconButton
      onPress={() => {
        if (!selectedTag) return;

        dispatchAddField({
          fieldType: selectedTag.key as DropdownKey,
          label: selectedTag.label,
          itemKey: uniqueId(selectedTag.key),
          content: EMPTY_STRING,
        });

        hapticImpactLight();
      }}
    />
  );
}
