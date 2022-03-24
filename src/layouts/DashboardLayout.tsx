import React from 'react';
import {
  Box,
  VStack,
  StatusBar,
  HStack,
  Icon,
  Image,
  Text,
  useColorMode,
  IconButton,
  Divider,
  Menu,
  Avatar,
  Input,
  View,
} from 'native-base';

import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type DashboardLayoutProps = {
  scrollable?: boolean;
  displayScreenTitle?: boolean;
  displaySidebar?: boolean;
  displayBackButton?: boolean;
  showIcons?: boolean;
  displaySearchButton?: boolean;
  displayNotificationButton?: boolean;
  displayMenuButton?: boolean;
  displayAlternateMobileHeader?: boolean;
  header?: {
    searchbar: boolean;
  };
  mobileHeader?: {
    backButton: boolean;
    displayIcons: boolean;
  };
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  showGroupInfoHeader?: boolean;
  displayBackIcon?: boolean;
  enableBounceBackground?: boolean;
};

type MainContentProps = DashboardLayoutProps;

type MobileHeaderProps = {
  title: string;
  backButton: boolean;
  displayIcons: boolean;
};

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
  menuButton: boolean;
  searchbar: boolean;
};

export function Header(props: HeaderProps) {
  const { colorMode } = useColorMode();
  return (
    <Box
      px="6"
      pt="3"
      pb="3"
      borderBottomWidth="1"
      _dark={{ bg: 'coolGray.900', borderColor: 'coolGray.800' }}
      _light={{
        bg: { base: 'primary.900', md: 'white' },
        borderColor: 'coolGray.200',
      }}
    >
      <VStack
        alignSelf="center"
        width="100%"
        maxW={props.menuButton ? null : '1016px'}
      >
        <HStack alignItems="center" justifyContent="space-between">
          <HStack space="4" alignItems="center">
            {props.menuButton && (
              <IconButton
                variant="ghost"
                colorScheme="light"
                onPress={props.toggleSidebar}
                icon={
                  <Icon
                    size="6"
                    name="menu-sharp"
                    as={Ionicons}
                    _light={{ color: 'coolGray.800' }}
                    _dark={{ color: 'coolGray.50' }}
                  />
                }
              />
            )}

            {colorMode === 'light' ? (
              <Image
                h="10"
                w="56"
                alt="NativeBase Startup+"
                resizeMode="contain"
                source={require('../assets/header_logo_light.png')}
              />
            ) : (
              <Image
                h="10"
                w="56"
                alt="NativeBase Startup+"
                resizeMode="contain"
                source={require('../assets/header_logo_dark.png')}
              />
            )}
          </HStack>
          {props.searchbar && (
            <Input
              px="4"
              w="30%"
              size="sm"
              placeholder="Search"
              InputLeftElement={
                <Icon
                  px="2"
                  size="4"
                  name={'search'}
                  as={FontAwesome}
                  _light={{
                    color: 'coolGray.400',
                  }}
                  _dark={{
                    color: 'coolGray.100',
                  }}
                />
              }
            />
          )}

          <HStack space="2" alignItems="center">
            <IconButton
              variant="ghost"
              colorScheme="light"
              icon={
                <Icon
                  size="6"
                  name="bell"
                  as={FontAwesome}
                  _dark={{
                    color: 'coolGray.200',
                  }}
                  _light={{
                    color: 'coolGray.400',
                  }}
                />
              }
            />
            <Menu
              closeOnSelect={false}
              w="200"
              placement="bottom right"
              onOpen={() => console.log('opened')}
              onClose={() => console.log('closed')}
              trigger={triggerProps => {
                return (
                  <IconButton
                    {...triggerProps}
                    variant="ghost"
                    colorScheme="light"
                    icon={
                      <Avatar
                        w="8"
                        h="8"
                        _dark={{ bg: 'coolGray.200' }}
                        source={require('../assets/women.jpg')}
                      />
                    }
                  />
                );
              }}
              //@ts-ignore
              _dark={{ bg: 'coolGray.800', borderColor: 'coolGray.700' }}
            >
              <Menu.Group title="Profile">
                <Menu.Item>Account</Menu.Item>
              </Menu.Group>
              <Divider mt="3" w="100%" _dark={{ bg: 'coolGray.700' }} />
              <Menu.Group title="Shortcuts">
                <Menu.Item>Settings</Menu.Item>
                <Menu.Item>Logout</Menu.Item>
              </Menu.Group>
            </Menu>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}

function MainContent(props: MainContentProps) {
  return (
    <VStack maxW="1016px" flex={1} width="100%">
      {/*{props.displayScreenTitle && (*/}
      {/*  <Hidden till="md">*/}
      {/*    <HStack mb="4" space={2} alignItems="center">*/}
      {/*      <Pressable>*/}
      {/*        <Icon*/}
      {/*          size="6"*/}
      {/*          as={AntDesign}*/}
      {/*          name={'arrowleft'}*/}
      {/*          _light={{ color: 'coolGray.800' }}*/}
      {/*          _dark={{ color: 'coolGray.50' }}*/}
      {/*        />*/}
      {/*      </Pressable>*/}
      {/*      <Text*/}
      {/*        fontSize="lg"*/}
      {/*        _dark={{ color: 'coolGray.50' }}*/}
      {/*        _light={{ color: 'coolGray.800' }}*/}
      {/*      >*/}
      {/*        {props.title}*/}
      {/*      </Text>*/}
      {/*    </HStack>*/}
      {/*  </Hidden>*/}
      {/*)}*/}
      {props.children}
    </VStack>
  );
}

export function MobileHeader(props: MobileHeaderProps) {
  return (
    <Box
      px="1"
      pt="4"
      pb="4"
      _dark={{ bg: 'coolGray.900', borderColor: 'coolGray.800' }}
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
                      _dark={{
                        color: 'coolGray.200',
                      }}
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
                  //@ts-ignore
                  _dark={{ bg: 'coolGray.800', borderColor: 'coolGray.700' }}
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
}

export default function DashboardLayout({
  // scrollable = true,
  displayScreenTitle = true,
  enableBounceBackground = false,
  mobileHeader = {
    backButton: true,
    displayIcons: false,
  },
  ...props
}: DashboardLayoutProps) {
  return (
    <Box flex={1}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Box
        safeAreaTop
        _light={{ bg: 'primary.900' }}
        _dark={{ bg: 'coolGray.900' }}
      />
      <Box flex={1} _light={{ bg: 'white' }} _dark={{ bg: 'customGray' }}>
        <MobileHeader
          title={props.title}
          backButton={mobileHeader.backButton}
          displayIcons={mobileHeader.displayIcons}
        />
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {enableBounceBackground && (
            <View
              backgroundColor="primary.900"
              style={{
                height: 1000,
                position: 'absolute',
                top: -1000,
                left: 0,
                right: 0,
              }}
            />
          )}
          <MainContent {...props} displayScreenTitle={displayScreenTitle} />
        </KeyboardAwareScrollView>
      </Box>
    </Box>
  );
}
