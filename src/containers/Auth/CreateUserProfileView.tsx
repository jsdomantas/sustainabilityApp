import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Box,
  Button,
  Center,
  FormControl,
  Icon,
  Image,
  Input,
  Pressable,
  Stack,
  Text,
  VStack,
} from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../RootStackParamList';
import { RouteNames } from '../../constants/RouteNames';
import { Picker } from 'react-native-ui-lib';
import { useProfileQuery, useSignUpMutation } from './queries';
import { ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useImagePickerActionSheet } from '../../utilities/hooks';
import { setProfile } from '../../state/user/userSlice';
import { useDispatch } from 'react-redux';

const CATEGORIES = [
  { value: 1, label: 'Vegetables' },
  { value: 2, label: 'Fruits' },
  { value: 3, label: 'Baked goods' },
];

const CreateUserProfileView = ({
  route: {
    params: { credentials },
  },
}: NativeStackNavigationProp<
  RootStackParamList,
  RouteNames.CreateUserProfile
>) => {
  const signUpMutation = useSignUpMutation();
  const profileQuery = useProfileQuery();
  const dispatch = useDispatch();

  const { openActionSheet, isUploading, photoUrl } =
    useImagePickerActionSheet();

  const [formData, setFormData] = useState<{
    name: string;
    phoneNumber: string;
    preferredFoodCategories: any;
    familyCardNumber: string;
  }>({
    name: 'Test item',
    phoneNumber: '+3701234567',
    preferredFoodCategories: [],
    familyCardNumber: '12345678000',
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
        safeAreaBottom
        px={{ base: 0, md: 12, lg: 24, xl: 40 }}
        borderRadius={{ md: '8' }}
        borderWidth={{ md: '1' }}
        py={{ base: 0, md: 6 }}
      >
        <Pressable px="4" mt={4} _light={{ bg: 'white' }}>
          <Text
            fontSize="md"
            mb="5"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Photo
          </Text>

          <Box
            width="100%"
            _light={{ borderColor: 'coolGray.300' }}
            borderWidth="2"
            borderStyle="dashed"
          >
            <Pressable onPress={openActionSheet}>
              <VStack
                justifyContent="center"
                alignItems="center"
                space="2"
                minH={100}
              >
                {isUploading ? (
                  <ActivityIndicator />
                ) : photoUrl ? (
                  <Image
                    source={{ uri: photoUrl }}
                    size="xl"
                    alt="offer photo"
                  />
                ) : (
                  <>
                    <Icon
                      as={MaterialIcons}
                      name={'cloud-upload'}
                      _light={{ color: 'coolGray.500' }}
                      size="6"
                      mt="4"
                    />
                    <Text fontSize="sm" _light={{ color: 'coolGray.500' }}>
                      Upload
                    </Text>
                  </>
                )}
              </VStack>
            </Pressable>
          </Box>
        </Pressable>

        <Box _light={{ bg: 'white' }} mt="4">
          <Text
            px="4"
            pt="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Full name
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <Input
                type="text"
                py="4"
                defaultValue="John Doe"
                placeholder="Enter your full name"
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
            Phone number
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <Input
                type="text"
                py="4"
                defaultValue="+3701234567"
                placeholder="Enter your phone number"
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
            Preferred food categories
          </Text>
          <FormControl isRequired px="4" my="4">
            <Picker
              mode="MULTI"
              value={formData.preferredFoodCategories}
              selectionLimit={10}
              onChange={items => {
                setFormData({
                  ...formData,
                  preferredFoodCategories: items,
                });
              }}
            >
              {CATEGORIES.map(category => (
                <Picker.Item
                  key={category.value}
                  value={category}
                  label={category.label}
                />
              ))}
            </Picker>
          </FormControl>
        </Box>
        <Box _light={{ bg: 'white' }}>
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Family card number (optional)
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <Input
                type="text"
                py="4"
                defaultValue="12345678000"
                placeholder="Enter your phone number"
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    familyCardNumber: text,
                  })
                }
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
            signUpMutation.mutate(
              {
                email: credentials.email,
                password: credentials.password,
                profileData: {
                  ...formData,
                  photoUrl,
                  isBusinessAccount: false,
                },
              },
              {
                onSuccess: () => {
                  profileQuery.refetch().then(r => {
                    dispatch(setProfile(r.data));
                  });
                },
              },
            )
          }
          _text={{ fontSize: 'md' }}
        >
          Save
        </Button>
      </Center>
    </DashboardLayout>
  );
};

export default CreateUserProfileView;
