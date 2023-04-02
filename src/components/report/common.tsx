import React, { ReactNode } from 'react';
import { View } from 'react-native';

import { Input } from '@components/input/InputText';
import { reportConfig } from '@constants/config';
import { Form } from '@type/component.report';
import { SetState } from '@type/index';
import { makeStyles } from '@rneui/themed';

const { maxLength } = reportConfig;

interface ReportInputProps {
  setState: SetState<Form>;
  value: string;
  keyType: keyof Form;
  multiline: boolean;
  placeholder: string;
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
      containerStyle={styles.reportContainer}
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
