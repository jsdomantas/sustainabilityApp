import React, { useEffect, useState } from 'react';

import { Button, Text, View } from 'react-native-ui-lib';
import { SafeAreaView, StyleSheet } from 'react-native';
import AuthInput from './components/AuthInput';
import { useSignUpMutation } from './queries';
import notifee, { IOSAuthorizationStatus } from '@notifee/react-native';

const SignupView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUpMutation = useSignUpMutation();

  async function requestUserPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View paddingH-20 style={styles.innerContainer}>
        <Text marginB-40 text40L center>
          Welcome!
        </Text>
        <AuthInput
          label="Email"
          value={email}
          placeholder="hello@email.com"
          onChangeText={setEmail}
          isPassword={false}
        />
        <AuthInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="**********"
          isPassword={true}
        />
        <AuthInput
          label="Repeat password"
          placeholder="**********"
          isPassword={true}
        />
        <Button
          marginB-10
          marginT-40
          label="Sign up"
          borderRadius={4}
          onPress={() => signUpMutation.mutate({ email, password })}
        />
      </View>
      <View row style={styles.bottomBtnContainer}>
        <Text marginR-4>Have an account?</Text>
        <Button
          label="Log in here!"
          link
          labelStyle={styles.bottomBtnLabel}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignupView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: { justifyContent: 'center', flex: 1 },
  bottomBtnContainer: { alignItems: 'center', justifyContent: 'center' },
  bottomBtnLabel: { fontSize: 14 },
});
