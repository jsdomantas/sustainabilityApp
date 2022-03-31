import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLogoutMutation } from './queries';
import { HStack, Pressable, Text, VStack } from 'native-base';
import messaging from '@react-native-firebase/messaging';
import DashboardLayout from '../../layouts/DashboardLayout';

type OptionItemProps = {
  title: string;
};

function OptionItem({ title }: OptionItemProps) {
  return (
    <Pressable>
      <VStack>
        <HStack alignItems="center" space={3}>
          <Text
            fontSize="md"
            fontWeight="medium"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
          >
            {title}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}

const SettingsView = () => {
  const logoutMutation = useLogoutMutation();

  const [token, setToken] = useState('');

  const getFirebaseToken = async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    return await messaging().getToken();
  };

  const onMessageReceived = async message => {
    if (!message) {
      return;
    }
    console.log(message.data.type);
  };

  const handleSetPushNotification = () => {
    fetch('http://10.0.2.2:8000/alarm', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    }).then(r => console.log(r));
  };

  useEffect(() => {
    async function fetchData() {
      const generatedToken = await getFirebaseToken();
      setToken(generatedToken);
    }
    fetchData();
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DashboardLayout
        title="Settings"
        mobileHeader={{ backButton: false, displayIcons: false }}
      >
        <VStack
          px={{ base: 4, md: 8 }}
          py={{ base: 4, md: 8 }}
          borderRadius={{ md: '8' }}
          _light={{
            borderColor: 'coolGray.200',
            bg: { base: 'white' },
          }}
          _dark={{
            borderColor: 'coolGray.700',
            bg: 'coolGray.800',
          }}
          space="6"
        >
          <OptionItem title="Storage" />
          <OptionItem title="About" />
          <OptionItem title="Help" />
          <OptionItem title="Legal" />
          <OptionItem title="Terms and Conditions" />
          <Pressable onPress={() => logoutMutation.mutate()}>
            <Text
              textAlign="center"
              _light={{ color: 'red.500' }}
              fontWeight="semibold"
              fontSize="md"
            >
              Log out
            </Text>
          </Pressable>
          <Pressable onPress={() => handleSetPushNotification()}>
            <Text textAlign="center" fontWeight="semibold" fontSize="md">
              Send notification
            </Text>
          </Pressable>
        </VStack>
      </DashboardLayout>
    </View>
  );
};

export default SettingsView;
