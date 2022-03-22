import { Colors, Text, View } from 'react-native-ui-lib';
import React from 'react';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SquircleView } from 'react-native-figma-squircle';

const CategoryCard = () => (
  <View style={{ alignItems: 'center', marginRight: 12 }}>
    <SquircleView
      style={{
        height: 100,
        width: 100,
        marginBottom: 8,
      }}
      squircleParams={{
        cornerRadius: 25,
        cornerSmoothing: 0.7,
        fillColor: Colors.orange10,
      }}
    />
    <Text>Bakery</Text>
  </View>
);

const ItemCard = () => (
  <SquircleView
    style={{
      flexDirection: 'row',
      marginRight: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,

      elevation: 5,
    }}
    squircleParams={{
      cornerRadius: 25,
      cornerSmoothing: 0.7,
      fillColor: 'white',
    }}
  >
    <SquircleView
      style={{
        height: 130,
        width: 130,
      }}
      squircleParams={{
        cornerRadius: 25,
        cornerSmoothing: 0.7,
        fillColor: Colors.red10,
      }}
    />
    <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
      <Text>Vegetables</Text>
      <Text>Pick up time: 17:30 - 18:30</Text>
      <Text>300 m</Text>
      <Text>5 EUR</Text>
    </View>
  </SquircleView>
);

const CategoryHeader = ({ title }) => (
  <View
    style={{
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Text text60M style={{ marginBottom: 6 }}>
      {title}
    </Text>
    <TouchableOpacity>
      <Text>View all</Text>
    </TouchableOpacity>
  </View>
);

const HomeView = () => (
  <SafeAreaView edges={['top']} style={{ backgroundColor: 'white', flex: 1 }}>
    <View
      style={{
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontWeight: '600', fontSize: 32 }}>Hello, User</Text>
      <View
        style={{
          height: 30,
          width: 30,
          borderRadius: 100,
          backgroundColor: '#ccc',
        }}
      />
    </View>
    <View
      style={{
        marginHorizontal: 12,
        borderRadius: 30,
        backgroundColor: '#eee',
        paddingVertical: 10,
        marginTop: 18,
        flexDirection: 'row',
        paddingHorizontal: 12,
      }}
    >
      <MaterialIcons name="search" size={24} />
      <TextInput
        placeholder="Search..."
        style={{ flex: 1, marginHorizontal: 8 }}
      />
      <MaterialCommunityIcons
        name="filter-variant"
        size={24}
        color={Colors.primary}
      />
    </View>
    <View style={{ marginTop: 20 }}>
      <CategoryHeader title="Explore categories" />
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </ScrollView>
    </View>
    <View style={{ marginTop: 20 }}>
      <CategoryHeader title="Close to you" />
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </ScrollView>
    </View>
    <View style={{ marginTop: 20 }}>
      <CategoryHeader title="Pick up soon" />
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </ScrollView>
    </View>
    {/*<Header label="Home" />*/}
    {/*<FlatList*/}
    {/*  data={posts}*/}
    {/*  style={{ paddingVertical: 24 }}*/}
    {/*  contentContainerStyle={{ paddingBottom: 24 }}*/}
    {/*  showsVerticalScrollIndicator={false}*/}
    {/*  renderItem={({ item }) => (*/}
    {/*    <Card*/}
    {/*      style={{ marginBottom: 15 }}*/}
    {/*      onPress={() => navigation.navigate('ProductDetails', { id: item.id })}*/}
    {/*    >*/}
    {/*      <Card.Section*/}
    {/*        imageSource={{*/}
    {/*          uri: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80',*/}
    {/*        }}*/}
    {/*        imageStyle={{ height: 150 }}*/}
    {/*      />*/}

    {/*      <View padding-20 bg-white>*/}
    {/*        <Text text40 color={Colors.grey10}>*/}
    {/*          {item.title}*/}
    {/*        </Text>*/}
    {/*        <View row>*/}
    {/*          <Text text90>{item.status}</Text>*/}
    {/*          <Text text90> | {item.timestamp}</Text>*/}
    {/*        </View>*/}

    {/*        <Text text70 color={Colors.grey10}>*/}
    {/*          {item.description}*/}
    {/*        </Text>*/}

    {/*        <View>*/}
    {/*          <Text text90 color={Colors.grey50}>*/}
    {/*            {item.likes} Likes*/}
    {/*          </Text>*/}
    {/*        </View>*/}
    {/*      </View>*/}
    {/*    </Card>*/}
    {/*  )}*/}
    {/*/>*/}
  </SafeAreaView>
);

export default HomeView;
