import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  Center,
  FormControl,
  Stack,
  Input,
  Select,
  HStack,
  TextArea,
} from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigation } from '@react-navigation/native';

const AddFoodCollectionView = ({ route: { params: { coordinates } = {} } }) => {
  const { navigate } = useNavigation();

  const [formData, setFormData] = useState<{
    title: string | null;
  }>({
    title: 'Test item',
  });

  return (
    <>
      <DashboardLayout title={'Start a new food collection'}>
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
                      title: text,
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
                <Select
                  selectedValue="1"
                  py={4}
                  _selectedItem={{
                    bg: 'teal.600',
                  }}
                  onValueChange={itemValue => {
                    setFormData({
                      ...formData,
                    });
                  }}
                >
                  <Select.Item label="Fridge" value="1" />
                  <Select.Item label="Freezer" value="2" />
                  <Select.Item label="Dry pantry" value="3" />
                </Select>
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
              <TextArea py={4} />
            </FormControl>
          </Box>
          <Center px="4">
            <Button
              borderRadius="4"
              width="100%"
              size="md"
              mt="8"
              bg="primary.900"
              onPress={() => {}}
              _text={{ fontSize: 'md' }}
            >
              Save
            </Button>
          </Center>
        </VStack>
      </DashboardLayout>
    </>
  );
};

export default AddFoodCollectionView;
