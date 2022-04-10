import {
  Button,
  Checkbox,
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

const StockView = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const list = [1, 2, 3];

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
          {list.map(item => (
            <HStack key={item}>
              {isSelecting ? (
                <Checkbox value={'1'}>
                  <Text ml={2}>Test</Text>
                </Checkbox>
              ) : (
                <Text>Test</Text>
              )}
            </HStack>
          ))}
        </VStack>
      </DashboardLayout>
      <Button
        shadow={2}
        style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}
        onPress={
          isSelecting ? () => setIsSelecting(false) : () => setIsSelecting(true)
        }
      >
        {isSelecting ? 'Submit' : 'Select products to give away'}
      </Button>
    </>
  );
};

export default StockView;
