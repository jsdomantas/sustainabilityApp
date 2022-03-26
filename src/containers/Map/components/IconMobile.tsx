import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconMobile() {
  const iconBgColor = useColorModeValue('#4c1d95', '#e5e7eb');
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="icon/shape"
        d="M17.01 12.38a11.443 11.443 0 01-3.53-.56.977.977 0 00-1.01.24l-1.57 1.97A15.183 15.183 0 014.01 7.2l1.95-1.66a1.021 1.021 0 00.24-1.02A11.153 11.153 0 015.64.99 1 1 0 004.65 0H1.19C.65 0 0 .24 0 .99A17.152 17.152 0 0017.01 18a1.049 1.049 0 00.99-1.18v-3.45a1 1 0 00-.99-.99z"
        fill={iconBgColor}
      />
    </Svg>
  );
}
