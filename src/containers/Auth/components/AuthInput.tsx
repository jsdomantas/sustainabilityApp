import React from 'react';

import { TextInput } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';

const AuthInput = ({ label, placeholder, isPassword, ...rest }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.grey60,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 18,
        paddingVertical: 8,
      }}
    >
      <Text marginB-3 grey40 style={{ fontSize: 12 }}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.grey20}
        autoCorrect={false}
        secureTextEntry={isPassword}
        {...rest}
      />
    </View>
  );
};

export default AuthInput;
