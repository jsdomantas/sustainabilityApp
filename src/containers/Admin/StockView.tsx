import {
  Button,
  HStack,
  Icon,
  IconButton,
  Menu,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../constants/RouteNames';
import { Checkbox } from 'react-native-ui-lib';
import { useStockProductsQuery } from './Offers/queries';

const StockView = () => {
  const { navigate } = useNavigation();

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);

  const stockProductsQuery = useStockProductsQuery();

  const renderIcons = () => (
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
                color="white"
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
      <Menu.Item>Add products</Menu.Item>
      <Menu.Item>Delete products</Menu.Item>
    </Menu>
  );

  return (
    <>
      <DashboardLayout
        title="Your products"
        mobileHeader={{
          backButton: false,
          renderIcons,
        }}
      >
        <VStack space={3} p={4} pb={16}>
          {stockProductsQuery.data?.map(item => (
            <HStack key={item.id}>
              {isSelecting ? (
                <Checkbox
                  label={item.title}
                  value={selectedItems.includes(item.id)}
                  onValueChange={value => {
                    if (value) {
                      setSelectedItems([...selectedItems, item.id]);
                    } else {
                      setSelectedItems(
                        selectedItems.filter(i => i !== item.id),
                      );
                    }
                  }}
                />
              ) : (
                <Text>{item.title}</Text>
              )}
            </HStack>
          ))}
        </VStack>
      </DashboardLayout>
      <Button
        shadow={2}
        bg="primary.900"
        style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}
        onPress={
          isSelecting
            ? selectedItems.length
              ? () => navigate(RouteNames.AddOffer)
              : () => setIsSelecting(false)
            : () => setIsSelecting(true)
        }
      >
        {isSelecting
          ? selectedItems.length
            ? 'Submit'
            : 'Cancel'
          : 'Select products to give away'}
      </Button>
    </>
  );
};

export default StockView;
