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
import { useAllOffersQuery } from '../Home/queries';

type Rating = {
  type: string;
  iconName: string;
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

function InformationBox({ selectedOffer }) {
  const { navigate } = useNavigation();

  const offerInfo = [
    {
      svg: <IconPin />,
      name: 'Pickup Location',
      address: '47 W 13th St, New York, NY 11214',
    },
    {
      svg: <IconMap />,
      name: 'Pickup time',
      address: selectedOffer.pickupTime,
    },
  ];

  return (
    <Box
      _light={{ bg: 'white' }}
      borderTopRadius="3xl"
      shadow={7}
      py={5}
      width="100%"
      position="absolute"
      bottom={0}
    >
      <HStack alignItems="center" justifyContent="space-between" px={4}>
        <HStack alignItems="center" space={3}>
          <Avatar source={{ uri: selectedOffer.photoUrl }} />
          <VStack>
            <Text
              fontSize="md"
              fontWeight="medium"
              _light={{ color: 'coolGray.800' }}
            >
              {selectedOffer.title}
            </Text>
            <Text fontSize="sm" _light={{ color: 'coolGray.400' }} mb={1}>
              {selectedOffer.businessOwner.title}
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
          <Button
            onPress={() =>
              navigate(RouteNames.ProductDetails, { id: selectedOffer.id })
            }
          >
            More details
          </Button>
        </HStack>
      </HStack>
      <Divider mt={3} _light={{ bg: 'coolGray.200' }} />
      <VStack space={8} mt={3} px={4}>
        {offerInfo.map((item, index) => {
          return (
            <HStack alignItems="center" space={3} key={index}>
              <Center _light={{ bg: 'primary.100' }} p={3} rounded="full">
                {item.svg}
              </Center>
              <VStack>
                <Text
                  fontSize="xs"
                  fontWeight="normal"
                  _light={{ color: 'coolGray.500' }}
                >
                  {item.name}
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="normal"
                  _light={{ color: 'coolGray.900' }}
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

const LocationsMapView = () => {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const mapViewRef = useRef<MapView>(null);
  const { pos } = useCurrentLocation();

  const allOffersQuery = useAllOffersQuery(pos?.coords);

  useEffect(() => {
    // @ts-ignore
    mapViewRef.current?.animateToRegion?.(
      {
        latitude: pos?.coords.latitude,
        longitude: pos?.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      300,
    );

    allOffersQuery.refetch().then();
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
        {allOffersQuery.data?.map(offer => (
          <Marker
            key={offer.id}
            onPress={() => {
              setSelectedOffer(offer);
              setIsInfoBoxOpen(true);
              // @ts-ignore
              mapViewRef.current?.animateToRegion(
                {
                  longitude: offer.businessOwner.longitude,
                  latitude: offer.businessOwner.latitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                },
                300,
              );
            }}
            coordinate={{
              longitude: offer.businessOwner.longitude,
              latitude: offer.businessOwner.latitude,
            }}
          >
            <Image
              source={require('./components/IconRestaurant.png')}
              style={{ height: 35, width: 35 }}
              alt="Alternate Text"
            />
          </Marker>
        ))}
      </MapView>
      {isInfoBoxOpen && <InformationBox selectedOffer={selectedOffer} />}
    </>
  );
};

export default LocationsMapView;
