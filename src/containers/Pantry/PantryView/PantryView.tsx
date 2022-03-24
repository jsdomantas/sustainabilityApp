// import React, { useState } from 'react';
// import ItemsList from './ItemsList';
// import { ActivityIndicator } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {
//   Colors,
//   TabController,
//   TouchableOpacity,
//   View,
// } from 'react-native-ui-lib';
// import { useGetPantryItemsQuery } from '../queries/queries';
// import { RouteNames } from '../../../constants/RouteNames';
// import Header from '../../../components/Header';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//
// const PantryView = () => {
//   const navigation = useNavigation();
//
//   const [index, setIndex] = useState(0);
//
//   const pantryItemsQuery = useGetPantryItemsQuery();
//
//   return (
//     <View style={{ flex: 1, position: 'relative' }}>
//       <Header label="Pantry" />
//       <TabController
//         items={[
//           {
//             label: 'All items',
//             badge: {
//               label: String(pantryItemsQuery.data?.body?.length) || '0',
//             },
//           },
//           {
//             label: 'Fridge',
//           },
//           { label: 'Freezer' },
//           { label: 'Dry pantry' },
//         ]}
//         initialIndex={index}
//         onChangeIndex={setIndex}
//       >
//         <TabController.TabBar
//           enableShadow
//           containerStyle={{
//             backgroundColor: 'white',
//           }}
//         />
//         <View style={{ height: '100%' }}>
//           {pantryItemsQuery.isLoading || pantryItemsQuery.isFetching ? (
//             <View
//               style={{
//                 flex: 1,
//                 marginTop: -150,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <ActivityIndicator />
//             </View>
//           ) : (
//             <>
//               <TabController.TabPage index={0} key="All">
//                 <View flex>
//                   <ItemsList data={pantryItemsQuery.data?.body} />
//                 </View>
//               </TabController.TabPage>
//               <TabController.TabPage index={1} key="Fridge">
//                 <View flex>
//                   <ItemsList
//                     data={pantryItemsQuery.data?.body?.filter(
//                       item => item.pantry_category_id === 1,
//                     )}
//                   />
//                 </View>
//               </TabController.TabPage>
//               <TabController.TabPage index={2} key="Freezer">
//                 <View flex>
//                   <ItemsList
//                     data={pantryItemsQuery.data?.body?.filter(
//                       item => item.pantry_category_id === 2,
//                     )}
//                   />
//                 </View>
//               </TabController.TabPage>
//               <TabController.TabPage index={3} key="Dry pantry">
//                 <View flex>
//                   <ItemsList
//                     data={pantryItemsQuery.data?.body?.filter(
//                       item => item.pantry_category_id === 3,
//                     )}
//                   />
//                 </View>
//               </TabController.TabPage>
//             </>
//           )}
//         </View>
//       </TabController>
//       <TouchableOpacity
//         // @ts-ignore
//         onPress={() => navigation.navigate(RouteNames.PantryItemBottomsSheet)}
//         style={{
//           backgroundColor: Colors.primary,
//           position: 'absolute',
//           bottom: 20,
//           right: 35,
//           height: 60,
//           width: 60,
//           borderRadius: 100,
//           alignItems: 'center',
//           justifyContent: 'center',
//           shadowColor: '#000',
//           shadowOffset: {
//             width: 0,
//             height: 2,
//           },
//           shadowOpacity: 0.2,
//           shadowRadius: 5,
//           elevation: 6,
//         }}
//       >
//         <MaterialCommunityIcons name="plus" size={38} color="#fff" />
//       </TouchableOpacity>
//     </View>
//   );
// };

import React from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  VStack,
  Button,
  Image,
  Divider,
  ScrollView,
  IconButton,
  SearchIcon,
  Tooltip,
  Pressable,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageSourcePropType } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import type {
  SceneRendererProps,
  NavigationState,
  Route,
} from 'react-native-tab-view';

import { Dimensions, Animated } from 'react-native';
const initialLayout = { width: Dimensions.get('window').width };

// import TabView from './components/TabView';

type Song = {
  songName: string;
  artist: string;
  imageUri: ImageSourcePropType;
  duration: string;
};
type SongProps = {
  song: Song;
};
const songs: Song[] = [
  {
    songName: 'Counting stars',
    artist: 'One republic',
    imageUri: require('./components/song1.png'),
    duration: '4:30',
  },

  {
    songName: 'Work',
    artist: 'One republic',
    imageUri: require('./components/song3.png'),
    duration: '3:48',
  },
  {
    songName: 'Faded',
    artist: 'Alan Walker',
    imageUri: require('./components/song4.png'),
    duration: '2:50',
  },
  {
    songName: 'Secrets',
    artist: 'One republic',
    imageUri: require('./components/song5.png'),
    duration: '3:36',
  },
  {
    songName: 'Stars',
    artist: 'Duncan Laurence',
    imageUri: require('./components/song6.png'),
    duration: '4:10',
  },
  {
    songName: 'Perfect',
    artist: 'Ed Sheeran',
    imageUri: require('./components/song7.png'),
    duration: '3:20',
  },
  {
    songName: 'Rescue Me',
    artist: 'One republic',
    imageUri: require('./components/song8.jpeg'),
    duration: '3:30',
  },
  {
    songName: 'Someone you loved',
    artist: 'Lewis Capaldi',
    imageUri: require('./components/song2.png'),
    duration: '2:30',
  },
  {
    songName: 'Apologize',
    artist: 'One republic',
    imageUri: require('./components/song2.png'),
    duration: '3:27',
  },
  {
    songName: 'Drivers license',
    artist: 'Olivia Rodrigo',
    imageUri: require('./components/song3.png'),
    duration: '5:30',
  },
];

const tabRoutes = [
  { key: 'first', title: 'All items' },
  { key: 'second', title: 'Fridge' },
  { key: 'third', title: 'Freezer' },
  { key: 'fourth', title: 'Dry pantry' },
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

function SongCard({ song }: SongProps) {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack alignItems="center" space={{ base: 3, md: 6 }}>
        <Image
          source={song.imageUri}
          alt="Song cover"
          boxSize="16"
          rounded="md"
        />
        <VStack>
          <Text fontSize="md" bold>
            {song.songName}
          </Text>
          <Text
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.400' }}
          >
            {song.artist}
          </Text>
        </VStack>
      </HStack>
      <HStack alignItems="center">
        <Text color="coolGray.500">{song.duration}</Text>
        <Tooltip label="More Options" openDelay={500}>
          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="dots-vertical"
                size="5"
                color="coolGray.500"
              />
            }
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
}

const SongsList = () => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <VStack
        space="2"
        px={{ base: '4', md: '8' }}
        py="4"
        _dark={{ bg: { base: 'coolGray.800', md: 'coolGray.900' } }}
      >
        {songs.map((song, index) => {
          return (
            <VStack space="1" key={index}>
              <SongCard song={song} />
              {index !== songs.length - 1 && <Divider />}
            </VStack>
          );
        })}
      </VStack>
    </ScrollView>
  );
};

const FloatingActionButton = () => (
  <Pressable
    backgroundColor="primary.800"
    // @ts-ignore
    onPress={() => {}}
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
  first: SongsList,
  second: SongsList,
  third: SongsList,
  fourth: SongsList,
});
const PantryView = () => {
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
      <FloatingActionButton />
    </>
  );
};

export default PantryView;
