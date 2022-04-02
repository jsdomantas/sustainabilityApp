import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import MapView from 'react-native-maps';
import { Box, Button, Stack, Text, VStack } from 'native-base';
import { Chip } from 'react-native-ui-lib';

const ProductChip = ({ label }) => {
  return (
    <Box mb={2}>
      <Chip label={label} />
    </Box>
  );
};

const FoodCollectionDetails = () => {
  return (
    <DashboardLayout title="Food collection details">
      <MapView style={{ height: 300 }} />
      <VStack px={4} mt={2}>
        <Box mb={2}>
          <Text
            fontSize="lg"
            fontWeight="medium"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
          >
            Charity A
          </Text>
          <Text
            fontSize="sm"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
          >
            54.71106766775005, 25.259618386213436
          </Text>
        </Box>
        <Box mb={2}>
          <Text
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
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
            _dark={{ color: 'coolGray.100' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet velit pretium, viverra ex ut, tempus nulla. Donec non cursus
            nulla.
          </Text>
        </Box>
        <Box>
          <Text
            fontSize="md"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
            fontWeight="bold"
            mb={2}
          >
            Most needed products
          </Text>
          <Stack space={2} direction="row" flexWrap="wrap">
            <ProductChip label="Product 1" />
            <ProductChip label="Product 1" />
            <ProductChip label="Product 1" />
            <ProductChip label="Product 1" />
            <ProductChip label="Product 1" />
          </Stack>
        </Box>
      </VStack>
      <Button style={{ marginTop: 'auto' }} mx={4} mb={4}>
        Mark as completed
      </Button>
    </DashboardLayout>
  );
};

export default FoodCollectionDetails;
