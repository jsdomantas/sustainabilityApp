import React, { useEffect } from 'react';
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigation } from '@react-navigation/native';
import { useCurrentLocation } from '../../utilities/hooks';
import Categories from './components/Categories';
import TrendCard from './components/Cards/TrendCard';
import { ActivityIndicator } from 'react-native';
import { RouteNames } from '../../constants/RouteNames';
import HomeHeader from './components/HomeHeader';
import { useAllOffersQuery } from './queries';

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const { pos } = useCurrentLocation();

  console.log(pos);
  const allOffersQuery = useAllOffersQuery(pos?.coords);
  console.log(allOffersQuery.data);

  useEffect(() => {
    if (pos) {
      allOffersQuery.refetch();
    }
  }, [pos]);

  return (
    <View style={{ flex: 1 }}>
      <DashboardLayout
        title="Home"
        enableBounceBackground={true}
        mobileHeader={{
          backButton: false,
        }}
      >
        <HomeHeader />
        {allOffersQuery.isLoading ? (
          <ActivityIndicator />
        ) : (
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
                  {allOffersQuery?.data?.length ? (
                    allOffersQuery?.data?.map((item, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() =>
                            navigate(RouteNames.ProductDetails, { id: item.id })
                          }
                        >
                          <TrendCard item={item} key={index} />
                        </Pressable>
                      );
                    })
                  ) : (
                    <Box h={100} mt={2}>
                      <Text color="gray.500" fontSize="xs">
                        Nothing available at the moment. Come back soon.
                      </Text>
                    </Box>
                  )}
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
                  {allOffersQuery?.data?.length ? (
                    allOffersQuery?.data?.map((item, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() =>
                            navigate(RouteNames.ProductDetails, { id: item.id })
                          }
                        >
                          <TrendCard item={item} key={index} />
                        </Pressable>
                      );
                    })
                  ) : (
                    <Box h={100} mt={2}>
                      <Text color="gray.500" fontSize="xs">
                        Nothing available at the moment. Come back soon.
                      </Text>
                    </Box>
                  )}
                </HStack>
              </ScrollView>
            </VStack>
          </VStack>
        )}
      </DashboardLayout>
    </View>
  );
}
