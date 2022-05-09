import {
  Avatar,
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { ImageSourcePropType } from 'react-native';

type Course = {
  courseNo: number;
  imageUri: ImageSourcePropType;
};

type CardProps = {
  item: Course;
};

function Card(props: CardProps) {
  return (
    <Box width={{ md: 226, base: 320 }} mt="3">
      <Image
        borderTopRadius="lg"
        width={{ md: 226, base: 320 }}
        height="24"
        source={props.item.imageUri}
        alt="Alternate Text"
      />
      <HStack
        borderWidth="1"
        borderTopRadius="none"
        borderRadius="lg"
        _light={{ borderColor: 'coolGray.100', bg: 'white' }}
        px="3"
        pt="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <VStack>
          <Text
            fontSize="xs"
            _light={{ color: 'coolGray.900' }}
            fontWeight="medium"
          >
            Chapter 1
          </Text>
          <Text
            fontSize="sm"
            fontWeight="bold"
            _light={{ color: 'coolGray.900' }}
          >
            Theory of relativity
          </Text>
          <HStack space="5" mt={1}>
            <Text
              fontSize="xs"
              textAlign="center"
              _light={{ color: 'coolGray.800' }}
            >
              Active Users
            </Text>
            <Avatar.Group size="xs" mb={5}>
              <Avatar source={require('../../../../assets/women.jpg')} />
              <Avatar source={require('../../../../assets/nice-girl.jpg')} />
              <Avatar source={require('../../../../assets/smiling.jpg')} />
            </Avatar.Group>
          </HStack>
        </VStack>
        <Center bg="red.400" p="1" rounded="full" mb="8">
          <IconButton
            variant="unstyled"
            icon={
              <Icon
                as={Entypo}
                name="controller-play"
                color="coolGray.50"
                size="xs"
              />
            }
          />
        </Center>
      </HStack>
    </Box>
  );
}

export default Card;
