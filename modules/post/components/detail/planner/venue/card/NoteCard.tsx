import { Pressable, View } from 'react-native';
import React from 'react';

import TestId from '@shared/constants/testIds';
import { useNavigation } from '@react-navigation/native';
import { PostDetailNavigation } from '@post/navigation/type';
import Title from './text/Title';
import Category from './category/Category';
import { INoteCard } from './type';
import Content from './text/Content';
import Address from './text/Address';
import NoteCardMenu from './menu/Menu';
import useStyles from './style';
import { replaceCategoryLabelToKey } from '../../placeCard/util/categoryMap';

export default function NoteCard({ info, showRightIcon }: INoteCard) {
  const { container, cTitle, cMenu, cContent, cDescription } =
    useStyles(showRightIcon);
  const { address, content, title, type, fields } = info;
  const { navigate } = useNavigation<PostDetailNavigation<'PostDetail'>>();

  return (
    <View style={container} testID={TestId.post.noteCard}>
      <Pressable
        style={[cContent]}
        onPress={() => navigate('PostDetailMeetingCardDetail', { fields })}
      >
        {/* 카드 상단 */}
        <View style={cTitle}>
          <Title text={title} />
          <Category type={replaceCategoryLabelToKey(type)} />
        </View>
        {/* 카드 메인 */}
        <View style={cDescription}>
          <Content text={content} />
          <Address text={address} />
        </View>
      </Pressable>
      {/* 카드 오른쪽 메뉴 */}
      {showRightIcon ? (
        <View style={cMenu}>
          <NoteCardMenu prevCardInfo={info} />
        </View>
      ) : null}
    </View>
  );
}
