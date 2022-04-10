import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  Center,
  FormControl,
  Stack,
  Input,
  HStack,
  TextArea,
} from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigation } from '@react-navigation/native';
import { useFoodCollectionMutation, useIngredientsQuery } from '../../queries';
import { ActivityIndicator } from 'react-native';
import { Picker } from 'react-native-ui-lib';
import { Region } from 'react-native-maps';
import { queryClient } from '../../utilities/reactQuery';

const AddFoodCollectionView = ({ route: { params: { coordinates } = {} } }) => {
  const { navigate, goBack } = useNavigation();

  const ingredientsQuery = useIngredientsQuery();
  const mealCollectionMutation = useFoodCollectionMutation();

  const [formData, setFormData] = useState<{
    title: string;
    ingredients: any;
    description: string;
    coordinates: Region;
  }>({
    title: 'Test item',
    ingredients: [],
    description: 'Test description',
    coordinates: {
      latitude: 1,
      longitude: 1,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    },
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
    <DashboardLayout title={'Start a new food collection'}>
      {ingredientsQuery.isLoading ? (
        <ActivityIndicator />
      ) : (
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
              Title
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
                  onPress={() => navigate('SelectLocation', { coordinates })}
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
              Most needed products
            </Text>
            <FormControl isRequired px="4" my="4">
              <Stack>
                <Picker
                  showSearch={true}
                  mode="MULTI"
                  value={formData.ingredients}
                  selectionLimit={10}
                  onChange={items => {
                    setFormData({
                      ...formData,
                      ingredients: items,
                    });
                  }}
                >
                  {ingredientsQuery.data.map(ingredient => (
                    <Picker.Item
                      key={ingredient.value}
                      value={ingredient}
                      label={ingredient.label}
                    />
                  ))}
                </Picker>
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
              Description
            </Text>
            <FormControl isRequired px="4" my="4">
              <TextArea
                py={4}
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    description: text,
                  })
                }
              />
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
              onPress={() =>
                mealCollectionMutation.mutate(
                  {
                    description: formData.description,
                    coordinates: formData.coordinates,
                    title: formData.name,
                    neededIngredients: formData.ingredients.map(
                      ingredient => ingredient.value,
                    ),
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries('foodCollections');
                      goBack();
                    },
                  },
                )
              }
              _text={{ fontSize: 'md' }}
            >
              Save
            </Button>
          </Center>
        </VStack>
      )}
    </DashboardLayout>
  );
};

export default AddFoodCollectionView;
