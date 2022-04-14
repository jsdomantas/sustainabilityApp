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
  Pressable,
  Icon,
  Select,
  HStack,
} from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { DateTimePicker, Picker } from 'react-native-ui-lib';
import { addSeconds, format, getTime, parseISO } from 'date-fns';
import { useAddPantryItemMutation } from './queries/queries';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { useIngredientsQuery } from '../../queries';

function MainContent() {
  const addPantryItemMutation = useAddPantryItemMutation();
  const { goBack } = useNavigation();

  const productsQuery = useIngredientsQuery();

  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const tenSecondsFromNowOn = getTime(addSeconds(new Date(), 10));

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: tenSecondsFromNowOn,
    };

    // Display a notification
    await notifee.createTriggerNotification(
      {
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
        },
      },
      trigger,
    );
  }

  const [formData, setFormData] = useState<{
    quantity: number | null;
    expiration_date: string | null;
    category: string | null;
    product: any;
    units: string | null;
    photoUrl: any;
  }>({
    quantity: 100,
    expiration_date: format(new Date(), 'yyyy-MM-dd'),
    category: 'fridge',
    product: null,
    units: 'g',
    photoUrl: '',
  });

  return (
    <>
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
        <Box _light={{ bg: 'white' }} mt={4}>
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Product
          </Text>
          <FormControl isRequired px="4" mt={4}>
            <Picker
              showSearch={true}
              value={formData.product}
              listProps={{
                removeClippedSubviews: true,
                maxToRenderPerBatch: 5,
                updateCellsBatchingPeriod: 150,
              }}
              onChange={item => {
                setFormData({
                  ...formData,
                  product: item,
                });
              }}
            >
              {productsQuery.data?.map(ingredient => (
                <Picker.Item
                  key={ingredient.value}
                  value={ingredient}
                  label={ingredient.label}
                />
              ))}
            </Picker>
          </FormControl>
        </Box>
        <HStack _light={{ bg: 'white' }}>
          <Box>
            <Text
              px="4"
              fontSize="md"
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.50' }}
              fontWeight="bold"
            >
              Quantity
            </Text>
            <FormControl isRequired px="4" my="4">
              <Stack>
                <Input
                  py="4"
                  type="text"
                  keyboardType="numeric"
                  placeholder="Enter the quantity you have"
                  defaultValue="100"
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      quantity: Number(text),
                    })
                  }
                />
              </Stack>
            </FormControl>
          </Box>
          <Box>
            <Text
              px="4"
              fontSize="md"
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.50' }}
              fontWeight="bold"
            >
              Units
            </Text>
            <FormControl isRequired px="4" my="4">
              <Stack>
                <Input
                  py="4"
                  type="text"
                  keyboardType="numeric"
                  placeholder="Enter the quantity you have"
                  defaultValue="g"
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      units: text,
                    })
                  }
                />
              </Stack>
            </FormControl>
          </Box>
        </HStack>
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
            Category
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <Select
                selectedValue={formData.category}
                py={4}
                _selectedItem={{
                  bg: 'teal.600',
                }}
                onValueChange={itemValue => {
                  setFormData({
                    ...formData,
                    category: itemValue,
                  });
                }}
              >
                <Select.Item label="Fridge" value="fridge" />
                <Select.Item label="Freezer" value="freezer" />
                <Select.Item label="Dry pantry" value="dry_pantry" />
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
            Expiration date
          </Text>
          <FormControl isRequired px="4" my="4">
            <Stack>
              <DateTimePicker
                value={parseISO(formData.expiration_date as string)}
                onChange={date =>
                  setFormData({
                    ...formData,
                    expiration_date: format(date, 'yyyy-MM-dd'),
                  })
                }
              />
            </Stack>
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
        <Center px="4">
          <Button
            borderRadius="4"
            width="100%"
            size="md"
            mt="8"
            bg="primary.900"
            onPress={() => {
              console.log(formData);
              addPantryItemMutation.mutate(formData, {
                onSuccess: () => {
                  goBack();
                  onDisplayNotification().then();
                },
              });
            }}
            _text={{ fontSize: 'md' }}
          >
            Save
          </Button>
        </Center>
      </VStack>
    </>
  );
}

const AddPantryItemView = () => {
  return (
    <>
      <DashboardLayout title={'Add new item'}>
        <MainContent />
      </DashboardLayout>
    </>
  );
};

export default AddPantryItemView;
