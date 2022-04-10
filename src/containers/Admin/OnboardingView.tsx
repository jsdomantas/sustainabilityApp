import React, { useState } from 'react';
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
import { useFoodCollectionMutation } from '../../queries';
import { Region } from 'react-native-maps';
import { RouteNames } from '../../constants/RouteNames';
import { DateTimePicker } from 'react-native-ui-lib';

const OnboardingView = ({ route: { params: { coordinates } = {} } }) => {
  const { navigate } = useNavigation();

  const mealCollectionMutation = useFoodCollectionMutation();

  const [formData, setFormData] = useState<{
    name: string;
    ingredients: any;
    phoneNumber: string;
    coordinates: Region;
    pickupTime: Date;
  }>({
    name: 'Test item',
    ingredients: [],
    phoneNumber: 'Test description',
    coordinates: {
      latitude: 1,
      longitude: 1,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    },
    pickupTime: new Date(),
  });

  return (
    <DashboardLayout
      title="Create your profile"
      mobileHeader={{
        backButton: false,
      }}
    >
      <VStack
        _light={{ bg: { md: 'white' }, borderColor: 'coolGray.200' }}
        _dark={{
          bg: {
            base: 'customGray',
            md: 'coolGray.900',
          },
          borderColor: 'coolGray.800',
        }}
        safeAreaBottom
        px={{ base: 0, md: 12, lg: 24, xl: 40 }}
        borderRadius={{ md: '8' }}
        borderWidth={{ md: '1' }}
        py={{ base: 0, md: 6 }}
      >
        <Box
          _light={{ bg: 'white' }}
          _dark={{ bg: { base: 'coolGray.800', md: 'coolGray.900' } }}
          mt="4"
        >
          <Text
            px="4"
            pt="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
            fontWeight="bold"
          >
            Business name
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <Input
                type="text"
                py="4"
                defaultValue="Test item"
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
        <Box
          _light={{ bg: 'white' }}
          _dark={{ bg: { base: 'coolGray.800', md: 'coolGray.900' } }}
        >
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
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
                  navigate('SelectLocation', {
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
        <Box
          _light={{ bg: 'white' }}
          _dark={{ bg: { base: 'coolGray.800', md: 'coolGray.900' } }}
        >
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
            fontWeight="bold"
          >
            Phone number
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <Input
                type="text"
                py="4"
                defaultValue="Test item"
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
        <Box
          _light={{ bg: 'white' }}
          _dark={{ bg: { base: 'coolGray.800', md: 'coolGray.900' } }}
        >
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
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
                  console.log(date);
                  setFormData({
                    ...formData,
                    pickupTime: date,
                  });
                }}
              />
            </Stack>
          </FormControl>
        </Box>
        <Center px="4">
          <Button
            borderRadius="4"
            width="100%"
            size="md"
            isLoading={mealCollectionMutation.isLoading}
            disabled={mealCollectionMutation.isLoading}
            mt="8"
            bg="primary.900"
            onPress={() => navigate(RouteNames.SelectProducts)}
            _text={{ fontSize: 'md' }}
          >
            Save
          </Button>
        </Center>
      </VStack>
    </DashboardLayout>
  );
};

export default OnboardingView;
