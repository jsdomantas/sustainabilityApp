import React, { useState } from 'react';

import { Button, Text, View } from 'react-native-ui-lib';
import { SafeAreaView, StyleSheet } from 'react-native';
import AuthInput from './components/AuthInput';
import { useLoginMutation } from './queries';

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLoginMutation();

  return (
    <SafeAreaView style={styles.container}>
      <View paddingH-20 style={styles.innerContainer}>
        <Text marginB-40 text40L center>
          Welcome!
        </Text>
        <AuthInput
          label="Email"
          placeholder="hello@email.com"
          isPassword={false}
          value={email}
          onChangeText={setEmail}
        />
        <AuthInput
          label="Password"
          placeholder="**********"
          isPassword={true}
          value={password}
          onChangeText={setPassword}
        />
        <Button
          marginB-10
          marginT-40
          label="Log in"
          borderRadius={4}
          onPress={() => loginMutation.mutate({ email, password })}
        />
        <Button label="Forgot password?" link />
      </View>
      <View row style={styles.bottomBtnContainer}>
        <Text marginR-4>Don't have an account?</Text>
        <Button
          label="Register here!"
          link
          labelStyle={styles.bottomBtnLabel}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: { justifyContent: 'center', flex: 1 },
  bottomBtnContainer: { alignItems: 'center', justifyContent: 'center' },
  bottomBtnLabel: { fontSize: 14 },
});
