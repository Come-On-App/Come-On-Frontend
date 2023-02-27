import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { makeStyles } from '@rneui/themed';

export default function LoadingComponent({
  size,
}: {
  size?: number | 'small' | 'large' | undefined;
}): JSX.Element {
  const styles = useStyles();

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={size} color="pink" />
      {/* <Font>
          {year}년 {month < 10 ? `0${month}` : month}월
        </Font> */}
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));
