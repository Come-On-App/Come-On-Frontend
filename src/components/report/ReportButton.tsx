import React from 'react';

import Button from '@components/button/Buttons';
import { report } from '@assets/config';

function ReportButton() {
  return (
    <Button
      onPress={() => ''}
      text={report.text.button}
      bold
      buttonStyle={{ backgroundColor: '#F05E51' }}
    />
  );
}

export default ReportButton;
