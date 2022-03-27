import { Box, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { ImageSourcePropType } from 'react-native';

type Course = {
  courseNo: number;
  imageUri: ImageSourcePropType;
};

type CardProps = {
  item: Course;
};

function TrendCard({ item }: CardProps) {
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
        source={item.imageUri}
        alt="Alternate Text"
      />
      <HStack
        borderWidth={1}
        _light={{ borderColor: 'coolGray.100' }}
        borderBottomRadius="lg"
      >
        <VStack px="3" py="3" justifyContent="space-between">
          <Text _light={{ color: 'coolGray.900', fontWeight: 'semibold' }}>
            Item {item.courseNo}
          </Text>
          <Text _light={{ color: 'coolGray.500' }}>Walmart</Text>
        </VStack>
        <VStack
          px="3"
          py="3"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            _light={{
              color: 'coolGray.700',
              fontWeight: 'semibold',
              fontSize: 'md',
            }}
          >
            1 €
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default TrendCard;
