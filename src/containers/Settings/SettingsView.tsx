import { View } from 'react-native';
import React from 'react';
import { useLogoutMutation } from './queries';
import { HStack, Pressable, Text, VStack } from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { getProfile } from '../Auth/api';

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

  return (
    <View style={{ flex: 1 }}>
      <DashboardLayout title="Settings" mobileHeader={{ backButton: false }}>
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
          <Pressable
            onPress={() => getProfile().then(data => console.log(data))}
          >
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
