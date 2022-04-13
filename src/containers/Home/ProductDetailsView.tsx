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
import { ActivityIndicator, ImageSourcePropType } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DashboardLayout from '../../layouts/DashboardLayout';
import MapView, { Marker } from 'react-native-maps';
import { useOfferActionMutation, useOfferQuery } from './queries';
import { queryClient } from '../../utilities/reactQuery';
import { RouteNames } from '../../constants/RouteNames';
import { useNavigation } from '@react-navigation/native';

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
];

const AddToCartButton = ({ isLoading, onPress }) => {
  return (
    <Button
      flex={1}
      mt={4}
      py={3}
      mx={4}
      isLoading={isLoading}
      borderRadius="4"
      _light={{ bg: 'primary.900' }}
      _text={{ fontSize: 'md', fontWeight: 'semibold' }}
      onPress={onPress}
    >
      Reserve
    </Button>
  );
};

function ProductInfo({ item }) {
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
            fontWeight="medium"
          >
            {item.title}
          </Text>
          <HStack alignItems="center" space="1">
            <Icon size="4" name={'star'} as={AntDesign} color="amber.400" />
            <Text fontSize="md" _light={{ color: 'coolGray.800' }}>
              4.9
            </Text>
            <Text
              fontSize="sm"
              fontWeight="medium"
              _light={{ color: 'coolGray.400' }}
            >
              (120)
            </Text>
          </HStack>
        </HStack>
        <Text fontSize="sm" fontWeight="medium" color="coolGray.400">
          {item.category?.title || ''}
        </Text>
      </VStack>
    </>
  );
}

function Description({ item }) {
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
          >
            Description
          </Text>
          {tabName === 'Description' ? (
            <Box width="100%" py="1">
              <Divider _light={{ bg: 'primary.900' }} />
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
          >
            Company information
          </Text>
          {tabName === 'Reviews' ? (
            <Box width="100%" py="1">
              <Divider _light={{ bg: 'primary.900' }} />
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
          >
            {item.description || '-'}
          </Text>
          <Text
            pt="2"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Pickup time
          </Text>
          <Text>{item.pickupTime}</Text>
          <Text
            pt="2"
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            fontWeight="bold"
          >
            Products
          </Text>
          <HStack flexWrap="wrap" mt={2}>
            {item.products.map(product => (
              <HStack
                key={product.title}
                backgroundColor="gray.100"
                borderRadius={10}
                alignItems="center"
                justifyContent="center"
                px={2}
                py={1}
                mr={2}
              >
                <Text mr={1}>{product.title}</Text>
              </HStack>
            ))}
          </HStack>
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
              latitude: item.businessOwner.latitude,
              longitude: item.businessOwner.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                longitude: item.businessOwner.longitude,
                latitude: item.businessOwner.latitude,
              }}
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
                <Text fontSize="sm" _light={{ color: 'coolGray.500' }}>
                  {item.time}
                </Text>
              </HStack>
              <Text
                alignItems="center"
                lineHeight="lg"
                mt="4"
                _light={{ color: 'coolGray.500' }}
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
export default function ({
  route: {
    params: { id },
  },
}) {
  const { navigate } = useNavigation();

  const offerQuery = useOfferQuery(id);
  const offerActionMutation = useOfferActionMutation();

  console.log(offerQuery.data);

  return (
    <>
      <DashboardLayout title={offerQuery.data?.businessOwner?.title}>
        {offerQuery.isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
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
                source={{ uri: offerQuery.data.photoUrl }}
              />
            </Box>
            <Box px={4} pb={100}>
              <ProductInfo item={offerQuery.data} />
              <Description item={offerQuery.data} />
            </Box>
          </>
        )}
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
        <AddToCartButton
          isLoading={offerQuery.isLoading || offerActionMutation.isLoading}
          onPress={() =>
            offerActionMutation.mutate(
              { id, actionType: 'reserve' },
              {
                onSuccess: async () => {
                  await queryClient.invalidateQueries(['offers', 'all']);
                  await queryClient.invalidateQueries(['offers', 'history']);
                  navigate(RouteNames.ReservationHistory);
                },
              },
            )
          }
        />
      </Box>
    </>
  );
}
