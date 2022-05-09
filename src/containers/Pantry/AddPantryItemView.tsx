import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  Center,
  FormControl,
  Input,
  Pressable,
  Icon,
  Select,
  HStack,
  Image,
} from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MaterialIcons } from '@expo/vector-icons';
import { DateTimePicker, Picker } from 'react-native-ui-lib';
import { addSeconds, format, getTime, parseISO } from 'date-fns';
import { useAddPantryItemMutation } from './queries/queries';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import { useIngredientsQuery } from '../../queries';
import { ActivityIndicator } from 'react-native';
import { useImagePickerActionSheet } from '../../utilities/hooks';

function MainContent() {
  const { goBack } = useNavigation();

  const addPantryItemMutation = useAddPantryItemMutation();
  const productsQuery = useIngredientsQuery();

  const { openActionSheet, isUploading, photoUrl } =
    useImagePickerActionSheet();

  const [formData, setFormData] = useState<{
    quantity: number | null;
    expiration_date: string | null;
    category: string | undefined;
    product: any;
    units: string | undefined;
    photoUrl: any;
  }>({
    quantity: 100,
    expiration_date: format(new Date(), 'yyyy-MM-dd'),
    category: 'fridge',
    product: null,
    units: 'g',
    photoUrl: '',
  });

  async function onDisplayNotification(itemTitle: string) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const tenSecondsFromNowOn = getTime(addSeconds(new Date(), 5));

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: tenSecondsFromNowOn,
    };

    await notifee.createTriggerNotification(
      {
        title: `${itemTitle} is expiring in two days`,
        body: 'Make sure to consume it before the expiration date!',
        android: {
          channelId,
        },
      },
      trigger,
    );
  }

  return (
    <>
      <VStack
        _light={{ bg: { md: 'white' }, borderColor: 'coolGray.200' }}
        safeAreaBottom
        px={{ base: 0, md: 12, lg: 24, xl: 40 }}
        borderRadius={{ md: '8' }}
        borderWidth={{ md: '1' }}
        py={{ base: 0, md: 6 }}
      >
        <HStack>
          <Box _light={{ bg: 'white' }} mt={4} mr="auto">
            <Text
              px="4"
              fontSize="md"
              _light={{ color: 'coolGray.800' }}
              fontWeight="bold"
            >
              Product
            </Text>
          </Box>
          <Box mr={4} mt={4}>
            <Picker
              showSearch={true}
              value={formData.product}
              renderPicker={() => (
                <Button testID="selectProductsBtn" variant="outline" size="sm">
                  Browse
                </Button>
              )}
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
          </Box>
        </HStack>
        <Box px={4} pb={4}>
          <Text fontSize="md" _light={{ color: 'coolGray.800' }}>
            {formData?.product?.label || '-'}
          </Text>
        </Box>
        <HStack _light={{ bg: 'white' }}>
          <Box>
            <Text
              px="4"
              fontSize="md"
              _light={{ color: 'coolGray.800' }}
              fontWeight="bold"
            >
              Quantity
            </Text>
            <FormControl isRequired px="4" my="4">
              <Input
                py="4"
                maxLength={4}
                type="number"
                keyboardType="numeric"
                defaultValue="100"
                placeholder="100"
                onChangeText={text =>
                  setFormData({
                    ...formData,
                    quantity: Number(text),
                  })
                }
              />
            </FormControl>
          </Box>
          <Box>
            <Text
              px="4"
              fontSize="md"
              _light={{ color: 'coolGray.800' }}
              fontWeight="bold"
            >
              Units
            </Text>
            <FormControl isRequired my="4" ml={4}>
              <Select
                width={100}
                selectedValue={formData.units}
                py={4}
                _selectedItem={{
                  bg: 'primary.900',
                  _text: {
                    color: 'white',
                  },
                }}
                onValueChange={itemValue => {
                  setFormData({
                    ...formData,
                    units: itemValue,
                  });
                }}
              >
                <Select.Item label="Grams" value="g" />
                <Select.Item label="Kilograms" value="kg" />
                <Select.Item label="Mililiters" value="ml" />
                <Select.Item label="Liters" value="l" />
                <Select.Item label="Units" value="unit" />
              </Select>
            </FormControl>
          </Box>
        </HStack>
        <Box _light={{ bg: 'white' }}>
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Category
          </Text>
          <FormControl isRequired px="4" my="4">
            <Select
              selectedValue={formData.category}
              py={4}
              _selectedItem={{
                bg: 'primary.900',
                _text: {
                  color: 'white',
                },
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
          </FormControl>
        </Box>
        <Box _light={{ bg: 'white' }}>
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Expiration date
          </Text>
          <FormControl isRequired px="4" mt={4}>
            <DateTimePicker
              minimumDate={new Date()}
              value={parseISO(formData.expiration_date as string)}
              onChange={date =>
                setFormData({
                  ...formData,
                  expiration_date: format(date, 'yyyy-MM-dd'),
                })
              }
            />
          </FormControl>
        </Box>
        <Pressable px="4" pb="4" _light={{ bg: 'white' }}>
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
        <Center px="4">
          <Button
            borderRadius="4"
            width="100%"
            disabled={!formData.product}
            size="md"
            mt="20"
            bg="primary.900"
            onPress={() => {
              addPantryItemMutation.mutate(
                { ...formData, photoUrl },
                {
                  onSuccess: () => {
                    goBack();
                    onDisplayNotification(formData?.product?.label).then();
                  },
                },
              );
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
