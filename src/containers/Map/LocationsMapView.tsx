import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
} from 'native-base';
import IconMap from './components/IconMap';
import IconPin from './components/IconPin';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { FontAwesome } from '@expo/vector-icons';

import { RouteNames } from '../../constants/RouteNames';
import { useNavigation } from '@react-navigation/native';
import { useCurrentLocation } from '../../utilities/hooks';

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
    name: 'Pickup time',
    address: '18:00 - 19:00',
  },
];
function InformationBox() {
  const { navigate } = useNavigation();

  return (
    <Box
      _light={{ bg: 'white' }}
      _dark={{ bg: 'coolGray.800' }}
      borderTopRadius="3xl"
      shadow={7}
      py={5}
      width="100%"
      position="absolute"
      bottom={0}
    >
      <HStack alignItems="center" justifyContent="space-between" px={4}>
        <HStack alignItems="center" space={3}>
          <Avatar
            source={{
              uri: 'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
            }}
          />
          <VStack>
            <Text
              fontSize="md"
              fontWeight="medium"
              _light={{ color: 'coolGray.800' }}
            >
              Loaf of bread (4)
            </Text>
            <Text fontSize="sm" _light={{ color: 'coolGray.400' }} mb={1}>
              Walmart
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
          <Button onPress={() => navigate(RouteNames.ProductDetails)}>
            More details
          </Button>
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
          Reserve
        </Button>
      </Stack>
    </Box>
  );
}

const markers = [
  { latitude: 54.6818381, longitude: 25.2780006 },
  { latitude: 54.682, longitude: 25.28 },
  { latitude: 54.683, longitude: 25.29 },
  { latitude: 54.684, longitude: 25.26 },
  { latitude: 54.6815, longitude: 25.229 },
  { latitude: 54.6821, longitude: 25.283 },
  { latitude: 54.6831, longitude: 25.21 },
  { latitude: 54.68, longitude: 25.27 },
];

const LocationsMapView = () => {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);
  const mapViewRef = useRef<MapView>(null);
  const { pos } = useCurrentLocation();

  useEffect(() => {
    mapViewRef.current?.animateToRegion?.(
      {
        latitude: pos?.coords.latitude,
        longitude: pos?.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      300,
    );
  }, [pos]);

  return (
    <>
      {/*// @ts-ignore*/}
      <MapView
        ref={mapViewRef}
        showsUserLocation={true}
        onPress={() => {
          if (isInfoBoxOpen) {
            setIsInfoBoxOpen(false);
          }
        }}
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
          latitude: 54.6872,
          longitude: 25.2797,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={marker.longitude}
            onPress={() => {
              setIsInfoBoxOpen(true);
              mapViewRef.current?.animateToRegion(
                {
                  ...marker,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                },
                300,
              );
            }}
            coordinate={marker}
          >
            <Image
              source={require('./components/IconRestaurant.png')}
              style={{ height: 35, width: 35 }}
              alt="Alternate Text"
            />
          </Marker>
        ))}
      </MapView>
      {isInfoBoxOpen && <InformationBox />}
    </>
  );
};

export default LocationsMapView;
