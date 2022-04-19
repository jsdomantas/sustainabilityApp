import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Pressable,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { ActivityIndicator, Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../RootStackParamList';
import { RouteNames } from '../../../constants/RouteNames';
import { Picker } from 'react-native-ui-lib';
import { useIngredientsQuery } from '../../../queries';
import { useCreateOfferMutation } from './queries';
import { useNavigation } from '@react-navigation/native';
import { queryClient } from '../../../utilities/reactQuery';

const AddOfferView = ({
  route: {
    params: { selectedProducts },
  },
}: NativeStackNavigationProp<RootStackParamList, RouteNames.AddOffer>) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    photoUrl: string;
    products: Array<{ label: string; value: number }>;
  }>({
    name: 'Test item',
    description: '',
    photoUrl: '',
    products: [],
  });

  const productsQuery = useIngredientsQuery();
  const addOfferMutation = useCreateOfferMutation();

  const { navigate } = useNavigation();

  useEffect(() => {
    if (selectedProducts) {
      setFormData({
        ...formData,
        products: selectedProducts.map(product => ({
          value: product.id,
          label: product.title,
        })),
      });
    }
  }, [selectedProducts]);

  const [uploading, setUploading] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: ['Take picture', 'Select picture', 'Cancel'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          launchCamera({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
          }).then(r => console.log(r));
        } else if (buttonIndex === 1) {
          launchImageLibrary({
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
          }).then(r => {
            const uri = r?.assets?.[0].uri;
            if (uri) {
              const fileName = uri.substring(uri.lastIndexOf('/') + 1);
              const uploadUri =
                Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

              setUploading(true);

              const task = storage().ref(fileName);

              task
                .putFile(uploadUri)
                .then(() => {
                  task.getDownloadURL().then(value =>
                    setFormData({
                      ...formData,
                      photoUrl: value,
                    }),
                  );
                })
                .catch(reason => console.error(reason))
                .finally(() => setUploading(false));
            }
          });
        }
      },
    );
  };

  return (
    <DashboardLayout title="Add a new offer">
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
            Offer title
          </Text>
          <FormControl isRequired px="4" my="4">
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
          </FormControl>
        </Box>
        <Box _light={{ bg: 'white' }}>
          <Text
            px="4"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
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
                {uploading ? (
                  <ActivityIndicator />
                ) : formData.photoUrl ? (
                  <Image
                    source={{ uri: formData.photoUrl }}
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
          <HStack alignItems="center" mx={4} justifyContent="space-between">
            <Text
              fontSize="md"
              _light={{ color: 'coolGray.800' }}
              fontWeight="bold"
            >
              Products being given away
            </Text>
            <Picker
              renderPicker={() => (
                <Button variant="ghost" size="sm" p={0} m={0}>
                  Edit list
                </Button>
              )}
              listProps={{
                removeClippedSubviews: true,
                maxToRenderPerBatch: 5,
                updateCellsBatchingPeriod: 150,
              }}
              showSearch={true}
              mode="MULTI"
              value={formData.products}
              selectionLimit={10}
              onChange={items => {
                setFormData({ ...formData, products: items });
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
          </HStack>
          <HStack flexWrap="wrap" px={4} mt={4}>
            {formData.products.map(product => (
              <HStack
                key={product.value}
                backgroundColor="gray.100"
                borderRadius={10}
                alignItems="center"
                justifyContent="center"
                px={2}
                py={1}
                mb={2}
                mr={2}
              >
                <Text mr={1}>{product.label}</Text>
                <IconButton
                  onPress={() =>
                    setFormData(prevState => ({
                      ...prevState,
                      products: prevState.products.filter(
                        p => p.value !== product.value,
                      ),
                    }))
                  }
                  p={0}
                  mt={0.5}
                  icon={
                    <Icon
                      size="4"
                      as={MaterialCommunityIcons}
                      name="close"
                      color="gray.400"
                    />
                  }
                />
              </HStack>
            ))}
          </HStack>
        </Box>
      </VStack>
      <Center px="4" mt="auto" py={4}>
        <Button
          borderRadius="4"
          width="100%"
          size="md"
          bg="primary.900"
          _text={{ fontSize: 'md' }}
          onPress={() => {
            addOfferMutation.mutate(formData, {
              onSuccess: async () => {
                await queryClient.invalidateQueries(['offers', 'created']);
                navigate('Home');
              },
            });
          }}
        >
          Save
        </Button>
      </Center>
    </DashboardLayout>
  );
};

export default AddOfferView;
