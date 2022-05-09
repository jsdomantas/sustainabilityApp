import React from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import { Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../constants/RouteNames';
import { useCreatedOffersQuery } from './queries';
import { format, parseISO } from 'date-fns';

enum OfferStatus {
  Posted = 'posted',
  Reserved = 'reserved',
  Taken = 'taken',
}

const OfferStatusColor = {
  [OfferStatus.Posted]: 'gray.200',
  [OfferStatus.Reserved]: 'blue.200',
  [OfferStatus.Taken]: 'green.200',
};

const OrdersList = ({ route }) => {
  const createdOffersQuery = useCreatedOffersQuery();

  const filteredData =
    route.key === 'all'
      ? createdOffersQuery.data
      : createdOffersQuery.data.filter(item => item.status === route.key);

  const { navigate } = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <VStack space="2" px={{ base: '4', md: '8' }} py="4">
        {filteredData &&
          filteredData.map((item, index) => {
            return (
              <Pressable
                testID={`order-${index}`}
                key={item.id}
                onPress={() =>
                  navigate(RouteNames.AdminOfferDetails, { id: item.id })
                }
              >
                <VStack space="1">
                  <HStack alignItems="center">
                    {!item.photoUrl ? (
                      <Box
                        h={50}
                        w={50}
                        borderRadius={8}
                        backgroundColor="gray.100"
                      />
                    ) : (
                      <Image
                        source={{ uri: item.photoUrl }}
                        h={50}
                        w={50}
                        borderRadius={8}
                        alt="offer image"
                      />
                    )}
                    <VStack ml={3} flex={1}>
                      <Text>{item.title}</Text>
                      <Text color={'gray.500'}>
                        {format(parseISO(item.createdAt), 'yyyy-MM-dd')}
                      </Text>
                    </VStack>
                    <Box
                      backgroundColor={OfferStatusColor[item.status]}
                      px={2}
                      py={1}
                      borderRadius={4}
                    >
                      <Text textTransform="capitalize">{item.status}</Text>
                    </Box>
                  </HStack>
                  {index !== createdOffersQuery.data.length - 1 && (
                    <Divider backgroundColor="gray.100" />
                  )}
                </VStack>
              </Pressable>
            );
          })}
      </VStack>
    </ScrollView>
  );
};

const renderScene = SceneMap({
  all: OrdersList,
  posted: OrdersList,
  reserved: OrdersList,
  taken: OrdersList,
});

const initialLayout = { width: Dimensions.get('window').width };

const OrdersView = () => {
  const tabRoutes = [
    { key: 'all', title: 'All' },
    { key: 'posted', title: 'Posted' },
    { key: 'reserved', title: 'Reserved' },
    { key: 'taken', title: 'Taken' },
  ];

  const [index, setIndex] = React.useState(0);

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>;
    },
  ) => {
    return (
      <ScrollView
        style={{ flexGrow: 0 }}
        horizontal={true}
        _light={{ bg: 'primary.900' }}
        shadow={3}
        pt="2"
        px="2"
      >
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? 'white' : '#EBEBEB';
          const lightBorderColor = index === i ? 'white' : 'transparent';
          const fontWeight = index === i ? '500' : 'normal';

          return (
            <Box key={i} flex={1} alignItems="center">
              <Button
                borderBottomWidth="3"
                pb="3"
                _light={{ borderColor: lightBorderColor }}
                rounded="0"
                variant="unstyled"
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text style={{ color, fontWeight }}>
                  {route.title}
                </Animated.Text>
              </Button>
            </Box>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <>
      <DashboardLayout
        title="Leftover stock orders"
        mobileHeader={{
          backButton: false,
        }}
      >
        <TabView
          lazy
          navigationState={{ index, routes: tabRoutes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </DashboardLayout>
    </>
  );
};

export default OrdersView;
