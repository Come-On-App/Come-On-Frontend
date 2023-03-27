import { Skeleton } from '@rneui/base';
import { makeStyles } from '@rneui/themed';

import React from 'react';
import { View } from 'react-native';

function MeetingRoomSkeleton() {
  const styles = useStyles();
  const config = {
    label: {
      width: 80,
      height: 25,
    },
    members: {
      circleSize: 38,
      marginRight: 7,
    },
    datebox: {
      height: 50,
      margin: 12,
      leftFlex: 0.7,
      rightFlex: 0.35,
    },
    map: {
      height: 300,
      borderRadius: 12,
      margin: 12,
    },
    card: {
      numberingSize: 22,
    },
    cardStyle: {
      flex: 8.5,
      width: 305, // 임시
      height: 80,
      borderRadius: 4,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Skeleton width={config.label.width} height={config.label.height} />
        <Skeleton width={config.label.width} height={config.label.height} />
      </View>
      <View style={styles.memberBox}>
        <Skeleton
          circle
          width={config.members.circleSize}
          style={{ marginRight: config.members.marginRight }}
        />
      </View>
      <Skeleton width={config.label.width} height={config.label.height} />
      {/* {//데이트박스} */}
      <View style={[styles.dateBoxContainer]}>
        <Skeleton
          height={config.datebox.height}
          style={{
            flex: config.datebox.leftFlex,
            marginRight: config.datebox.margin,
          }}
        />
        <Skeleton
          height={config.datebox.height}
          style={{ flex: config.datebox.rightFlex }}
        />
      </View>
      <View style={{ marginVertical: config.datebox.margin }}>
        <Skeleton height={config.datebox.height} />
      </View>
      <Skeleton width={config.label.width} height={config.label.height} />

      <Skeleton
        height={config.map.height}
        style={{
          borderRadius: config.map.borderRadius,
          marginTop: config.map.margin,
        }}
      />
      <View style={styles.wrapContainer}>
        <View style={styles.cardNumberingBox}>
          <Skeleton circle width={config.card.numberingSize} />
        </View>
        <Skeleton style={config.cardStyle} />
      </View>
    </View>
  );
}

export default MeetingRoomSkeleton;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 12,
  },

  dateBoxContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },

  wrapContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  memberBox: {
    marginTop: 12,
    marginBottom: 12,
    height: 42 * 2,
    flexDirection: 'row',
  },
  cardNumberingBox: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
