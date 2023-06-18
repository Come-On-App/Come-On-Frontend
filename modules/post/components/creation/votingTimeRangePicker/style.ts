import { makeStyles } from '@rneui/themed';
import { IconName } from '@shared/components/icon/type';

export default makeStyles((theme) => ({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    height: 48,
    borderColor: theme.font.grayscale['200'],
    backgroundColor: theme.font.grayscale['0'],
    marginVertical: 5,
  },
  icon: {
    name: 'date-range' as IconName,
    color: theme.font.grayscale['500'],
  },
  font: {
    color: theme.font.grayscale['500'],
  },
}));
