import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Image,
  Pressable,
  Divider,
  Button,
} from 'native-base';
import { ImageSourcePropType } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DashboardLayout from '../../layouts/DashboardLayout';
import MapView, { Marker } from 'react-native-maps';

type Review = {
  image: ImageSourcePropType;
  name: string;
  time: string;
  review: string;
};

const reviews: Review[] = [
  {
    image: require('../../assets/handsome.jpg'),
    name: 'Laura Jones',
    time: '12 May 2021',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  },
  {
    image: require('../../assets/smiling.jpg'),
    name: 'Laura Jones',
    time: '02 Jan 2021',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  },
  {
    image: require('../../assets/young-girl.jpg'),
    name: 'Rati Agarwal',
    time: '31 Aug 2021',
    review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  },
];

const AddToCartButton = () => {
  return (
    <Button
      flex={1}
      mt={4}
      py={3}
      mx={4}
      borderRadius="4"
      _dark={{ bg: 'violet.700', _pressed: { bg: 'primary.500' } }}
      _light={{ bg: 'primary.900' }}
      _text={{ fontSize: 'md', fontWeight: 'semibold' }}
    >
      Reserve
    </Button>
  );
};

function ProductImage() {
  return (
    <Box
      p="2"
      height={200}
      _light={{ bg: 'primary.50' }}
      borderRadius="md"
      alignItems="center"
      my={5}
      px={{ base: '2', md: '2' }}
      justifyContent="center"
      mx={{ base: 4 }}
    >
      <Image
        width="full"
        height={{ base: 'full', md: 'full' }}
        rounded="lg"
        alt="Alternate Text"
        source={{
          uri: 'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
        }}
      />
    </Box>
  );
}
function ProductInfo() {
  return (
    <>
      <VStack>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={{ md: 4 }}
        >
          <Text
            fontSize="lg"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
            fontWeight="medium"
          >
            Loaf of bread (4)
          </Text>
          <HStack alignItems="center" space="1">
            <Icon size="4" name={'star'} as={AntDesign} color="amber.400" />
            <Text
              fontSize="md"
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.50' }}
            >
              4.9
            </Text>
            <Text
              fontSize="sm"
              fontWeight="medium"
              _light={{ color: 'coolGray.400' }}
              _dark={{ color: 'coolGray.400' }}
            >
              (120)
            </Text>
          </HStack>
        </HStack>
        <Text fontSize="sm" fontWeight="medium" color="coolGray.400">
          Baked goods
        </Text>
        <Text
          fontSize="xl"
          fontWeight="medium"
          _light={{ color: 'coolGray.800' }}
          _dark={{ color: 'coolGray.50' }}
        >
          1 €
        </Text>
      </VStack>
    </>
  );
}

function Description() {
  const [tabName, setTabName] = React.useState('Description');
  return (
    <>
      <HStack mt={{ md: 8, base: 5 }} space="4">
        <Pressable
          onPress={() => {
            setTabName('Description');
          }}
        >
          <Text
            fontSize="16"
            fontWeight="medium"
            letterSpacing="0.4"
            _light={{
              color: tabName === 'Description' ? 'primary.900' : 'coolGray.400',
            }}
            _dark={{
              color: tabName === 'Description' ? 'coolGray.50' : 'coolGray.400',
            }}
          >
            Description
          </Text>
          {tabName === 'Description' ? (
            <Box width="100%" py="1">
              <Divider
                _light={{ bg: 'primary.900' }}
                _dark={{ bg: 'primary.700' }}
              />
            </Box>
          ) : null}
        </Pressable>
        <Pressable
          onPress={() => {
            setTabName('Reviews');
          }}
        >
          <Text
            fontSize="16"
            fontWeight="medium"
            letterSpacing="0.4"
            _light={{
              color: tabName === 'Reviews' ? 'primary.900' : 'coolGray.400',
            }}
            _dark={{
              color: tabName === 'Reviews' ? 'coolGray.50' : 'coolGray.400',
            }}
          >
            Company reviews
          </Text>
          {tabName === 'Reviews' ? (
            <Box width="100%" py="1">
              <Divider
                _light={{ bg: 'primary.900' }}
                _dark={{ bg: 'primary.700' }}
              />
            </Box>
          ) : (
            <></>
          )}
        </Pressable>
      </HStack>
      {tabName === 'Description' ? (
        <VStack>
          <Text
            mt="3"
            fontSize="sm"
            lineHeight="lg"
            fontWeight="normal"
            letterSpacing="0.3"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.100' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet velit pretium, viverra ex ut, tempus nulla. Donec non cursus
            nulla.
          </Text>
          <Text
            pt="2"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Pickup time
          </Text>
          <Text>18:00 - 19:00</Text>
          <Text
            pt="2"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Pickup location
          </Text>
          <Text>47 W 13th St, New York, NY 11214</Text>
          <MapView
            style={{ height: 200, marginTop: 12 }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ longitude: -122.43, latitude: 37.78 }}
              title="Test"
              description="Testing"
            />
          </MapView>
        </VStack>
      ) : (
        reviews.map((item, idx) => {
          return (
            <VStack my="3" key={idx}>
              <HStack justifyContent="space-between">
                <HStack space="3">
                  <Avatar source={item.image} height="9" width="9" />
                  <VStack space="1">
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      _dark={{ color: 'coolGray.50' }}
                      _light={{ color: 'coolGray.800' }}
                    >
                      {item.name}
                    </Text>
                    <HStack space="1">
                      <Icon
                        size="4"
                        name="star"
                        as={AntDesign}
                        color="amber.400"
                      />
                    </HStack>
                  </VStack>
                </HStack>
                <Text
                  fontSize="sm"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.300' }}
                >
                  {item.time}
                </Text>
              </HStack>
              <Text
                alignItems="center"
                lineHeight="lg"
                mt="4"
                _light={{ color: 'coolGray.500' }}
                _dark={{ color: 'coolGray.300' }}
                fontSize="md"
              >
                {item.review}
              </Text>
            </VStack>
          );
        })
      )}
    </>
  );
}
export default function () {
  return (
    <>
      <DashboardLayout title="Walmart">
        <ProductImage />
        <Box px={4} pb={100}>
          <ProductInfo />
          <Description />
        </Box>
      </DashboardLayout>
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg="white"
        pt={0}
        pb={6}
        shadow={7}
      >
        <AddToCartButton />
      </Box>
    </>
  );
}
