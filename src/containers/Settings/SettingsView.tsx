import { View } from 'react-native';
import { Button } from 'react-native-ui-lib';
import React from 'react';
import Header from '../../components/Header';
import { useLogoutMutation } from './queries';

const SettingsView = () => {
  const logoutMutation = useLogoutMutation();

  return (
    <View style={{ flex: 1 }}>
      <Header label="Settings" />
      <View style={{ flex: 1, marginTop: 18 }}>
        <Button
          label="Log out"
          enableShadow
          onPress={() => logoutMutation.mutate()}
          style={{ alignSelf: 'center' }}
        />
      </View>
    </View>
  );
};

export default SettingsView;
