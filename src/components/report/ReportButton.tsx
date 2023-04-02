import React from 'react';

import Button from '@components/button/Buttons';
import { reportConfig } from '@constants/config';

const { text } = reportConfig;

function ReportButton() {
  return (
    <Button
      onPress={() => ''}
      text={text.button}
      bold
      buttonStyle={{ backgroundColor: '#F05E51' }}
    />
  );
}

export default ReportButton;
