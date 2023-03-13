import React, { useState, useEffect, useRef, useId } from 'react';
import {
  View,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { makeStyles } from '@rneui/themed';
import IconInputBox from '@components/input/IconInputBox';
import Font from '@components/Font';
import { IconProps } from '@type/index';
import {
  ItemProps,
  TimePickerListProps,
  TimePickerProps,
} from '@type/meeting.timepicker';

function renderItem(
  array: number[],
  setArray: React.Dispatch<React.SetStateAction<string>>,
) {
  return array.map(item => (
    <Item handler={setArray} key={useId()}>
      {item}
    </Item>
  ));
}

function returnTimeMM(mm: number) {
  return mm < 10 ? `0${mm}` : `${mm}`;
}

function Item({ children, handler }: ItemProps) {
  const styles = useStyles();
  const mm = returnTimeMM(children);
  const onPressClick = () => {
    handler(mm);
  };

  return (
    <Pressable
      onPress={onPressClick}
      style={({ pressed }) => [
        styles.dropdownItem,
        pressed && styles.datePressed,
      ]}
    >
      <Text style={styles.fontColor}>{mm}</Text>
    </Pressable>
  );
}

function TimePickerList({ arrayItem, setItem }: TimePickerListProps) {
  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback>
        <>{renderItem(arrayItem, setItem)}</>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

function TimePicker({ startTime, onPressOut }: TimePickerProps) {
  const [visible, setVisible] = useState(false);
  const [dropBoxTop, setDropBoxTop] = useState<number>(0);
  const [minute, setMinute] = useState('');
  const [hour, setHour] = useState('');
  const timeRef = useRef<View>(null);
  const styles = useStyles(dropBoxTop);
  const timeHours = Array.from({ length: 23 }, (_v, i) => i + 1);
  const timeMinutes = Array.from({ length: 60 }, (_v, i) => i);
  const iconConfig2: IconProps = {
    name: 'access-time',
    size: 24,
    color: styles.iconColor.color,
  };
  const onPressHandler = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const time = `${hour}:${minute}`;

    onPressOut(visible, setVisible, time);
  }, [hour, minute, onPressOut, visible]);

  useEffect(() => {
    const h = startTime.slice(0, 2);
    const m = startTime.slice(3, 5);

    setHour(h);
    setMinute(m);
  }, [startTime]);

  return (
    <>
      <Pressable
        onLayout={e => setDropBoxTop(e.nativeEvent.layout.height)}
        onPress={onPressHandler}
        ref={timeRef}
      >
        <IconInputBox
          iconConfig={iconConfig2}
          value={`${hour} : ${minute}`}
          condition
          placeholder="유력날짜"
          style={styles.dateBox}
        />
      </Pressable>
      {visible && (
        <View style={[styles.dropdown, styles.dropdownStyle]}>
          <TimePickerList arrayItem={timeHours} setItem={setHour} />
          <Font>:</Font>
          <TimePickerList arrayItem={timeMinutes} setItem={setMinute} />
        </View>
      )}
    </>
  );
}

export default TimePicker;
const useStyles = makeStyles((theme, dropBoxTop: number) => ({
  iconColor: {
    color: theme.grayscale['500'],
  },
  fontColor: {
    color: 'black',
  },
  dateBoxContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  dropdownStyle: {
    top: dropBoxTop - 2,
  },
  dateBox: { justifyContent: 'center' },

  pressed: {
    opacity: 0.7,
  },
  datePressed: {
    opacity: 0.7,

    backgroundColor: theme.grayscale['200'],
  },
  dropdown: {
    position: 'absolute',
    width: '100%',
    zIndex: 4,
    elevation: 5,
    height: (dropBoxTop - 5) * 2.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownItem: {
    borderTopWidth: 1,
    borderRadius: 4,
    borderColor: theme.grayscale['200'],
    padding: 12,
    backgroundColor: 'white',
    zIndex: 10,
    alignItems: 'center',
  },
}));
