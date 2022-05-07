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
import { initApp } from './utilities/firebase';
import * as Sentry from '@sentry/react-native';

const App = () => {
  LogBox.ignoreLogs([
    'Usage of',
    'The file',
    'RCTBridge',
    'Possible Unhandled Promise Rejection',
    'NativeBase',
    'UILib',
    'When server rendering',
    'source.uri should not be an empty string',
  ]);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');

    initApp().then(() => {
      console.log('test');
    });
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
