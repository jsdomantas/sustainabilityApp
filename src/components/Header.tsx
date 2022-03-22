import React from 'react';
import { Text, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native';

const Header = ({ label }) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,

        elevation: 6,
      }}
    >
      <View padding-10>
        <Text text30>{label}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
