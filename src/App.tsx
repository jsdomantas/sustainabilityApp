import React, { useEffect } from 'react';
import { LogBox, Platform, StatusBar } from 'react-native';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './utilities/reactQuery';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Routes from './Routes';

const App = () => {
  LogBox.ignoreLogs(['NativeBase', 'UILib', 'When server rendering']);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
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

export default App;
