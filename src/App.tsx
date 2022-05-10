import React, { useEffect } from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './utilities/reactQuery';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
// import firebase from '@react-native-firebase/app';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Routes from './Routes';
import * as Sentry from '@sentry/react-native';
import notifee, { IOSAuthorizationStatus } from '@notifee/react-native';

const App = () => {
  LogBox.ignoreLogs([
    'Each child',
    'Usage of',
    'The file',
    'RCTBridge',
    'Possible Unhandled Promise Rejection',
    'NativeBase',
    'UILib',
    'When server rendering',
    'source.uri should not be an empty string',
  ]);

  async function requestUserPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  }

  useEffect(() => {
    requestUserPermission().then();
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');

    // initApp().then(() => {
    //   console.log('test');
    // });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeAreaProvider>
          <ActionSheetProvider>
            <NativeBaseProvider>
              <Routes />
            </NativeBaseProvider>
          </ActionSheetProvider>
        </SafeAreaProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Sentry.wrap(App);
