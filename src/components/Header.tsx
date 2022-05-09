import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, IconButton, Menu, Text } from 'native-base';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import React from 'react';

const MobileHeader = props => {
  const { goBack } = useNavigation();

  return (
    <Box
      px="1"
      pt="4"
      pb="4"
      _light={{
        bg: { base: 'primary.900', md: 'white' },
        borderColor: 'coolGray.200',
      }}
    >
      <HStack space="2" justifyContent="space-between">
        <HStack
          flex="1"
          space="2"
          justifyContent="space-between"
          alignItems="center"
        >
          <>
            <HStack alignItems="center" space="1">
              {props.backButton && (
                <IconButton
                  variant="ghost"
                  colorScheme="light"
                  onPress={goBack}
                  icon={
                    <Icon
                      size="6"
                      as={AntDesign}
                      name="arrowleft"
                      color="coolGray.50"
                    />
                  }
                />
              )}

              <Text
                color="coolGray.50"
                fontSize="lg"
                ml={props.backButton ? 0 : 3}
              >
                {props.title}
              </Text>
            </HStack>
            {props.displayIcons && (
              <HStack space="1">
                <IconButton
                  variant="ghost"
                  colorScheme="light"
                  icon={
                    <Icon
                      size="6"
                      name="bell"
                      as={FontAwesome}
                      _light={{
                        color: 'coolGray.50',
                      }}
                    />
                  }
                />
                <Menu
                  w="150"
                  trigger={triggerProps => {
                    return (
                      <IconButton
                        variant="ghost"
                        colorScheme="light"
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                        icon={
                          <Icon
                            size="6"
                            color="coolGray.50"
                            name={'dots-vertical'}
                            as={MaterialCommunityIcons}
                          />
                        }
                      />
                    );
                  }}
                  placement="bottom right"
                >
                  <Menu.Item>New Group</Menu.Item>
                  <Menu.Item>New Broadcast</Menu.Item>
                  <Menu.Item>Settings</Menu.Item>
                </Menu>
              </HStack>
            )}
          </>
        </HStack>
      </HStack>
    </Box>
  );
};

export default MobileHeader;
