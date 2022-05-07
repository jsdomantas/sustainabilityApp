import React, { useEffect, useState } from 'react';
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
import { useCurrentLocation, useDebounce } from '../../utilities/hooks';
import Categories from './components/Categories';
import TrendCard from './components/Cards/TrendCard';
import { ActivityIndicator } from 'react-native';
import { RouteNames } from '../../constants/RouteNames';
import HomeHeader from './components/HomeHeader';
import {
  useAllOffersQuery,
  useDeviceTokenMutation,
  useSearchOffersQuery,
} from './queries';
import messaging from '@react-native-firebase/messaging';

export default function HomeScreen() {
  const { navigate } = useNavigation();
  const { pos } = useCurrentLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 600);

  const { data: searchResults } = useSearchOffersQuery(debouncedSearchQuery);

  const allOffersQuery = useAllOffersQuery(pos?.coords);
  const deviceTokenMutation = useDeviceTokenMutation();

  const getFirebaseToken = async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    return await messaging().getToken();
  };

  useEffect(() => {
    console.log(pos);
    if (pos) {
      allOffersQuery.refetch();
    }
  }, [pos]);

  useEffect(() => {
    const getDeviceToken = async () => {
      const token = await getFirebaseToken();

      deviceTokenMutation.mutate(token);
    };
    getDeviceToken().then();
  }, []);

  const onMessageReceived = async message => {
    if (!message) {
      return;
    }
    console.log(message.data.type);
  };

  useEffect(() => {
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DashboardLayout
        title="Home"
        enableBounceBackground={true}
        mobileHeader={{
          backButton: false,
        }}
      >
        <HomeHeader onChangeText={setSearchQuery} />
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
            {!searchResults?.length ? (
              <VStack borderRadius="lg" mt={5} _light={{ bg: { md: 'white' } }}>
                <HStack justifyContent="space-between" alignItems="center">
                  <Text
                    _light={{ color: 'coolGray.800' }}
                    fontSize="md"
                    fontWeight="semibold"
                  >
                    Closest to you
                  </Text>
                  <Pressable
                    onPress={() =>
                      navigate(RouteNames.Catalog, { title: 'Closest to you' })
                    }
                  >
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
                        return <TrendCard item={item} key={index} />;
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

                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  mt={4}
                >
                  <Text
                    _light={{ color: 'coolGray.800' }}
                    fontSize="md"
                    fontWeight="semibold"
                  >
                    Pick-up soon
                  </Text>
                  <Pressable
                    onPress={() =>
                      navigate(RouteNames.Catalog, { title: 'Pick-up soon' })
                    }
                  >
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
                        return <TrendCard item={item} key={index} />;
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

                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  mt={4}
                >
                  <Text
                    _light={{ color: 'coolGray.800' }}
                    fontSize="md"
                    fontWeight="semibold"
                  >
                    Most recent offers
                  </Text>
                  <Pressable
                    onPress={() =>
                      navigate(RouteNames.Catalog, {
                        title: 'Most recent offers',
                      })
                    }
                  >
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
                        return <TrendCard item={item} key={index} />;
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
            ) : (
              <VStack mt={5}>
                <Text
                  _light={{ color: 'coolGray.800' }}
                  fontSize="md"
                  fontWeight="semibold"
                >
                  Search results
                </Text>
                <HStack flexWrap="wrap" space={2}>
                  {searchResults?.map((item, index) => {
                    return <TrendCard item={item} key={index} />;
                  })}
                </HStack>
              </VStack>
            )}
          </VStack>
        )}
      </DashboardLayout>
    </View>
  );
}
