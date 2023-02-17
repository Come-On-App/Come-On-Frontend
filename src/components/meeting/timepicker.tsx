/* eslint-disable max-params */
import React, { useState, useEffect, useRef } from 'react';
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

interface ItemProps {
  key: string | number;
  children: number;
  handler: React.Dispatch<React.SetStateAction<string>>;
}

interface TimePickerProps {
  onPressOut: (
    openTime: boolean,
    setOpenTime: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}

function Item({ key, children, handler }: ItemProps) {
  const styles = useStyles();
  const onPressClick = () => {
    handler(children < 10 ? `0${children}` : `${children}`);
  };

  return (
    <Pressable
      key={key}
      onPress={onPressClick}
      style={({ pressed }) => [
        styles.dropdownItem,
        pressed && styles.datePressed,
      ]}
    >
      <Text style={styles.fontColor}>
        {children < 10 ? `0${children}` : children}
      </Text>
    </Pressable>
  );
}

function TimePicker({ onPressOut }: TimePickerProps) {
  const [visible, setVisible] = useState(false);
  const [dropBoxTop, setDropBoxTop] = useState<number>(0);
  const [minute, setMinute] = useState('');
  const [hour, setHour] = useState('');
  const timeRef = useRef<View>(null);
  const styles = useStyles(dropBoxTop);
  const timeHours = Array.from({ length: 23 }, (v, i) => i + 1);
  const timeMinutes = Array.from({ length: 60 }, (v, i) => i);
  const onPressHandler = () => {
    setVisible(!visible);

    if (timeRef) {
      timeRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setDropBoxTop(height);
      });
    }
  };

  useEffect(() => {
    onPressOut(visible, setVisible);
  }, [onPressOut, visible]);
  const iconConfig2: IconProps = {
    name: 'access-time',
    size: 24,
    color: styles.iconColor.color,
  };

  return (
    <>
      <Pressable onPress={onPressHandler} ref={timeRef}>
        <IconInputBox
          iconConfig={iconConfig2}
          value={`${hour} : ${minute}`}
          condition
          placeholder="유력날짜"
          style={styles.dateBox}
        />
      </Pressable>
      {visible && (
        <View style={[styles.dropdown, { top: dropBoxTop - 2 }]}>
          <ScrollView
            style={{ zIndex: 10 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback>
              <>
                {timeHours.map(h => (
                  <Item handler={setHour} key={h + 500}>
                    {h}
                  </Item>
                ))}
              </>
            </TouchableWithoutFeedback>
          </ScrollView>
          <Font>:</Font>
          <ScrollView
            style={{ zIndex: 10 }}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback>
              <>
                {timeMinutes.map(m => (
                  <Item handler={setMinute} key={m - 500}>
                    {m}
                  </Item>
                ))}
              </>
            </TouchableWithoutFeedback>
          </ScrollView>
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

    alignItems: 'center',
  },
}));
