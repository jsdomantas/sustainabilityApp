import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Button,
  Image,
  ScrollView,
  IconButton,
  SearchIcon,
  Pressable,
  Divider,
  Menu,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SceneMap, TabView } from 'react-native-tab-view';
import type {
  SceneRendererProps,
  NavigationState,
  Route,
} from 'react-native-tab-view';

import { Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../constants/RouteNames';
import { useGetPantryItemsQuery } from '../queries/queries';
import differenceInDays from 'date-fns/differenceInDays';
import { parseISO, startOfDay } from 'date-fns';
const initialLayout = { width: Dimensions.get('window').width };

const PantryCategory = {
  fridge: 1,
  freezer: 2,
  dry_pantry: 3,
};

type PantryItem = {
  title: string;
  quantity: number;
  photo_url: string;
  expiration_date: string;
  pantry_category_id: number;
};

const tabRoutes = [
  { key: 'all', title: 'All items' },
  { key: 'fridge', title: 'Fridge' },
  { key: 'freezer', title: 'Freezer' },
  { key: 'dry_pantry', title: 'Dry pantry' },
];

function MobileHeader() {
  return (
    <>
      <Box px="4" pt="9" pb="10">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold">
            Pantry
          </Text>
          <IconButton icon={<SearchIcon size="5" />} />
        </HStack>
      </Box>
    </>
  );
}

function PantryItemCard({ item }: { item: PantryItem }) {
  const renderExpirationLabel = () => {
    const diff =
      differenceInDays(startOfDay(parseISO(item.expiration_date)), new Date()) +
      1;

    if (diff > 0) {
      return (
        <VStack alignItems="flex-end">
          <Text color="coolGray.500">Expires on</Text>
          <Text color="coolGray.500">{item.expiration_date}</Text>
        </VStack>
      );
    } else {
      return <Text color="coolGray.500">Expired</Text>;
    }
  };

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={{ base: 3, md: 6 }}>
        <Image
          source={{ uri: item.photo_url }}
          alt="Song cover"
          boxSize="16"
          rounded="md"
        />
        <VStack>
          <Text fontSize="md" bold>
            {item.title}
          </Text>
          <Text
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.400' }}
          >
            {item.quantity} g
          </Text>
        </VStack>
      </HStack>
      <HStack alignItems="center">
        {renderExpirationLabel()}
        <Menu
          w="150"
          trigger={triggerProps => {
            return (
              <IconButton
                accessibilityLabel="More options menu"
                {...triggerProps}
                icon={
                  <Icon
                    size="6"
                    color="coolGray.500"
                    name={'dots-vertical'}
                    as={MaterialCommunityIcons}
                  />
                }
              />
            );
          }}
          placement="bottom right"
          //@ts-ignore
          _dark={{ bg: 'coolGray.800', borderColor: 'coolGray.700' }}
        >
          <Menu.Item>Edit</Menu.Item>
          <Menu.Item>Delete</Menu.Item>
          <Menu.Item>Mark as expired</Menu.Item>
        </Menu>
      </HStack>
    </HStack>
  );
}

const PantryItemsList = ({ route }) => {
  const pantryItemsQuery = useGetPantryItemsQuery();

  if (pantryItemsQuery.isLoading) {
    return null;
  }

  console.log(route.key);

  let data: any[] | null | undefined = [];

  if (route.key === 'all') {
    data = pantryItemsQuery.data?.data;
  } else {
    data = pantryItemsQuery.data?.data?.filter(
      (item: PantryItem) =>
        item.pantry_category_id === PantryCategory[route.key],
    );
  }

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
              <VStack space="1" key={index}>
                <PantryItemCard item={item} />
                {index !== data.length - 1 && <Divider />}
              </VStack>
            );
          })}
      </VStack>
    </ScrollView>
  );
};

const FloatingActionButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable
    backgroundColor="primary.800"
    onPress={onPress}
    style={{
      position: 'absolute',
      bottom: 20,
      right: 35,
      height: 60,
      width: 60,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 6,
    }}
  >
    <MaterialCommunityIcons name="plus" size={36} color="#fff" />
  </Pressable>
);

const renderScene = SceneMap({
  all: PantryItemsList,
  fridge: PantryItemsList,
  freezer: PantryItemsList,
  dry_pantry: PantryItemsList,
});
const PantryView = () => {
  const { navigate } = useNavigation();

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
      <VStack
        flex={1}
        _light={{ bg: 'primary.50' }}
        _dark={{ bg: { base: 'coolGray.900', md: 'coolGray.900' } }}
      >
        <Box
          flex={1}
          _dark={{
            bg: 'coolGray.700',
            borderTopColor: 'coolGray.700',
          }}
        >
          <VStack flex={1}>
            <>
              <Box
                _light={{ bg: 'white' }}
                _dark={{ bg: 'coolGray.700' }}
                flex="1"
              >
                <MobileHeader />
                <TabView
                  lazy
                  navigationState={{ index, routes: tabRoutes }}
                  renderScene={renderScene}
                  renderTabBar={renderTabBar}
                  onIndexChange={setIndex}
                  initialLayout={initialLayout}
                />
              </Box>
            </>
          </VStack>
        </Box>
      </VStack>
      <FloatingActionButton
        onPress={() => navigate(RouteNames.PantryItemBottomsSheet)}
      />
    </>
  );
};

export default PantryView;
