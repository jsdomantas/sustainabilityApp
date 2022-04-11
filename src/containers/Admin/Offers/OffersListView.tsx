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

const OrdersList = ({ route }) => {
  const data = [1, 2, 3];
  const { navigate } = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <VStack
        space="2"
        px={{ base: '4', md: '8' }}
        py="4"
        _dark={{ bg: { base: 'coolGray.800', md: 'coolGray.900' } }}
      >
        {data &&
          data.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => navigate(RouteNames.AdminOfferDetails)}
              >
                <VStack space="1">
                  <HStack alignItems="center">
                    {true ? (
                      <Box
                        h={50}
                        w={50}
                        borderRadius={8}
                        backgroundColor="gray.100"
                      />
                    ) : (
                      <Image source={{ uri: '' }} h={50} w={50} />
                    )}
                    <VStack ml={3} flex={1}>
                      <Text>test</Text>
                      <Text color={'gray.500'}>2020-03-21</Text>
                    </VStack>
                    <Box
                      backgroundColor="blue.100"
                      px={2}
                      py={1}
                      borderRadius={4}
                    >
                      <Text>Posted</Text>
                    </Box>
                  </HStack>
                  {index !== data.length - 1 && (
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
  fridge: OrdersList,
  freezer: OrdersList,
  dry_pantry: OrdersList,
});

const initialLayout = { width: Dimensions.get('window').width };

const OrdersView = () => {
  const tabRoutes = [
    { key: 'all', title: 'All' },
    { key: 'fridge', title: 'Posted' },
    { key: 'freezer', title: 'Reserved' },
    { key: 'dry_pantry', title: 'Taken' },
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
        _dark={{ bg: 'coolGray.600' }}
        shadow={3}
        pt="2"
        px="2"
      >
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? 'white' : '#EBEBEB';
          const lightBorderColor = index === i ? 'white' : 'transparent';
          const darkBorderColor = index === i ? 'primary.700' : 'transparent';
          const fontWeight = index === i ? '500' : 'normal';

          return (
            <Box key={i} flex={1} alignItems="center">
              <Button
                borderBottomWidth="3"
                pb="3"
                _light={{ borderColor: lightBorderColor }}
                _dark={{ borderColor: darkBorderColor }}
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