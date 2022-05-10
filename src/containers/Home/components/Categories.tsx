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
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../constants/RouteNames';

type Icon = {
  name: string;
  text: string;
};

const iconList: Icon[] = [
  {
    name: 'carrot',
    text: 'Vegetables',
  },
  {
    name: 'food-croissant',
    text: 'Baked goods',
  },
  {
    name: 'food-apple',
    text: 'Fruits',
  },
  {
    name: 'food-steak',
    text: 'Meat',
  },
  {
    name: 'dots-horizontal',
    text: 'Other',
  },
];

const Categories = () => {
  const { navigate } = useNavigation();
  return (
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
                  p="2"
                  rounded="full"
                  w="12"
                  h="12"
                >
                  <IconButton
                    onPress={() =>
                      navigate(RouteNames.Catalog, {
                        title: item.text,
                        category: item.text,
                      })
                    }
                    variant="unstyled"
                    icon={
                      <Icon
                        as={MaterialCommunityIcons}
                        name={item.name}
                        _light={{ color: 'primary.900' }}
                        size="5"
                      />
                    }
                  />
                </Center>
                <Text
                  fontSize="10"
                  _light={{ color: 'coolGray.500' }}
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
};

export default Categories;
