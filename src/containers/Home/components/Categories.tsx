import {
  Center,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

type Icon = {
  name: string;
  text: string;
};

const iconList: Icon[] = [
  {
    name: 'plus',
    text: 'Groceries',
  },
  {
    name: 'lightbulb-outline',
    text: 'Baked goods',
  },
  {
    name: 'beaker',
    text: 'Restaurants',
  },
  {
    name: 'virus-outline',
    text: 'Sweets',
  },
];

const Categories = () => (
  <VStack
    mt="4"
    pb={{ md: 3 }}
    borderTopWidth={{ md: 1 }}
    borderBottomWidth={{ md: 1 }}
    _light={{
      borderColor: 'coolGray.200',
    }}
  >
    <HStack justifyContent="space-between" alignItems="center">
      <Text
        _dark={{ color: 'coolGray.50' }}
        _light={{ color: 'coolGray.800' }}
        fontSize="md"
        fontWeight="semibold"
      >
        Categories
      </Text>
    </HStack>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      mx="-6"
    >
      <HStack
        mx="6"
        space="7"
        justifyContent="space-between"
        mt="3"
        alignItems="center"
      >
        {iconList.map((item, index) => {
          return (
            <VStack space="2" key={index} alignItems="center">
              <Center
                _light={{ bg: 'primary.100' }}
                _dark={{ bg: 'coolGray.700' }}
                p="2"
                rounded="full"
                w="12"
                h="12"
              >
                <IconButton
                  variant="unstyled"
                  icon={
                    <Icon
                      as={MaterialCommunityIcons}
                      name={item.name}
                      _light={{ color: 'primary.900' }}
                      _dark={{ color: 'coolGray.50' }}
                      size="5"
                    />
                  }
                />
              </Center>
              <Text
                fontSize="10"
                _light={{ color: 'coolGray.500' }}
                _dark={{ color: 'coolGray.50' }}
                textAlign="center"
              >
                {item.text}
              </Text>
            </VStack>
          );
        })}
      </HStack>
    </ScrollView>
  </VStack>
);

export default Categories;
