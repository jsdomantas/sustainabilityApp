import { Pressable } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const FloatingActionButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable
    testID="floatingBtn"
    backgroundColor="primary.800"
    onPress={onPress}
    style={{
      position: 'absolute',
      bottom: 20,
      right: 35,
      height: 60,
      width: 60,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 6,
    }}
  >
    <MaterialCommunityIcons name="plus" size={36} color="#fff" />
  </Pressable>
);

export default FloatingActionButton;
