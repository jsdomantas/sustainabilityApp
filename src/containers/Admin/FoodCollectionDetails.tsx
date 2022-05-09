import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import MapView, { Marker } from 'react-native-maps';
import { Box, Button, Stack, Text, VStack } from 'native-base';
import { Chip } from 'react-native-ui-lib';
import { useFoodCollectionQuery } from './queries';
import { ActivityIndicator } from 'react-native';

const ProductChip = ({ label }) => {
  return (
    <Box mb={2}>
      <Chip label={label} />
    </Box>
  );
};

const FoodCollectionDetails = ({
  route: {
    params: { id },
  },
}) => {
  const foodCollectionQuery = useFoodCollectionQuery(id);

  return (
    <DashboardLayout title="Food collection details">
      {foodCollectionQuery.isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <MapView
            style={{ height: 300 }}
            region={{
              latitude: foodCollectionQuery.data?.data.latitude,
              longitude: foodCollectionQuery.data?.data.longitude,
              longitudeDelta: 0.025,
              latitudeDelta: 0.025,
            }}
          >
            <Marker
              coordinate={{
                latitude: foodCollectionQuery.data?.data.latitude,
                longitude: foodCollectionQuery.data?.data.longitude,
              }}
            />
          </MapView>
          <VStack px={4} mt={2}>
            <Box mb={2}>
              <Text
                fontSize="lg"
                fontWeight="medium"
                _light={{ color: 'coolGray.800' }}
              >
                {foodCollectionQuery.data?.data.title}
              </Text>
              <Text fontSize="sm" _light={{ color: 'coolGray.800' }}>
                {`${foodCollectionQuery.data?.data.latitude}, ${foodCollectionQuery.data?.data.longitude}`}
              </Text>
            </Box>
            <Box mb={2}>
              <Text
                fontSize="md"
                _light={{ color: 'coolGray.800' }}
                fontWeight="bold"
              >
                Description
              </Text>
              <Text
                fontSize="sm"
                lineHeight="lg"
                fontWeight="normal"
                letterSpacing="0.3"
                _light={{ color: 'coolGray.800' }}
              >
                {foodCollectionQuery.data?.data.description}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize="md"
                _light={{ color: 'coolGray.800' }}
                fontWeight="bold"
                mb={2}
              >
                Most needed products
              </Text>
              <Stack space={2} direction="row" flexWrap="wrap">
                {foodCollectionQuery.data?.data.neededIngredients.map(
                  ingredient => (
                    <ProductChip label={ingredient.title} />
                  ),
                )}
              </Stack>
            </Box>
          </VStack>
          <Button style={{ marginTop: 'auto' }} mx={4} mb={4}>
            Mark as completed
          </Button>
        </>
      )}
    </DashboardLayout>
  );
};

export default FoodCollectionDetails;
