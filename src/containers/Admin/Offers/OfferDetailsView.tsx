import React, { useState } from 'react';
import {
  Box,
  HStack,
  Text,
  VStack,
  Image,
  Pressable,
  Divider,
  Button,
  Modal,
} from 'native-base';
import DashboardLayout from '../../../layouts/DashboardLayout';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../constants/RouteNames';
import { useCreatedOfferQuery } from './queries';
import { ActivityIndicator } from 'react-native';
import { useOfferActionMutation } from '../../Home/queries';
import { queryClient } from '../../../utilities/reactQuery';

function ProductImage({ photoUrl }) {
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
          uri: photoUrl,
        }}
      />
    </Box>
  );
}
function ProductInfo({ title, category = 'Other' }) {
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
            {title}
          </Text>
        </HStack>
        <Text fontSize="sm" fontWeight="medium" color="coolGray.400">
          {category}
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
        {item.status !== 'posted' && (
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
              Client information
            </Text>
            {tabName === 'Reviews' ? (
              <Box width="100%" py="1">
                <Divider _light={{ bg: 'primary.900' }} />
              </Box>
            ) : (
              <></>
            )}
          </Pressable>
        )}
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
            {item.description}
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
                key={product.id}
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
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                longitude: item.longitude,
                latitude: item.latitude,
              }}
              title="Test"
              description="Testing"
            />
          </MapView>
        </VStack>
      ) : (
        <Box>
          <Text>User contact info</Text>
        </Box>
      )}
    </>
  );
}
export default function ({
  route: {
    params: { id },
  },
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { navigate } = useNavigation();

  const createdOfferQuery = useCreatedOfferQuery(id);
  const offerActionMutation = useOfferActionMutation();

  console.log(createdOfferQuery.data);

  const ReviewModal = () => (
    <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Leave a review</Modal.Header>
        <Modal.Body>
          <Text>Would like to leave a review about the customer?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => setIsModalVisible(false)}
            >
              No
            </Button>
            <Button
              onPress={() => {
                setIsModalVisible(false);
                navigate(RouteNames.ClientRatingView, {
                  receiverId: createdOfferQuery.data.customerId,
                  offerId: id,
                });
              }}
            >
              Yes
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );

  return (
    <>
      <DashboardLayout title={createdOfferQuery.data?.title || ''}>
        {createdOfferQuery.isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <ProductImage photoUrl={createdOfferQuery.data.photoUrl} />
            <Box px={4} pb={100}>
              <ProductInfo title={createdOfferQuery.data.title} />
              <Description item={createdOfferQuery.data} />
            </Box>
          </>
        )}
      </DashboardLayout>
      {createdOfferQuery.data?.status !== 'taken' && (
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
          <Button
            flex={1}
            mt={4}
            py={3}
            mx={4}
            isLoading={
              createdOfferQuery.isLoading || offerActionMutation.isLoading
            }
            borderRadius="4"
            _dark={{ bg: 'violet.700', _pressed: { bg: 'primary.500' } }}
            _light={{ bg: 'primary.900' }}
            _text={{ fontSize: 'md', fontWeight: 'semibold' }}
            onPress={() => {
              offerActionMutation.mutate(
                { id, actionType: 'complete' },
                {
                  onSuccess: async () => {
                    setIsModalVisible(true);
                    await queryClient.invalidateQueries(['offers', 'created']);
                  },
                },
              );
            }}
          >
            Mark as taken
          </Button>
        </Box>
      )}
      <ReviewModal />
    </>
  );
}
