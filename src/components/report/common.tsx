import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, View } from 'react-native';

import { Input } from '@components/input/InputText';
import { reportConfig } from '@constants/config';
import { Form } from '@type/component.report';
import { SetState } from '@type/index';
import { makeStyles } from '@rneui/themed';
import { PostReportMeetingPayload } from '@type/api.meeting';
import { imageURLConversion } from '@api/image/upload';

const { maxLength } = reportConfig;

interface ReportInputProps {
  setState: SetState<Form>;
  value: string;
  keyType: keyof Form;
  multiline: boolean;
  placeholder: string;
  containerStyle?: StyleProp<TextStyle>;
}

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps) {
  const styles = useStyles();

  return <View style={styles.contentContainer}>{children}</View>;
}

export function ReportInput({
  value,
  setState,
  keyType,
  multiline,
  placeholder,
  containerStyle,
}: ReportInputProps) {
  const styles = useStyles();

  return (
    <Input
      multiline={multiline}
      value={value}
      maxLength={maxLength}
      placeholder={placeholder}
      onChangeText={newText => {
        setState(prev => {
          return {
            ...prev,
            [keyType]: newText,
          };
        });
      }}
      containerStyle={[styles.reportContainer, containerStyle]}
    />
  );
}

const useStyles = makeStyles(theme => ({
  contentContainer: {
    marginVertical: 10,
  },
  reportContainer: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: theme.grayscale[100],
  },
}));

export async function createPayload(
  form: Form,
): Promise<PostReportMeetingPayload> {
  const imageURL = await imageURLConversion(form.reportImageAsset);

  return {
    meetingId: form.meetingId,
    content: form.description,
    title: form.title,
    reportImageUrl: imageURL,
  };
}
