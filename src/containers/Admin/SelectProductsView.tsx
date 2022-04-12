import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button, HStack, Icon, IconButton, Text, VStack } from 'native-base';
import { useIngredientsQuery } from '../../queries';
import { Picker } from 'react-native-ui-lib';
import { ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../RootStackParamList';
import { RouteNames } from '../../constants/RouteNames';
import { useProfileQuery, useSignUpMutation } from '../Auth/queries';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../state/user/userSlice';

const SelectProductsView = ({
  route: {
    params: { profile, credentials },
  },
}: NativeStackNavigationProp<
  RootStackParamList,
  RouteNames.SelectProducts
>) => {
  const dispatch = useDispatch();
  const productsQuery = useIngredientsQuery();
  const signUpMutation = useSignUpMutation();
  const profileQuery = useProfileQuery();

  const [products, setProducts] = useState<{ value: string; label: string }[]>(
    [],
  );

  return (
    <DashboardLayout title="Select possible leftover stock">
      {productsQuery.isLoading ? (
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
            {productsQuery.data?.map(ingredient => (
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
            borderRadius="4"
            width="100%"
            size="md"
            bg="primary.900"
            onPress={() =>
              signUpMutation.mutate(
                {
                  email: credentials.email,
                  password: credentials.password,
                  profileData: {
                    ...profile,
                    products,
                    isBusinessAccount: credentials.isBusinessAccount,
                  },
                },
                {
                  onSuccess: () => {
                    profileQuery.refetch().then(r => {
                      dispatch(setProfile(r.data));
                    });
                  },
                },
              )
            }
          >
            Save
          </Button>
        </VStack>
      )}
    </DashboardLayout>
  );
};

export default SelectProductsView;
