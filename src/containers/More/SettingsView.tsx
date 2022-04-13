import { View } from 'react-native';
import React from 'react';
import { useLogoutMutation } from './queries';
import { HStack, Pressable, Text, VStack } from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../state/user/userSlice';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../constants/RouteNames';
import { queryClient } from '../../utilities/reactQuery';

type OptionItemProps = {
  title: string;
  onPress: () => void;
};

function OptionItem({ title, onPress }: OptionItemProps) {
  return (
    <Pressable onPress={onPress}>
      <VStack>
        <HStack alignItems="center" space={3}>
          <Text
            fontSize="md"
            fontWeight="medium"
            _light={{ color: 'coolGray.800' }}
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
  const dispatch = useDispatch();

  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DashboardLayout title="More" mobileHeader={{ backButton: false }}>
        <VStack
          px={{ base: 4, md: 8 }}
          py={{ base: 4, md: 8 }}
          borderRadius={{ md: '8' }}
          _light={{
            borderColor: 'coolGray.200',
            bg: { base: 'white' },
          }}
          space="6"
        >
          <OptionItem title="Profile" />
          <OptionItem
            title="Reservations history"
            onPress={() => navigate(RouteNames.ReservationHistory)}
          />
        </VStack>
        <Pressable
          marginTop="auto"
          mb={6}
          onPress={() =>
            logoutMutation.mutate(
              // @ts-ignore
              {},
              {
                onSuccess: () => {
                  dispatch(setProfile(null));
                  queryClient.clear();
                },
              },
            )
          }
        >
          <Text
            textAlign="center"
            _light={{ color: 'red.500' }}
            fontWeight="semibold"
            fontSize="md"
          >
            Log out
          </Text>
        </Pressable>
      </DashboardLayout>
    </View>
  );
};

export default SettingsView;
