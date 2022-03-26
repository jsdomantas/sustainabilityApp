import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconMap() {
  const iconBgColor = useColorModeValue('#4c1d95', '#8b5cf6');
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={14.637}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="Icon/shape"
        d="M6 0a6 6 0 00-6 6c0 4.227 5.333 8.215 5.527 8.442a.667.667 0 00.94 0C6.667 14.215 12 10.227 12 6a6 6 0 00-6-6zm0 8a2 2 0 112-2 2 2 0 01-2 2z"
        fill={iconBgColor}
      />
    </Svg>
  );
}
