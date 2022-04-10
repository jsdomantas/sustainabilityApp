import React from 'react';
import {
  Box,
  VStack,
  StatusBar,
  HStack,
  Icon,
  Text,
  IconButton,
  View,
} from 'native-base';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
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
    backButton?: boolean;
    renderIcons?: () => React.ReactNode;
  };
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  showGroupInfoHeader?: boolean;
  displayBackIcon?: boolean;
  enableBounceBackground?: boolean;
};

type HeaderProps = {
  title: string;
  backButton?: boolean;
  renderIcons?: () => React.ReactNode;
};

export function Header(props: HeaderProps) {
  const { goBack } = useNavigation();
  return (
    <Box
      px="1"
      py={2}
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

              <HStack
                alignItems="center"
                justifyContent="space-between"
                flex={1}
              >
                <Text
                  color="coolGray.50"
                  fontSize="lg"
                  ml={props.backButton ? 0 : 3}
                >
                  {props.title}
                </Text>
                {props.renderIcons && props.renderIcons()}
              </HStack>
            </HStack>
          </>
        </HStack>
      </HStack>
    </Box>
  );
}

export default function DashboardLayout({
  enableBounceBackground = false,
  mobileHeader = {
    backButton: true,
    renderIcons: undefined,
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
        <Header
          title={props.title}
          backButton={mobileHeader.backButton}
          renderIcons={mobileHeader.renderIcons}
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
          <VStack maxW="1016px" flex={1} width="100%">
            {props.children}
          </VStack>
        </KeyboardAwareScrollView>
      </Box>
    </Box>
  );
}
