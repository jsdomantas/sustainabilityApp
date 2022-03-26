import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function IconHome() {
  const iconBgColor = useColorModeValue('#6b7280', '#9ca3af');
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      tabIndex="-1"
    >
      <G data-name="Home/icon" tabIndex="-1">
        <Path
          tabIndex="-1"
          data-name="Home/icon/shape"
          d="M9.9 21.334v-6.589h4.2v6.588h5.25v-8.784h3.15L12 2.667 1.5 12.549h3.15v8.784z"
          fill={iconBgColor}
        />
        <Path
          data-name="Home/icon/container"
          fill="none"
          d="M0 0h24v24H0z"
          tabIndex="-1"
        />
      </G>
    </Svg>
  );
}
