import { Box, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';

function TrendCard({ item }) {
  return (
    <Box
      _light={{ bg: 'white' }}
      _dark={{ bg: 'coolGray.700' }}
      width={{ md: 300, base: 157 }}
      mt="3"
      rounded="lg"
    >
      <Image
        borderTopRadius="lg"
        width={{ md: 300, base: 157 }}
        height={{ md: 143, base: 24 }}
        source={{ uri: item.photoUrl }}
        alt="Alternate Text"
      />
      <HStack
        borderWidth={1}
        _light={{ borderColor: 'coolGray.100' }}
        borderBottomRadius="lg"
      >
        <VStack px="3" py="3" justifyContent="space-between">
          <Text _light={{ color: 'coolGray.900', fontWeight: 'semibold' }}>
            {item.title}
          </Text>
          <Text _light={{ color: 'coolGray.500' }}>
            {item.businessOwner?.title}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default TrendCard;
