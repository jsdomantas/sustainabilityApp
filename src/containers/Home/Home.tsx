import React from 'react';
import { ImageSourcePropType } from 'react-native';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Avatar,
  Image,
  ScrollView,
  Pressable,
  Center,
  IconButton,
  Input,
  View,
} from 'native-base';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import IconGirl from '../../IconGirl';
import DashboardLayout from '../../layouts/DashboardLayout';

type Icon = {
  name: string;
  text: string;
};

type Course = {
  courseNo: number;
  imageUri: ImageSourcePropType;
};

type CardProps = {
  item: Course;
};

const trending: Course[] = [
  {
    courseNo: 1,
    imageUri: require('../../assets/houseplant.jpg'),
  },
  {
    courseNo: 2,
    imageUri: require('../../assets/living.jpg'),
  },
  {
    courseNo: 3,
    imageUri: require('../../assets/women.jpg'),
  },
  {
    courseNo: 4,
    imageUri: require('../../assets/young-girl.jpg'),
  },
  {
    courseNo: 5,
    imageUri: require('../../assets/chair.jpeg'),
  },
  {
    courseNo: 6,
    imageUri: require('../../assets/lamp.jpeg'),
  },
];
const iconList: Icon[] = [
  {
    name: 'plus',
    text: 'Maths',
  },
  {
    name: 'lightbulb-outline',
    text: 'Physics',
  },
  {
    name: 'beaker',
    text: 'Chemistry',
  },
  {
    name: 'virus-outline',
    text: 'Biology',
  },
];

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
        _dark={{ borderColor: 'coolGray.700', bg: 'coolGray.700' }}
        px="3"
        pt="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <VStack>
          <Text
            fontSize="xs"
            _light={{ color: 'coolGray.900' }}
            _dark={{ color: 'coolGray.100' }}
            fontWeight="medium"
          >
            Chapter 1
          </Text>
          <Text
            fontSize="sm"
            fontWeight="bold"
            _light={{ color: 'coolGray.900' }}
            _dark={{ color: 'coolGray.100' }}
          >
            Theory of relativity
          </Text>
          <HStack space="5" mt={1}>
            <Text
              fontSize="xs"
              textAlign="center"
              _light={{ color: 'coolGray.800' }}
              _dark={{ color: 'coolGray.300' }}
            >
              Active Users
            </Text>
            <Avatar.Group size="xs" mb={5}>
              <Avatar source={require('../../assets/women.jpg')} />
              <Avatar source={require('../../assets/nice-girl.jpg')} />
              <Avatar source={require('../../assets/smiling.jpg')} />
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

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <DashboardLayout
        title="Home"
        displayMenuButton
        displayScreenTitle={false}
        mobileHeader={{
          backButton: false,
          displayIcons: true,
        }}
        displayAlternateMobileHeader
      >
        <VStack
          _light={{ bg: 'primary.900' }}
          _dark={{ bg: { md: 'coolGray.800', base: 'coolGray.900' } }}
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
                Welcome John
              </Text>
              <Text
                width="56"
                fontSize="xs"
                color="coolGray.50"
                fontWeight="normal"
                letterSpacing="0.2"
              >
                Find the the best deal and reduce food waste
              </Text>
            </VStack>
            <IconGirl size={{ base: 114, md: 140 }} />
          </HStack>
          <Input
            mb={-10}
            size="2xl"
            placeholder="Search"
            _light={{
              bg: 'white',
              borderColor: 'coolGray.300',
            }}
            _dark={{
              bg: 'coolGray.700',
              borderColor: 'coolGray.700',
            }}
            _hover={{
              _light: {
                bg: 'coolGray.50',
              },
              _dark: {
                bg: 'coolGray.700',
              },
            }}
            InputLeftElement={
              <Icon
                as={MaterialCommunityIcons}
                name="magnify"
                _light={{ color: 'coolGray.400' }}
                _dark={{ color: 'coolGray.400' }}
                size="6"
                ml="2"
              />
            }
          />
        </VStack>
        <VStack
          px={{ base: 4, md: 6 }}
          pt={{ base: 4, md: 6 }}
          pb={{ base: 24, md: 6 }}
          borderRadius={{ md: '8' }}
          _light={{
            borderColor: 'coolGray.200',
            bg: { base: 'white' },
          }}
          _dark={{
            borderColor: 'coolGray.800',
            bg: 'coolGray.800',
          }}
          borderWidth={{ md: '1' }}
        >
          <VStack
            borderRadius="lg"
            mt={5}
            _light={{ bg: { md: 'white' } }}
            _dark={{ bg: 'coolGray.800' }}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Text
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}
                fontSize="md"
                fontWeight="semibold"
              >
                Closest to you
              </Text>
              <Text
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'primary.800' }}
                fontSize="sm"
                fontWeight="semibold"
              >
                See all
              </Text>
            </HStack>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              mx="-6"
            >
              <HStack
                justifyContent="space-between"
                alignItems="center"
                space="2"
                mx="6"
              >
                {trending.map((item, index) => {
                  return (
                    <Pressable key={index}>
                      <Card item={item} key={index} />
                    </Pressable>
                  );
                })}
              </HStack>
            </ScrollView>
            <VStack
              mt="4"
              pb={{ md: 3 }}
              borderTopWidth={{ md: 1 }}
              borderBottomWidth={{ md: 1 }}
              _light={{
                borderColor: 'coolGray.200',
              }}
              _dark={{
                borderColor: 'coolGray.700',
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
                <Text
                  _dark={{ color: 'coolGray.50' }}
                  _light={{ color: 'primary.800' }}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  See all
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
                      <VStack space="2" w={60} key={index} alignItems="center">
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
                  <VStack space="2" w={60} alignItems="center">
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
                            as={Feather}
                            name={'more-vertical'}
                            _light={{ color: 'coolGray.800' }}
                            _dark={{ color: 'coolGray.50' }}
                            size="sm"
                          />
                        }
                      />
                    </Center>
                    <Text
                      fontSize="12"
                      _light={{ color: 'coolGray.500' }}
                      _dark={{ color: 'coolGray.50' }}
                    >
                      More
                    </Text>
                  </VStack>
                </HStack>
              </ScrollView>
            </VStack>

            <HStack justifyContent="space-between" alignItems="center" mt={4}>
              <Text
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'coolGray.800' }}
                fontSize="md"
                fontWeight="semibold"
              >
                Pick-up soon
              </Text>
              <Text
                _dark={{ color: 'coolGray.50' }}
                _light={{ color: 'primary.800' }}
                fontSize="sm"
                fontWeight="semibold"
              >
                See all
              </Text>
            </HStack>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              mx="-6"
            >
              <HStack
                justifyContent="space-between"
                alignItems="center"
                mt="1"
                space="2"
                mx="6"
              >
                {trending.map((item, index) => {
                  return (
                    <Pressable key={index}>
                      <TrendCard item={item} />
                    </Pressable>
                  );
                })}
              </HStack>
            </ScrollView>
          </VStack>
        </VStack>
      </DashboardLayout>
    </View>
  );
}
