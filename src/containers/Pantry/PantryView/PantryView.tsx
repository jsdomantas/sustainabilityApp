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
  Divider,
  Menu,
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { SceneMap, TabView } from 'react-native-tab-view';
import type {
  SceneRendererProps,
  NavigationState,
  Route,
} from 'react-native-tab-view';

import { Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../constants/RouteNames';
import {
  useDeletePantryItemMutation,
  useGetPantryItemsQuery,
} from '../queries/queries';
import differenceInDays from 'date-fns/differenceInDays';
import FloatingActionButton from '../../../components/FloatingActionButton';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { startOfDay } from 'date-fns';

const initialLayout = { width: Dimensions.get('window').width };

type PantryItem = {
  id: number;
  title: string;
  quantity: number;
  photo_url: string;
  expirationDate: string;
  pantry_category_id: number;
  measurementUnits: string;
  ingredient: {
    id: number;
    title: string;
  };
};

const tabRoutes = [
  { key: 'all', title: 'All items' },
  { key: 'fridge', title: 'Fridge' },
  { key: 'freezer', title: 'Freezer' },
  { key: 'dry_pantry', title: 'Dry pantry' },
];

function PantryItemCard({
  item,
  onPressDelete,
}: {
  item: PantryItem;
  onPressDelete: () => void;
}) {
  const renderExpirationLabel = () => {
    const diff = differenceInDays(
      startOfDay(new Date(item.expirationDate)),
      startOfDay(new Date()),
    );

    if (diff === 0) {
      return <Text color="yellow.500">Expires today</Text>;
    } else if (diff === 1) {
      return (
        <VStack alignItems="flex-end">
          <Text color="yellow.500">Expires</Text>
          <Text color="yellow.500">tomorrow</Text>
        </VStack>
      );
    } else if (diff > 0) {
      return (
        <VStack alignItems="flex-end">
          <Text color="coolGray.500">Expires in</Text>
          <Text color="coolGray.500">{diff} days</Text>
        </VStack>
      );
    } else {
      return <Text color="red.500">Expired</Text>;
    }
  };

  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={{ base: 3, md: 6 }}>
        {!item.photo_url ? (
          <Box
            bg="coolGray.200"
            alignItems="center"
            justifyContent="center"
            boxSize={12}
            rounded="md"
          >
            <Icon size="4" as={MaterialIcons} name="photo" color="gray.500" />
          </Box>
        ) : (
          <Image
            source={{ uri: item.photo_url }}
            alt="Product image"
            boxSize="12"
            rounded="md"
          />
        )}
        <VStack>
          <Text fontSize="md" bold>
            {item.ingredient.title}
          </Text>
          <Text _light={{ color: 'coolGray.500' }}>
            {item.quantity} {item.measurementUnits}
          </Text>
        </VStack>
      </HStack>
      <HStack alignItems="center">
        {renderExpirationLabel()}
        <Menu
          w="150"
          defaultIsOpen={false}
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
        >
          <Menu.Item onPress={onPressDelete}>Delete</Menu.Item>
        </Menu>
      </HStack>
    </HStack>
  );
}

const PantryItemsList = ({ route }) => {
  const pantryItemsQuery = useGetPantryItemsQuery();
  const deleteItemMutation = useDeletePantryItemMutation();

  if (pantryItemsQuery.isLoading) {
    return null;
  }

  let data: Array<PantryItem> = [];

  if (route.key === 'all') {
    data = pantryItemsQuery.data;
  } else {
    data = pantryItemsQuery.data?.filter(
      item => item.pantryCategory === route.key,
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <VStack space="2" px={{ base: '4', md: '8' }} py="4">
        {data &&
          data.map((item, index) => {
            return (
              <VStack space="1" key={index}>
                <PantryItemCard
                  item={item}
                  onPressDelete={() => deleteItemMutation.mutate(item.id)}
                />
                {index !== data.length - 1 && <Divider />}
              </VStack>
            );
          })}
      </VStack>
    </ScrollView>
  );
};

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
      <DashboardLayout title="Pantry" mobileHeader={{ backButton: false }}>
        <TabView
          lazy
          navigationState={{ index, routes: tabRoutes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </DashboardLayout>
      <FloatingActionButton
        onPress={() => navigate(RouteNames.PantryItemBottomsSheet)}
      />
    </>
  );
};

export default PantryView;
