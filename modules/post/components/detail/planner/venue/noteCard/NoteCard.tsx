import { View } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import Title from './text/Title';
import Category from './category/Category';
import { InoteCard } from './type';
import Content from './text/Content';
import Address from './text/Address';
import NoteCardMenu from './menu/Menu';
import useStyles from './style';

export default function NoteCard({ info }: InoteCard) {
  const { container, cTitle, cMenu, cContent, cDescription } = useStyles();

  return (
    <View style={container} testID={TestId.post.noteCard}>
      <View style={cContent}>
        {/* 카드 상단 */}
        <View style={cTitle}>
          <Title text={info.title} />
          <Category type={info.type} />
        </View>
        {/* 카드 메인 */}
        <View style={cDescription}>
          <Content text={info.content} />
          <Address text={info.address} />
        </View>
      </View>
      {/* 카드 오른쪽 메뉴 */}
      <View style={cMenu}>
        <NoteCardMenu />
      </View>
    </View>
  );
}
