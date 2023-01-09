/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useMemo } from 'react';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import XDate from 'xdate';
import { backgroundColor } from 'react-native-calendars/src/style';
import { xdateToData } from 'react-native-calendars/src/interface';
import styleConstructor from 'react-native-calendars/src/calendar/day/period/style';
import Dot from 'react-native-calendars/src/calendar/day/dot';

function PeriodDay(props) {
  const {
    theme,
    marking,
    date,
    onPress,
    onLongPress,
    state,
    accessibilityLabel,
    testID,
    children,
  } = props;

  console.log(props);
  const dateData = date ? xdateToData(date) : undefined;
  const xdate = new XDate(date);
  const style = useRef(styleConstructor(theme));
  const markingStyle = useMemo(() => {
    const defaultStyle = { textStyle: {}, containerStyle: {} };

    if (!marking) {
      return defaultStyle;
    }

    if (marking.disabled) {
      defaultStyle.textStyle = { color: style.current.disabledText.color };
    } else if (marking.inactive) {
      defaultStyle.textStyle = { color: style.current.inactiveText.color };
    } else if (marking.selected) {
      defaultStyle.textStyle = { color: style.current.selectedText.color };
    }

    if (marking.startingDay) {
      defaultStyle.startingDay = { backgroundColor: marking.color };
    }

    if (marking.endingDay) {
      defaultStyle.endingDay = { backgroundColor: marking.color };
    }

    if (!marking.startingDay && !marking.endingDay) {
      defaultStyle.day = { backgroundColor: marking.color };
    }

    if (marking.textColor) {
      defaultStyle.textStyle = { color: marking.textColor };
    }

    if (marking.customTextStyle) {
      defaultStyle.textStyle = marking.customTextStyle;
    }

    if (marking.customContainerStyle) {
      defaultStyle.containerStyle = marking.customContainerStyle;
    }

    return defaultStyle;
  }, [marking]);
  const containerStyle = useMemo(() => {
    const containerStyle = [style.current.base];

    if (state === 'today') {
      containerStyle.push(style.current.today);
    }

    if (marking) {
      containerStyle.push({
        borderRadius: 17,
        overflow: 'hidden',
      });

      if (markingStyle.containerStyle) {
        containerStyle.push(markingStyle.containerStyle);
      }

      const start = markingStyle.startingDay;
      const end = markingStyle.endingDay;

      if (start && !end) {
        containerStyle.push({
          backgroundColor: markingStyle.startingDay?.backgroundColor,
        });
      } else if ((end && !start) || (end && start)) {
        containerStyle.push({
          backgroundColor: markingStyle.endingDay?.backgroundColor,
        });
      }
    }

    return containerStyle;
  }, [marking, state]);
  const textStyle = useMemo(() => {
    const textStyle = [style.current.text];

    if (state === 'disabled') {
      textStyle.push(style.current.disabledText);
    } else if (state === 'inactive') {
      textStyle.push(style.current.inactiveText);
    } else if (state === 'today') {
      textStyle.push(style.current.todayText);
    }

    if (marking) {
      if (markingStyle.textStyle) {
        textStyle.push(markingStyle.textStyle);
      }
    }

    return textStyle;
  }, [marking, state]);
  const fillerStyles = useMemo(() => {
    const leftFillerStyle = { backgroundColor: undefined };
    const rightFillerStyle = {
      backgroundColor: undefined,
      borderRadius: undefined,
    };
    let fillerStyle = {};
    const start = markingStyle.startingDay;
    const end = markingStyle.endingDay;

    if (start && !end) {
      rightFillerStyle.backgroundColor =
        markingStyle.startingDay?.backgroundColor;
    } else if (end && !start) {
      leftFillerStyle.backgroundColor = markingStyle.endingDay?.backgroundColor;
    } else if (markingStyle.day) {
      leftFillerStyle.backgroundColor = markingStyle.day?.backgroundColor;
      rightFillerStyle.backgroundColor = markingStyle.day?.backgroundColor;
      fillerStyle = { backgroundColor: markingStyle.day?.backgroundColor };
    }

    return { leftFillerStyle, rightFillerStyle, fillerStyle };
  }, [marking]);
  const renderFillers = xdate => {
    const start = markingStyle.startingDay;
    const end = markingStyle.endingDay;
    // todo color theme으로 유동성있게 관리하기
    const lrColor = '#EFF6FE';

    if (xdate.getDay() === 0) {
      return (
        <View
          style={[
            style.current.fillers,
            fillerStyles.fillerStyle,
            { borderTopLeftRadius: 30, borderBottomLeftRadius: 30 },
          ]}
        >
          <View
            style={[
              style.current.leftFiller,
              fillerStyles.leftFillerStyle,
              { borderTopLeftRadius: 30, borderBottomLeftRadius: 30 },
              end ? { backgroundColor: lrColor } : { borderRadius: 0 },
            ]}
          />
          <View
            style={[
              style.current.rightFiller,
              fillerStyles.rightFillerStyle,
              start ? { backgroundColor: lrColor } : { borderRadius: 0 },
            ]}
          />
        </View>
      );
    }

    if (xdate.getDay() === 6) {
      return (
        <View
          style={[
            style.current.fillers,
            fillerStyles.fillerStyle,
            { borderTopRightRadius: 30, borderBottomRightRadius: 30 },
          ]}
        >
          <View
            style={[
              style.current.leftFiller,
              fillerStyles.leftFillerStyle,
              end ? { backgroundColor: lrColor } : { borderRadius: 0 },
            ]}
          />
          <View
            style={[
              style.current.rightFiller,
              fillerStyles.rightFillerStyle,
              { borderTopRightRadius: 30, borderBottomRightRadius: 30 },
              start ? { backgroundColor: lrColor } : { borderRadius: 0 },
            ]}
          />
        </View>
      );
    }

    return (
      <View style={[style.current.fillers, fillerStyles.fillerStyle]}>
        <View
          style={[
            style.current.leftFiller,
            fillerStyles.leftFillerStyle,
            end ? { backgroundColor: lrColor } : { borderRadius: 0 },
          ]}
        />
        <View
          style={[
            style.current.rightFiller,
            fillerStyles.rightFillerStyle,
            start ? { backgroundColor: lrColor } : { borderRadius: 0 },
          ]}
        />
      </View>
    );
  };
  const _onPress = useCallback(() => {
    onPress?.(dateData);
  }, [onPress]);
  const _onLongPress = useCallback(() => {
    onLongPress?.(dateData);
  }, [onLongPress]);
  const Component = marking ? TouchableWithoutFeedback : TouchableOpacity;

  return (
    <Component
      testID={testID}
      onPress={_onPress}
      onLongPress={_onLongPress}
      disabled={marking?.disableTouchEvent}
      accessible
      accessibilityRole={marking?.disableTouchEvent ? undefined : 'button'}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={style.current.wrapper}>
        {renderFillers(xdate)}
        <View style={containerStyle}>
          <Text allowFontScaling={false} style={textStyle}>
            {String(children)}
          </Text>
          <View style={style.current.dotContainer}>
            <Dot
              theme={theme}
              color={marking?.dotColor}
              marked={marking?.marked}
            />
          </View>
        </View>
      </View>
    </Component>
  );
}

export default PeriodDay;
PeriodDay.displayName = 'PeriodDay';
PeriodDay.propTypes = {
  state: PropTypes.oneOf(['selected', 'disabled', 'inactive', 'today', '']),
  marking: PropTypes.any,
  theme: PropTypes.object,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  date: PropTypes.string,
};
