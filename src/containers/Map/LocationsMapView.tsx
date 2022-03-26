import React from 'react';
import {
  Text,
  VStack,
  Button,
  Center,
  Box,
  HStack,
  Stack,
  Avatar,
  Icon,
  Divider,
  Image,
} from 'native-base';
import IconMap from './components/IconMap';
import IconMessage from './components/IconMessage';
import IconMobile from './components/IconMobile';
import IconPin from './components/IconPin';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
// import MapViewDirections from 'react-native-maps-directions';

// const GOOGLE_MAPS_API_KEY = Constants?.manifest?.extra?.GOOGLE_MAPS_API_KEY;

type Rating = {
  type: string;
  iconName: string;
};

type RestaurentInfo = {
  svg: object;
  name: string;
  address: string;
};
const rating: Rating[] = [
  {
    type: 'fill',
    iconName: 'star',
  },
  {
    type: 'fill',
    iconName: 'star',
  },
  {
    type: 'fill',
    iconName: 'star',
  },
  {
    type: 'fill',
    iconName: 'star',
  },
  {
    type: 'empty',
    iconName: 'star',
  },
];
const restaurentInfo: RestaurentInfo[] = [
  {
    svg: <IconPin />,
    name: 'Pickup Location',
    address: '47 W 13th St, New York, NY 11214',
  },
  {
    svg: <IconMap />,
    name: 'Drop Location',
    address: 'Lafayette St, New York, NY 10013',
  },
];
function InformationBox() {
  return (
    <Box
      _light={{ bg: 'white' }}
      _dark={{ bg: 'coolGray.800' }}
      borderRadius="lg"
      py={5}
      width="100%"
      mt="auto"
    >
      <HStack alignItems="center" justifyContent="space-between" px={4}>
        <HStack alignItems="center" space={3}>
          <Avatar source={require('../../assets/man.jpg')} />
          <VStack>
            <Text
              fontSize="md"
              fontWeight="medium"
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.100' }}
            >
              Prime Burger
            </Text>
            <HStack>
              {rating.map((item, index) => {
                return item.type === 'fill' ? (
                  <Icon
                    key={index}
                    as={FontAwesome}
                    name={item.iconName}
                    size="xxs"
                    color="#F6C529"
                  />
                ) : (
                  <Icon
                    key={index}
                    as={FontAwesome}
                    name={item.iconName}
                    size="xxs"
                    color="coolGray.200"
                  />
                );
              })}
            </HStack>
          </VStack>
        </HStack>
        <HStack alignItems="center" space={5}>
          <IconMessage />
          <IconMobile />
        </HStack>
      </HStack>
      <Divider
        mt={3}
        _light={{ bg: 'coolGray.200' }}
        _dark={{ bg: 'coolGray.700' }}
      />
      <VStack space={8} mt={3} px={4}>
        {restaurentInfo.map((item, index) => {
          return (
            <HStack alignItems="center" space={3} key={index}>
              <Center
                _light={{ bg: 'primary.100' }}
                _dark={{ bg: 'coolGray.600' }}
                p={3}
                rounded="full"
              >
                {item.svg}
              </Center>
              <VStack>
                <Text
                  fontSize="xs"
                  fontWeight="normal"
                  _light={{ color: 'coolGray.500' }}
                  _dark={{ color: 'coolGray.400' }}
                >
                  {item.name}
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="normal"
                  _light={{ color: 'coolGray.900' }}
                  _dark={{ color: 'white' }}
                >
                  {item.address}
                </Text>
              </VStack>
            </HStack>
          );
        })}
      </VStack>
      <Stack space={3} mt={9} px={4}>
        <Button
          w="100%"
          py={4}
          borderRadius="4"
          _dark={{
            bg: 'primary.800',
            _focus: { bg: 'primary.700' },
          }}
          _light={{ bg: 'primary.900', _focus: { bg: 'primary.900' } }}
          _text={{ fontSize: 'sm', fontWeight: 'medium' }}
          onPress={() =>
            console.log('pair your device with help of this button')
          }
        >
          ARRIVED
        </Button>
      </Stack>
    </Box>
  );
}
const LocationsMapView = () => {
  return (
    <>
      <MapView
        style={{
          flex: 1,
        }}
        region={{
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
          latitude: 12.910938686053615,
          longitude: 77.60184408715048,
        }}
      >
        <Marker
          coordinate={{
            latitude: 12.906263633852848,
            longitude: 77.6012477730121,
          }}
        >
          <Image
            source={require('./components/IconRestaurant.png')}
            style={{ height: 35, width: 35 }}
            alt="Alternate Text"
          />
        </Marker>
        <Marker
          coordinate={{
            latitude: 12.910938686053615,
            longitude: 77.60184408715048,
          }}
        >
          <Image
            source={require('./components/ImageRide.png')}
            style={{ height: 35, width: 35 }}
            alt="Alternate Text"
          />
        </Marker>

        {/*<MapViewDirections*/}
        {/*  origin={{*/}
        {/*    latitude: 12.906263633852848,*/}
        {/*    longitude: 77.6012477730121,*/}
        {/*  }}*/}
        {/*  destination={{*/}
        {/*    latitude: 12.910938686053615,*/}
        {/*    longitude: 77.60184408715048,*/}
        {/*  }}*/}
        {/*  apikey={GOOGLE_MAPS_API_KEY}*/}
        {/*/>*/}
      </MapView>
      <InformationBox />
    </>
  );
};

export default LocationsMapView;
