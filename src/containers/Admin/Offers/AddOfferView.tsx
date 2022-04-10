import React, { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import {
  Box,
  Button,
  Center,
  FormControl,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const AddOfferView = () => {
  const [formData, setFormData] = useState<{
    name: string;
    ingredients: any;
    description: string;
  }>({
    name: 'Test item',
    ingredients: [],
    description: '',
  });
  return (
    <DashboardLayout title="Add a new offer">
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
            Offer title
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
            Description (optional)
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
        <Pressable
          px="4"
          pb="4"
          _light={{ bg: 'white' }}
          _dark={{ bg: { base: 'coolGray.800', md: 'coolGray.900' } }}
        >
          <Text
            fontSize="md"
            mb="5"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
            fontWeight="bold"
          >
            Photo
          </Text>

          <Box
            width="100%"
            height="20"
            _light={{ borderColor: 'coolGray.300' }}
            _dark={{ borderColor: 'coolGray.500' }}
            borderWidth="2"
            borderStyle="dashed"
          >
            <Pressable
              onPress={() => {
                console.log('hello');
              }}
            >
              <VStack justifyContent="center" alignItems="center" space="2">
                <Icon
                  as={MaterialIcons}
                  name={'cloud-upload'}
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.300' }}
                  size="6"
                  mt="4"
                />
                <Text
                  fontSize="sm"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.300' }}
                >
                  Upload
                </Text>
              </VStack>
            </Pressable>
          </Box>
        </Pressable>
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
            Products being given away
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
      </VStack>
      <Center px="4" mt="auto" py={4}>
        <Button
          borderRadius="4"
          width="100%"
          size="md"
          bg="primary.900"
          _text={{ fontSize: 'md' }}
        >
          Save
        </Button>
      </Center>
    </DashboardLayout>
  );
};

export default AddOfferView;
