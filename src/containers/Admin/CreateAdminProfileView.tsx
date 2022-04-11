import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigation } from '@react-navigation/native';
import { Region } from 'react-native-maps';
import { RouteNames } from '../../constants/RouteNames';
import { DateTimePicker } from 'react-native-ui-lib';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../RootStackParamList';
import { format } from 'date-fns';

const CreateAdminProfileView = ({
  route: {
    params: { coordinates, credentials },
  },
}: NativeStackNavigationProp<
  RootStackParamList,
  RouteNames.AdminOnboarding
>) => {
  const { navigate } = useNavigation();

  const [formData, setFormData] = useState<{
    name: string;
    coordinates: Region;
    phoneNumber: string;
    pickupTime: Date;
  }>({
    name: 'Test item',
    phoneNumber: '+3701234567',
    coordinates: {
      latitude: 1,
      longitude: 1,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    },
    pickupTime: new Date(),
  });

  useEffect(() => {
    if (coordinates) {
      setFormData({
        ...formData,
        coordinates,
      });
    }
  }, [coordinates]);

  return (
    <DashboardLayout
      title="Create your profile"
      mobileHeader={{
        backButton: false,
      }}
    >
      <VStack
        _light={{ bg: { md: 'white' }, borderColor: 'coolGray.200' }}
        safeAreaBottom
        px={{ base: 0, md: 12, lg: 24, xl: 40 }}
        borderRadius={{ md: '8' }}
        borderWidth={{ md: '1' }}
        py={{ base: 0, md: 6 }}
      >
        <Box _light={{ bg: 'white' }} mt="4">
          <Text
            px="4"
            pt="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Business name
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <Input
                type="text"
                py="4"
                defaultValue="Business A"
                placeholder="Enter item's title"
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    name: text,
                  })
                }
              />
            </Stack>
          </FormControl>
        </Box>
        <Box _light={{ bg: 'white' }}>
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Location
          </Text>
          <FormControl isRequired px="4" my="4">
            <HStack>
              <Input
                isReadOnly={true}
                py="4"
                mr={4}
                flex={1}
                type="text"
                placeholder="Enter the quantity you have"
                defaultValue={
                  coordinates
                    ? `${coordinates.latitude}, ${coordinates.longitude}`
                    : 'Location not selected'
                }
              />
              <Button
                onPress={() =>
                  navigate(RouteNames.SelectLocation, {
                    coordinates,
                    navigateToAfterSaving: RouteNames.AdminOnboarding,
                  })
                }
              >
                Select
              </Button>
            </HStack>
          </FormControl>
        </Box>
        <Box _light={{ bg: 'white' }}>
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Phone number
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <Input
                type="text"
                py="4"
                defaultValue="+3701234567"
                placeholder="Enter item's title"
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    phoneNumber: text,
                  })
                }
              />
            </Stack>
          </FormControl>
        </Box>
        <Box _light={{ bg: 'white' }}>
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Usual pick-up time
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <DateTimePicker
                mode="time"
                value={formData.pickupTime}
                timeFormat="h:mm A"
                onChange={date => {
                  setFormData({
                    ...formData,
                    pickupTime: date,
                  });
                }}
              />
            </Stack>
          </FormControl>
        </Box>
      </VStack>
      <Center px="4" mb={4} mt="auto">
        <Button
          borderRadius="4"
          width="100%"
          size="md"
          mt="8"
          bg="primary.900"
          onPress={() =>
            navigate(RouteNames.SelectProducts, {
              credentials,
              profile: {
                ...formData,
                pickupTime: format(formData.pickupTime, 'HH:MM'),
              },
            })
          }
          _text={{ fontSize: 'md' }}
        >
          Save
        </Button>
      </Center>
    </DashboardLayout>
  );
};

export default CreateAdminProfileView;
