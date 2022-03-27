import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { HStack, Text, VStack, ScrollView, Pressable, View } from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../constants/RouteNames';
import HomeHeader from './components/HomeHeader';
import Categories from './components/Categories';
import TrendCard from './components/Cards/TrendCard';

type Course = {
  courseNo: number;
  imageUri: ImageSourcePropType;
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

export default function HomeScreen() {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DashboardLayout
        title="Home"
        enableBounceBackground={true}
        mobileHeader={{
          backButton: false,
          displayIcons: true,
        }}
      >
        <HomeHeader />
        <VStack
          px={{ base: 4, md: 6 }}
          pt={{ base: 4, md: 6 }}
          pb={{ base: 24, md: 6 }}
          borderRadius={{ md: '8' }}
          _light={{
            borderColor: 'coolGray.200',
            bg: { base: 'white' },
          }}
          borderWidth={{ md: '1' }}
        >
          <VStack borderRadius="lg" mt={5} _light={{ bg: { md: 'white' } }}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text
                _light={{ color: 'coolGray.800' }}
                fontSize="md"
                fontWeight="semibold"
              >
                Closest to you
              </Text>
              <Pressable onPress={() => navigate(RouteNames.Catalog)}>
                <Text
                  _light={{ color: 'primary.800' }}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  See all
                </Text>
              </Pressable>
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
                    <Pressable
                      key={index}
                      onPress={() => navigate(RouteNames.ProductDetails)}
                    >
                      <TrendCard item={item} key={index} />
                    </Pressable>
                  );
                })}
              </HStack>
            </ScrollView>
            <Categories />

            <HStack justifyContent="space-between" alignItems="center" mt={4}>
              <Text
                _light={{ color: 'coolGray.800' }}
                fontSize="md"
                fontWeight="semibold"
              >
                Pick-up soon
              </Text>
              <Pressable onPress={() => navigate(RouteNames.Catalog)}>
                <Text
                  _light={{ color: 'primary.800' }}
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  See all
                </Text>
              </Pressable>
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
