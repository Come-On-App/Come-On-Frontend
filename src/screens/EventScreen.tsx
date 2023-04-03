import React, { useEffect } from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';

import { RootStackScreenProps } from '@type/navigation';
import Logo from '@assets/images/logo/Logo';
import Font, { BoldFont } from '@components/Font';

export default function EventScreen({
  navigation,
}: RootStackScreenProps<'EasterEgg'>) {
  const styles = useStyles();

  useEffect(() => {
    navigation.setOptions({
      title: '제작자',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <MemberList />
      </View>
    </View>
  );
}

function MemberList() {
  const { row } = useStyles();

  return (
    <View>
      <Member type="Frontend">
        <View style={row}>
          <Font>방정배, </Font>
          <Font>강예정</Font>
        </View>
      </Member>
      <Member type="designer">
        <Font>김경진</Font>
      </Member>
      <Member type="Backend">
        <Font>유하영</Font>
      </Member>
    </View>
  );
}

function Member({
  type,
  children,
}: {
  type: 'Backend' | 'Frontend' | 'designer';
  children: React.ReactNode;
}) {
  const styles = useStyles();

  return (
    <View style={styles.member}>
      <BoldFont>-- {type} --</BoldFont>
      {children}
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  row: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.grayscale['50'],
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    width: '80%',
    height: '80%',
    borderWidth: 2,
    borderColor: theme.grayscale['50'],
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  member: {
    width: '100%',
    height: 50,
    alignItems: 'center',
  },
}));
