import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button, HStack, Icon, IconButton, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useIngredientsQuery } from '../../queries';
import { Picker } from 'react-native-ui-lib';
import { ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SelectProductsView = () => {
  const { navigate } = useNavigation();
  const ingredientsQuery = useIngredientsQuery();

  const [products, setProducts] = useState([]);

  return (
    <DashboardLayout title="Select possible leftover stock">
      {ingredientsQuery.isLoading ? (
        <ActivityIndicator />
      ) : (
        <VStack px={4} py={4} flex={1}>
          <Text mb={4}>
            Select a list of products that have a chance of being given away for
            easy access. You will be able to edit this list later on.
          </Text>
          <Picker
            renderPicker={() => (
              <Button variant="outline">Browse products</Button>
            )}
            listProps={{
              removeClippedSubviews: true,
              maxToRenderPerBatch: 5,
              updateCellsBatchingPeriod: 150,
            }}
            showSearch={true}
            mode="MULTI"
            value={products}
            selectionLimit={10}
            onChange={items => {
              setProducts(items);
            }}
          >
            {ingredientsQuery.data.map(ingredient => (
              <Picker.Item
                key={ingredient.value}
                value={ingredient}
                label={ingredient.label}
              />
            ))}
          </Picker>
          <Text mt={4} mb={2} fontWeight="semibold">
            Selected stock:
          </Text>
          <HStack flexWrap="wrap" space={1}>
            {products.length === 0 && <Text>None.</Text>}
            {products.map(product => (
              <HStack
                key={product.value}
                backgroundColor="gray.100"
                borderRadius={10}
                alignItems="center"
                justifyContent="center"
                px={2}
                py={1}
                mb={2}
              >
                <Text mr={1}>{product.label}</Text>
                <IconButton
                  onPress={() =>
                    setProducts(prevState =>
                      prevState.filter(p => p.value !== product.value),
                    )
                  }
                  p={0}
                  mt={0.5}
                  icon={
                    <Icon
                      size="4"
                      as={MaterialCommunityIcons}
                      name="close"
                      color="gray.400"
                    />
                  }
                />
              </HStack>
            ))}
          </HStack>
          <Button
            style={{ marginTop: 'auto' }}
            onPress={() => navigate('AdminStack')}
          >
            Save
          </Button>
        </VStack>
      )}
    </DashboardLayout>
  );
};

export default SelectProductsView;
