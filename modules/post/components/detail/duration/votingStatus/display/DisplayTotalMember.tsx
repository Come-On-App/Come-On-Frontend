import React from 'react';
import { View } from 'react-native';

import SubMessage from '@shared/components/modal/display/SubMessage';
import useStyles from './style';
import { IDisplayTotalMember } from './type';

const showMemberCount = (count: number) => `${count}명`;

export default function DisplayTotalMember({ member }: IDisplayTotalMember) {
  const { totalMember } = useStyles();
  const memberTotalCount = showMemberCount(member);

  return (
    <View style={totalMember}>
      <SubMessage text={memberTotalCount} />
    </View>
  );
}
