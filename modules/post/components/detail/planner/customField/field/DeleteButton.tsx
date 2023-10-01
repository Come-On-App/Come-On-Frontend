import React from 'react';

import { StyledIconButton } from '@shared/components/button/Button';
import usePlannerManagement from '@post/hooks/usePlannerManagementByStatus';
import useStyles from './style';
import { IDeleteButton } from './type';

export default function DeleteButton({ itemKey }: IDeleteButton) {
  const { iconButtonContainer } = useStyles();
  const { dispatchDeleteField } = usePlannerManagement();

  return (
    <StyledIconButton
      onPress={() => {
        dispatchDeleteField(itemKey);
      }}
      iconName="delete"
      containerStyle={iconButtonContainer}
      radius
    />
  );
}
