import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconPin() {
  const iconBgColor = useColorModeValue('#4c1d95', '#8b5cf6');
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10}
      height={16.686}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="icon/shape"
        d="M5 0a5 5 0 00-.708 9.95v6.736h1.416V9.95A5 5 0 005 0z"
        fill={iconBgColor}
      />
    </Svg>
  );
}
