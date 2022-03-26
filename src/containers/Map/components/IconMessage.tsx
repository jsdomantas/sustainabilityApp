import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconMessage() {
  const iconBgColor = useColorModeValue('#4c1d95', '#e5e7eb');
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="icon/shape"
        d="M18 0H2A2 2 0 00.01 2L0 20l4-4h14a2.006 2.006 0 002-2V2a2.006 2.006 0 00-2-2zM7 9H5V7h2zm4 0H9V7h2zm4 0h-2V7h2z"
        fill={iconBgColor}
      />
    </Svg>
  );
}
