import React from 'react';
import {
  HStack,
  Text,
  VStack,
  Image,
  Pressable,
  FlatList,
  Hidden,
  Button,
} from 'native-base';
import { useBreakpointValue } from 'native-base';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../constants/RouteNames';

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
const list: ProductProps[] = [
  {
    imageUri:
      'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
    itemName: 'Item 1',
    itemCompany: 'Walmart',
    discountedPrice: 1,
    actualPrice: 5000,
    discountPercentage: '',
  },
  {
    imageUri:
      'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
    itemName: 'Item 1',
    itemCompany: 'Walmart',
    discountedPrice: 1,
    actualPrice: 5000,
    discountPercentage: '',
  },
  {
    imageUri:
      'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
    itemName: 'Item 1',
    itemCompany: 'Walmart',
    discountedPrice: 1,
    actualPrice: 5000,
    discountPercentage: '',
  },
  {
    imageUri:
      'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
    itemName: 'Item 1',
    itemCompany: 'Walmart',
    discountedPrice: 1,
    actualPrice: 5000,
    discountPercentage: '',
  },
  {
    imageUri:
      'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
    itemName: 'Item 1',
    itemCompany: 'Walmart',
    discountedPrice: 1,
    actualPrice: 5000,
    discountPercentage: '',
  },
  {
    imageUri:
      'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
    itemName: 'Item 1',
    itemCompany: 'Walmart',
    discountedPrice: 1,
    actualPrice: 5000,
    discountPercentage: '',
  },
  {
    imageUri:
      'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
    itemName: 'Item 1',
    itemCompany: 'Walmart',
    discountedPrice: 1,
    actualPrice: 5000,
    discountPercentage: '',
  },
  {
    imageUri:
      'https://otojeobmlfdzdaamwtdq.supabase.co/storage/v1/object/sign/pantry/jude-infantini-rYOqbTcGp1c-unsplash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwYW50cnkvanVkZS1pbmZhbnRpbmktcllPcWJUY0dwMWMtdW5zcGxhc2guanBnIiwiaWF0IjoxNjQ4MjkwOTY3LCJleHAiOjE5NjM2NTA5Njd9.IvEL8N49p5pBU2_BVdtGX29UUdhfj_dNe1vvrT8T9Qg',
    itemName: 'Item 1',
    itemCompany: 'Walmart',
    discountedPrice: 1,
    actualPrice: 5000,
    discountPercentage: '',
  },
];
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
        <Hidden from="md" till="base">
          <Text
            position="absolute"
            left="5"
            top="5"
            zIndex={1}
            fontWeight="bold"
            _light={{ color: 'primary.900' }}
            _dark={{ color: 'violet.700' }}
          >
            {props.item.discountPercentage}
          </Text>
        </Hidden>
        <Image
          w={{ base: '157', md: '117', lg: '127', xl: '157' }}
          h="169"
          borderRadius="8"
          source={{ uri: props.item.imageUri }}
          alt="Alternate Text"
          resizeMode="cover"
        />

        <VStack space="1" mt="3">
          <Text
            fontSize="sm"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.200' }}
          >
            {props.item.itemName}
          </Text>
          <Text
            fontSize="sm"
            _light={{ color: 'coolGray.400' }}
            _dark={{ color: 'coolGray.400' }}
          >
            {props.item.itemCompany}
          </Text>
        </VStack>
        <HStack mt="2" alignItems="center" justifyContent="space-between">
          <Text
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.200' }}
            fontWeight="bold"
          >
            {props.item.discountedPrice} €
          </Text>
          <Button onPress={props.onPress}>View</Button>
        </HStack>
      </VStack>
    </Pressable>
  );
}
const CatalogView = () => {
  const noColumn = useBreakpointValue({
    base: 2,
    lg: 4,
    md: 3,
    xl: 5,
  });

  const { navigate } = useNavigation();

  return (
    <>
      <DashboardLayout title="Title" subTitle="28 items">
        <VStack px={{ base: 4, md: 8 }} py={{ base: 4, md: 8 }} space="4">
          <VStack alignItems="center" pb={4}>
            <FlatList
              numColumns={noColumn}
              data={list}
              renderItem={({ item }) => (
                <HStack mx="1" mt="2">
                  <Card
                    item={item}
                    onPress={() => navigate(RouteNames.ProductDetails)}
                  />
                </HStack>
              )}
              key={noColumn}
              keyExtractor={(item, index) => 'key' + index}
            />
          </VStack>
        </VStack>
      </DashboardLayout>
    </>
  );
};

export default CatalogView;
