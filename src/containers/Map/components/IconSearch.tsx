import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconSearch() {
  const iconBgColor = useColorModeValue('#6b7280', '#9ca3af');
  return (
    <Svg
      data-name="Search/icon"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      tabIndex="-1"
    >
      <Path
        data-name="Search/icon/container"
        d="M0 0h24v24H0z"
        fill="none"
        tabIndex="-1"
      />
      <Path
        tabIndex="-1"
        data-name="Search/icon/shape"
        d="M15.864 14.321h-.813l-.288-.278a6.7 6.7 0 10-.72.72l.278.288v.813L19.467 21 21 19.467zm-6.175 0a4.631 4.631 0 114.632-4.631 4.625 4.625 0 01-4.631 4.631z"
        fill={iconBgColor}
      />
    </Svg>
  );
}
