/* eslint-disable padding-line-between-statements */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Dimensions,
  ViewStyle,
  StyleProp,
  ScrollView,
  Keyboard,
  Pressable,
} from 'react-native';

import { promiseFlow, usePromiseFlow } from '@utils/promise';
import {
  CreateMeetingNavigation,
  RootStackScreenProps,
} from '@type/navigation';
import { Ids, EditInpurFormProps, InputTextProps } from '@type/index';
import useAnimationBounce from '@hooks/useAnim';
import {
  requestCreateMeetings,
  requestGetMeetingDetail2,
  requestPatchMeetings,
} from '@api/meeting/meetings';
import { MeetingId } from '@type/meeting.create';

import useMeeting, { getPayloadByMeetingMode } from '@hooks/useMeeting';
import { AssetState } from '@type/hook.imagePicker';
import { requestImageUpload } from '@api/image/upload';
import { useQuery } from 'react-query';
import { invalidateQueries, QueryKeys } from '@api/queryClient';
import { AnimationInputBox } from '@components/input/InputText';
import { makeStyles } from '@rneui/themed';
import { MeetingMode } from '@features/meetingSlice';
import { errorAlert, successAlert } from '@utils/alert';
import FlexButtons from '@components/button/FlexButtons';

import {
  AnimationInputDate,
  InputImageWithAinm,
} from '../../../components/input/InputForm';

type ValuesType = {
  [key in Ids]: string;
};

function AnimTrigger({
  trigger,
  values,
}: {
  trigger: (key: 'name' | 'image' | 'date') => void;
  values: ValuesType;
}) {
  const keys = Object.keys(values) as Ids[];
  const len = keys.length;
  let i = 0;
  let isValid = false;

  while (i < len) {
    const key = keys[i];
    isValid = !!values[key];
    if (!isValid) {
      trigger(key);
      break;
    }
    isValid = true;
    i += 1;
  }
  return isValid;
}

interface LayoutProps {
  children: React.ReactNode;
  containerStyle: StyleProp<ViewStyle>;
}
const { width } = Dimensions.get('window');

function LayoutHeight({ children, containerStyle }: LayoutProps) {
  const styles = useStyles();

  const sizeStyle = width < 385 ? styles.smallContainerStyle : {};
  return <View style={[containerStyle, sizeStyle]}>{children}</View>;
}

function CreateMeeting({
  navigation,
  route: {
    params: { mode, meetingId },
  },
}: RootStackScreenProps<'CreateMeeting'>) {
  const { setMeetingMode, setCurrentMeetingId } = useMeeting();
  const { resetMeetingData } = useMeeting();
  const styles = useStyles();

  useEffect(() => {
    setMeetingMode(mode);
  }, [mode, setMeetingMode]);
  const {
    error,
    isSuccess,
    isError,
    data: datas,
  } = usePromiseFlow<AssetState, MeetingId>();

  const { trigger, AnimationBounceView } = useAnimationBounce([
    'name',
    'image',
    'date',
  ]);

  useEffect(() => {
    if (isSuccess && datas) {
      resetMeetingData();
      navigation.reset({
        index: 1,
        routes: [{ name: 'Root' }, { name: 'MeetingRoom' }],
      });
    }
  }, [datas, error, isError, isSuccess, navigation, resetMeetingData]);

  useEffect(() => {
    if (mode === MeetingMode.edit) {
      navigation.setOptions({
        title: '모임수정',
      });
    }
    if (meetingId) {
      setCurrentMeetingId(meetingId);
    }
  }, [meetingId, mode, navigation, resetMeetingData, setCurrentMeetingId]);
  useEffect(() => {
    return () => {
      resetMeetingData();
    };
  }, [resetMeetingData]);
  return (
    <LayoutHeight containerStyle={styles.container}>
      <ScrollView
        style={styles.InputFormontainer}
        showsVerticalScrollIndicator={false}
      >
        <EditInputForm
          AnimationView={AnimationBounceView}
          meetingId={meetingId}
        />
        <Buttons navigation={navigation} trigger={trigger} />
      </ScrollView>
    </LayoutHeight>
  );
}

export default CreateMeeting;

function EditInputForm({ AnimationView, meetingId }: EditInpurFormProps) {
  const [name, setName] = useState<string>('');
  const {
    setMyMeetingName,
    setCalendarDate,
    setMyMeetingImgPath,
    setImgUri,
    meetingSelector,
  } = useMeeting();
  const { meetingData, mode } = meetingSelector;
  const styles = useStyles();
  function onChangeHandler(text: string) {
    setName(text);
    setMyMeetingName(text);
  }
  const [dateConfig, setDateConfig] = useState({
    value: '',
    placeholder: '날짜 범위를 선택해주세요',
  });

  const { data: editData } = useQuery(
    [QueryKeys.meetingDetail, meetingId],
    () => requestGetMeetingDetail2(meetingId!),
    { enabled: !!meetingId },
  );

  const inputProps: InputTextProps = {
    label: '모임이름',
    placeholder: editData
      ? editData?.meetingMetaData.meetingName
      : '모임이름을 입력해주세요!',
    maxLength: 30,
    value: name,
    onChangeText: onChangeHandler,
    multiline: false,
  };

  useEffect(() => {
    if (!editData) return;
    const date = {
      startDate: editData.meetingMetaData.calendar.startFrom,
      endDate: editData.meetingMetaData.calendar.endTo,
    };

    setDateConfig({
      value: `${date.startDate} ~ ${date.endDate}`,
      placeholder: '날짜 범위를 선택해주세요',
    });
    setCalendarDate(date);
    setName(editData.meetingMetaData.meetingName);
  }, [editData, setCalendarDate]);

  useEffect(() => {
    if (meetingData && meetingData.calendarStartFrom !== '0000-00-00')
      setDateConfig({
        value: `${meetingData.calendarStartFrom} ~ ${meetingData.calendarEndTo}`,
        placeholder: '날짜 범위를 선택해주세요',
      });
  }, [
    meetingData,
    meetingData.calendarEndTo,
    meetingData.calendarStartFrom,
    name,
    setCalendarDate,
    setMyMeetingImgPath,
  ]);

  useEffect(() => {
    if (!editData) return;

    setMyMeetingName(name);
  }, [editData, name, setMyMeetingName]);

  useEffect(() => {
    if (!editData) return;
    setImgUri(editData.meetingMetaData.thumbnailImageUrl);
  }, [editData, setImgUri, setMyMeetingImgPath]);

  if (!editData && mode === MeetingMode.edit) return null;

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <InputImageWithAinm AnimationView={AnimationView} id="image" />
      <AnimationInputBox
        inputProps={inputProps}
        AnimationView={AnimationView}
      />
      <AnimationInputDate
        AnimationView={AnimationView}
        dateConfig={dateConfig}
      />
    </Pressable>
  );
}

function Buttons({
  navigation,
  trigger,
}: {
  navigation: CreateMeetingNavigation;
  trigger: (key: 'name' | 'image' | 'date') => void;
}) {
  // #Data
  const { resetMeetingData, meetingSelector } = useMeeting();
  const {
    meetingData,
    mode: meetingMode,
    imgUri: meetingImgUri,
  } = meetingSelector;
  const styles = useStyles();
  const { payload } = getPayloadByMeetingMode();
  const { meetingName, calendarStartFrom, calendarEndTo } = meetingData;

  // AnimationView 컨트롤
  const animValues = useMemo(
    () => ({
      name: meetingName,
      image: meetingImgUri,
      date: calendarStartFrom,
    }),
    [calendarStartFrom, meetingImgUri, meetingName],
  );
  const [loading, setLoading] = useState<boolean>(false);
  // # function
  const cancelHandler = () => {
    resetMeetingData();
    navigation.goBack();
  };

  const convertURItoData = useCallback(
    (imgUrl: string) => {
      const data = {
        meetingName,
        meetingImageUrl: imgUrl,
        calendarStartFrom,
        calendarEndTo,
      };

      return data;
    },
    [calendarEndTo, calendarStartFrom, meetingName],
  );

  const onSuccessCreateMode = useCallback(
    (newMeetingId: MeetingId) => {
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Root' }],
      });
      resetMeetingData();
      navigation.navigate('MeetingDetail', {
        meetingId: newMeetingId.meetingId,
      });
    },
    [navigation, resetMeetingData],
  );

  const onSuccessEditMode = useCallback(() => {
    invalidateQueries([QueryKeys.meetings]);
    successAlert('모임정보가 변경되었습니다!');
    navigation.navigate('Root', { screen: 'TabOne' });
    resetMeetingData();
  }, [navigation, resetMeetingData]);

  const onErrorCreateMode = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }],
    });
    resetMeetingData();
    errorAlert('모임 생성에 실패했습니다...');
  }, [navigation, resetMeetingData]);
  // Mode : (create/edit)
  const requestHandler = useCallback(
    ({ mode }: { mode: MeetingMode }) => {
      setLoading(true);
      return mode === MeetingMode.create
        ? promiseFlow<AssetState | null, MeetingId>(
            payload.createMeetingPayload,
            [requestImageUpload, convertURItoData, requestCreateMeetings],
            {
              onSuccess: newMeetingId => {
                onSuccessCreateMode(newMeetingId);
              },
              onError: onErrorCreateMode,
            },
          )
        : promiseFlow(payload.editMeetingPayload, [requestPatchMeetings], {
            onSuccess: onSuccessEditMode,
          });
    },
    [
      payload.createMeetingPayload,
      payload.editMeetingPayload,
      convertURItoData,
      onErrorCreateMode,
      onSuccessEditMode,
      onSuccessCreateMode,
    ],
  );

  const onPressConfirm = useCallback(() => {
    const isValid = AnimTrigger({ trigger, values: animValues });
    if (!isValid || !meetingMode) return;
    requestHandler({ mode: meetingMode });
  }, [trigger, animValues, meetingMode, requestHandler]);

  return (
    <FlexButtons
      cancelHandler={cancelHandler}
      onPressConfirm={onPressConfirm}
      loading={loading}
    />
  );
}
const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },

  buttons: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },

  InputFormontainer: {
    width: '100%',
  },
  title: {
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 12,
  },
  iconColor: {
    color: theme.grayscale['500'],
  },
  smallContainerStyle: {},
}));
