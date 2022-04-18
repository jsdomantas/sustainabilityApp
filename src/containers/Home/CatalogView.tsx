import React, { useEffect } from 'react';
import {
  HStack,
  Text,
  VStack,
  Pressable,
  FlatList,
  Button,
  Box,
} from 'native-base';
import { useBreakpointValue } from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigation } from '@react-navigation/native';
import { useCurrentLocation } from '../../utilities/hooks';
import { useAllOffersQuery } from './queries';
import TrendCard from './components/Cards/TrendCard';

type ProductProps = {
  imageUri: string;
  itemName: string;
  itemCompany: string;
  discountedPrice: number;
  actualPrice: number;
  discountPercentage: string;
};
type CardProps = {
  item: ProductProps;
  onPress: () => void;
};
function Card(props: CardProps) {
  return (
    <Pressable onPress={props.onPress}>
      <VStack
        w={{ base: '173', md: '130', lg: '145', xl: '173' }}
        mt="3"
        _light={{ bg: 'primary.50' }}
        _dark={{ bg: 'customGray' }}
        borderRadius="lg"
        p="3"
      >
        {/*<Image*/}
        {/*  w={{ base: '157', md: '117', lg: '127', xl: '157' }}*/}
        {/*  h="169"*/}
        {/*  borderRadius="8"*/}
        {/*  source={{ uri: props.item.imageUri }}*/}
        {/*  alt="Alternate Text"*/}
        {/*  resizeMode="cover"*/}
        {/*/>*/}

        <VStack space="1" mt="3">
          <Text
            fontSize="sm"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.200' }}
          >
            {props.item.title}
          </Text>
          <Text
            fontSize="sm"
            _light={{ color: 'coolGray.400' }}
            _dark={{ color: 'coolGray.400' }}
          >
            {props.item.businessOwner.title}
          </Text>
        </VStack>
        <Button onPress={props.onPress}>View</Button>
      </VStack>
    </Pressable>
  );
}
const CatalogView = ({
  route: {
    params: { title },
  },
}) => {
  const noColumn = useBreakpointValue({
    base: 2,
    lg: 4,
    md: 3,
    xl: 5,
  });

  const { navigate } = useNavigation();
  const { pos } = useCurrentLocation();

  const allOffersQuery = useAllOffersQuery(pos?.coords);

  useEffect(() => {
    if (pos) {
      allOffersQuery.refetch();
    }
  }, [pos]);

  return (
    <>
      <DashboardLayout title={title} scrollable={false}>
        <Box px={4}>
          <FlatList
            numColumns={noColumn}
            data={allOffersQuery.data}
            renderItem={({ item }) => (
              <HStack mx="1" mt="2">
                <TrendCard item={item} />
              </HStack>
            )}
            key={noColumn}
            keyExtractor={(item, index) => 'key' + index}
          />
        </Box>
      </DashboardLayout>
    </>
  );
};

export default CatalogView;
