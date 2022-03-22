import React, { useState } from 'react';

import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { View, TabController, Colors } from 'react-native-ui-lib';
import Header from '../../../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../../constants/RouteNames';
import { useGetPantryItemsQuery } from '../queries/queries';
import ItemsList from './ItemsList';

const PantryView = () => {
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);

  const pantryItemsQuery = useGetPantryItemsQuery();

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Header label="Pantry" />
      <TabController
        items={[
          {
            label: 'All items',
            badge: {
              label: String(pantryItemsQuery.data?.body?.length) || '0',
            },
          },
          {
            label: 'Fridge',
          },
          { label: 'Freezer' },
          { label: 'Dry pantry' },
        ]}
        initialIndex={index}
        onChangeIndex={setIndex}
      >
        <TabController.TabBar
          enableShadow
          containerStyle={{
            backgroundColor: 'white',
          }}
        />
        <View style={{ height: '100%' }}>
          {pantryItemsQuery.isLoading || pantryItemsQuery.isFetching ? (
            <View
              style={{
                flex: 1,
                marginTop: -150,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator />
            </View>
          ) : (
            <>
              <TabController.TabPage index={0} key="All">
                <View flex>
                  <ItemsList data={pantryItemsQuery.data?.body} />
                </View>
              </TabController.TabPage>
              <TabController.TabPage index={1} key="Fridge">
                <View flex>
                  <ItemsList
                    data={pantryItemsQuery.data?.body?.filter(
                      item => item.pantry_category_id === 1,
                    )}
                  />
                </View>
              </TabController.TabPage>
              <TabController.TabPage index={2} key="Freezer">
                <View flex>
                  <ItemsList
                    data={pantryItemsQuery.data?.body?.filter(
                      item => item.pantry_category_id === 2,
                    )}
                  />
                </View>
              </TabController.TabPage>
              <TabController.TabPage index={3} key="Dry pantry">
                <View flex>
                  <ItemsList
                    data={pantryItemsQuery.data?.body?.filter(
                      item => item.pantry_category_id === 3,
                    )}
                  />
                </View>
              </TabController.TabPage>
            </>
          )}
        </View>
      </TabController>
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.navigate(RouteNames.PantryItemBottomsSheet)}
        style={{
          backgroundColor: Colors.primary,
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
        <MaterialCommunityIcons name="plus" size={38} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default PantryView;
