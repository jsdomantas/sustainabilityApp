import { Box, HStack, Icon, Image, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../../constants/RouteNames';

function TrendCard({ item }) {
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => navigate(RouteNames.ProductDetails, { id: item.id })}
      _light={{ bg: 'white' }}
      _dark={{ bg: 'coolGray.700' }}
      width={{ md: 300, base: 157 }}
      mt="3"
      rounded="lg"
    >
      {!item.photoUrl ? (
        <Box
          bg="coolGray.200"
          h={24}
          width={157}
          borderTopRadius="lg"
          alignItems="center"
          justifyContent="center"
        >
          <Icon size="10" as={MaterialIcons} name="photo" color="gray.500" />
        </Box>
      ) : (
        <Image
          borderTopRadius="lg"
          width={{ md: 300, base: 157 }}
          height={{ md: 143, base: 24 }}
          source={{ uri: item.photoUrl }}
          alt="Alternate Text"
        />
      )}
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
    </Pressable>
  );
}

export default TrendCard;
