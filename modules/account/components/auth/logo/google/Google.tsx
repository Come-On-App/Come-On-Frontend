import TestId from '@shared/constants/testIds';
import React, { memo } from 'react';

import Svg, { Path } from 'react-native-svg';

function AppleLogo() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
      testID={TestId.account.logo.google}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.56 11.25C21.56 10.47 21.49 9.72 21.36 9H11V13.255H16.92C16.665 14.63 15.89 15.795 14.725 16.575V19.335H18.28C20.36 17.42 21.56 14.6 21.56 11.25Z"
        fill="#4285F4"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 21.9998C13.97 21.9998 16.46 21.0148 18.28 19.3348L14.725 16.5748C13.74 17.2348 12.48 17.6248 11 17.6248C8.135 17.6248 5.71 15.6898 4.845 13.0898H1.17V15.9398C2.98 19.5348 6.7 21.9998 11 21.9998Z"
        fill="#34A853"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.845 13.0896C4.625 12.4296 4.5 11.7246 4.5 10.9996C4.5 10.2746 4.625 9.56957 4.845 8.90957V6.05957H1.17C0.425 7.54457 0 9.22457 0 10.9996C0 12.7746 0.425 14.4546 1.17 15.9396L4.845 13.0896Z"
        fill="#FBBC05"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4.375C12.615 4.375 14.065 4.93 15.205 6.02L18.36 2.865C16.455 1.09 13.965 0 11 0C6.7 0 2.98 2.465 1.17 6.06L4.845 8.91C5.71 6.31 8.135 4.375 11 4.375Z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default memo(AppleLogo);
