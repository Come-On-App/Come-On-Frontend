import React from 'react';

import Menu from '@shared/components/menu/Menu';
import { IList } from '@shared/components/menu/type';
import Icon from '@shared/components/icon/Icon';
import useDetailManagement from '@post/hooks/useDetailManagement';
import { useNavigation } from '@react-navigation/native';
import { PostDetailNavigation } from '@post/navigation/type';
import usePlannerEditManagement from '@post/hooks/usePlannerEditManagement';
import { useMutation } from '@tanstack/react-query';
import { requestDeleteMeetingPlace } from '@post/api/v1';
import { setQueryData } from '@app/api/queryClient';
import {
  DeleteMeetingPlacePayload,
  GetMeetingPlaceListResponse,
} from '@post/api/v1/type';
import { QueryKeys } from '@app/api/type';
import { INoteCardMenu } from './type';
import useStyles from './style';

export default function NoteCardMenu({ prevCardInfo }: INoteCardMenu) {
  const { dispatchState } = usePlannerEditManagement();
  const {
    dispatchPostStatus,
    dispatchCurrentCardId,
    detailState: { postId },
  } = useDetailManagement();
  const navigation = useNavigation<PostDetailNavigation<'PostDetail'>>();
  const { icon, menuFont } = useStyles();
  const { mutate } = useMutation(requestDeleteMeetingPlace, {
    onMutate: updatePlaceList,
  });
  const MenuList: IList[] = [
    {
      name: '모임 수정하기',
      onPress: (hideMenuHandler) => {
        dispatchPostStatus('EDIT');
        dispatchCurrentCardId(prevCardInfo.placeId);
        dispatchState({
          category: prevCardInfo.type,
          title: prevCardInfo.title,
          content: prevCardInfo.content,
          subContent: prevCardInfo.address,
          customModuleFields: prevCardInfo.fields,
        });
        hideMenuHandler();
        navigation.navigate('PostDetailPlanner');
      },
    },
    {
      name: '모임 삭제하기',
      onPress: () => {
        mutate({
          meetingId: postId,
          placeId: prevCardInfo.placeId,
        });
      },
      fontStyle: {
        color: 'red',
      },
    },
  ];

  return (
    <Menu
      fontAllStyle={menuFont}
      list={MenuList}
      anchor={<Icon name="more-horiz" size={icon.size} color={icon.color} />}
    />
  );
}

const updatePlaceList = (payload: DeleteMeetingPlacePayload) => {
  setQueryData<GetMeetingPlaceListResponse>(
    QueryKeys.venueList(payload.meetingId),
    (oldData) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        contentsCount: oldData.contentsCount - 1,
        contents: oldData.contents.filter(
          (item) => item.meetingPlaceId !== payload.placeId,
        ),
      };
    },
  );
};
