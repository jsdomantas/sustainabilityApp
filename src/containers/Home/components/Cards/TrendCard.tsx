import { Box, HStack, Image, Text } from 'native-base';
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
        px="3"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        borderWidth="1"
        borderTopRadius="none"
        borderRadius="lg"
        _light={{ borderColor: 'coolGray.100' }}
        _dark={{ borderColor: 'coolGray.800' }}
      >
        <Text
          _light={{ color: 'coolGray.900' }}
          _dark={{ color: 'coolGray.50' }}
        >
          Courses {item.courseNo}
        </Text>
      </HStack>
    </Box>
  );
}

export default TrendCard;
