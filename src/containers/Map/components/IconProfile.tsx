import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconProfile() {
  const iconBgColor = useColorModeValue('#6b7280', '#9ca3af');
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="Path 361"
        d="M8 0a4 4 0 104 4 4 4 0 00-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
        fill={iconBgColor}
      />
    </Svg>
  );
}
