// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Text } from 'react-native';
import { Input } from '@rneui/themed';

// Text 적용
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

// TextInput 적용
Input.defaultProps = Input.defaultProps || {};
Input.defaultProps.allowFontScaling = false;
