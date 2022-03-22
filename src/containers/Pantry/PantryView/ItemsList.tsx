import React from 'react';

import { FlatList } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import differenceInDays from 'date-fns/differenceInDays';
import { PantryCategories } from '../constants';

const MyComponent = ({ data }) => {
  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={data}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>The pantry is empty.</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View
          paddingH-10
          style={{
            height: 75,
            backgroundColor: 'white',
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderColor: Colors.grey70,
          }}
        >
          <View marginB-4 row style={{ justifyContent: 'space-between' }}>
            <Text text70M>{item.title}</Text>
            <Text>{item.quantity}g</Text>
          </View>
          <View row style={{ justifyContent: 'space-between' }}>
            <Text yellow10>{`Expires in ${differenceInDays(
              new Date(item.expiration_date),
              new Date(),
            )} day(s)`}</Text>
            <Text grey40>{PantryCategories[item.pantry_category_id]}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default MyComponent;
