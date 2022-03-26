import { useColorModeValue } from 'native-base';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function IconOrder() {
  const iconBgColor = useColorModeValue('#4c1d95', '#8b5cf6');
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.138}
      height={16.274}
      tabIndex="-1"
    >
      <Path
        tabIndex="-1"
        data-name="Order/icon/shape"
        d="M4.804 9.149l2.537-2.537L1.049.329a3.592 3.592 0 000 5.073zm6.077-1.622a4.358 4.358 0 004.724-1.237c1.712-1.712 2.044-4.168.726-5.485s-3.765-.986-5.485.726a4.358 4.358 0 00-1.237 4.724L.86 15.002l1.264 1.265L8.3 10.109l6.167 6.167 1.264-1.264L9.56 8.844l1.318-1.318z"
        fill={iconBgColor}
      />
    </Svg>
  );
}
