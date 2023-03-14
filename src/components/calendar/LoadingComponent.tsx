import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { makeStyles } from '@rneui/themed';

export default function LoadingComponent({
  size = 'small',
}: {
  size?: number | 'small' | 'large';
}): JSX.Element {
  const styles = useStyles();

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={20} color={styles.loadingColor.color} />
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingColor: {
    color: theme.colors.secondary,
  },
}));
