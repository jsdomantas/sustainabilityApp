import { HStack, Icon, Input, Text, VStack } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import IconGirl from '../../../IconGirl';

const HomeHeader = ({ onChangeText }) => (
  <VStack
    _light={{ bg: 'primary.900' }}
    zIndex={1}
    borderRadius={{ md: '8' }}
    px={{ base: 4, md: 6 }}
    py={{ base: 4, md: 6 }}
  >
    <HStack alignItems="center" justifyContent="space-between">
      <VStack space="2">
        <Text
          fontSize="xl"
          color="coolGray.50"
          fontWeight="semibold"
          letterSpacing="0.2"
        >
          Welcome
        </Text>
        <Text
          width="56"
          fontSize="xs"
          color="coolGray.50"
          fontWeight="normal"
          letterSpacing="0.2"
        >
          Find the the best deals and reduce food waste
        </Text>
      </VStack>
      <IconGirl size={{ base: 114, md: 140 }} />
    </HStack>
    <Input
      mb={-10}
      size="2xl"
      onChangeText={onChangeText}
      placeholder="Search"
      _light={{
        bg: 'white',
        borderColor: 'coolGray.300',
      }}
      _hover={{
        _light: {
          bg: 'coolGray.50',
        },
      }}
      InputLeftElement={
        <Icon
          as={MaterialCommunityIcons}
          name="magnify"
          _light={{ color: 'coolGray.400' }}
          size="6"
          ml="2"
        />
      }
    />
  </VStack>
);

export default HomeHeader;
