import React from 'react';
import IconInputBox from '@components/input/IconInputBox';
import { IconProps } from '@type/index';
import TimePicker from '@components/meeting/_timepicker';
import { View, Pressable } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { DateContainerProps } from '@type/meeting.dateContainer';

export default function DateContainer({
  startTime,
  startFrom,
  endTo,
  onPressLabel,
  onPressOut,
}: DateContainerProps) {
  const styles = useStyles();
  const iconConfig: IconProps = {
    name: 'calendar-today',
    size: 24,
    color: styles.iconColor.color,
  };

  return (
    <>
      <View style={[styles.dateBoxContainer]}>
        <View style={styles.leftBoxContainer}>
          <IconInputBox
            iconConfig={iconConfig}
            value={`${startFrom} ~ ${endTo}`}
            condition
            placeholder="유력날짜"
          />
        </View>

        <View style={styles.rightBoxContainer}>
          <TimePicker startTime={startTime} onPressOut={onPressOut} />
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.labelContainer,
          pressed && styles.pressed,
        ]}
        onPress={onPressLabel}
      >
        <View style={styles.votingContainer}>
          <IconInputBox
            iconConfig={iconConfig}
            value="유력한 날짜"
            condition={false}
            placeholder="날짜를 투표해 주세요"
            style={styles.dateBox}
          />
        </View>
      </Pressable>
    </>
  );
}

const useStyles = makeStyles(theme => ({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  userContainer: {
    marginTop: 12,
    marginBottom: 28,
  },
  leftBoxContainer: {
    flex: 0.7,
    marginRight: 12,
  },
  rightBoxContainer: {
    flex: 0.35,
  },
  iconColor: {
    color: theme.grayscale['500'],
  },
  votingContainer: {
    width: '100%',
  },
  dateBoxContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  dateBox: { justifyContent: 'center' },

  pressed: {
    opacity: 0.7,
  },
}));
