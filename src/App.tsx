import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationsMapView from './containers/Map/LocationsMapView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PantryView from './containers/Pantry/PantryView/PantryView';
import SignupView from './containers/Auth/SignupView';
import LoginView from './containers/Auth/LoginView';
import SettingsView from './containers/Settings/SettingsView';
import ProductDetailsView from './containers/Home/ProductDetailsView';
import { RouteNames } from './constants/RouteNames';
import PantryItemBottomSheet from './containers/Pantry/PantryItemBottomSheet';
import BarcodeScannerView from './containers/Pantry/BarcodeScannerView';
import { Platform, StatusBar } from 'react-native';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './utilities/reactQuery';
import { supabase } from './utilities/supabase';
import { Session } from '@supabase/supabase-js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from './containers/Home/Home';
import Splash from './containers/SplashView';

const Stack = createNativeStackNavigator();

const tabIcons = {
  Home: 'home',
  Settings: 'cog',
  Locations: 'map',
  Pantry: 'clipboard-list-outline',
};

const HomeStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        return (
          <MaterialCommunityIcons
            name={tabIcons[route.name]}
            size={28}
            color={focused ? '#0e7490' : '#444'}
          />
        );
      },
      tabBarActiveTintColor: '#0e7490',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Locations" component={LocationsMapView} />
    <Tab.Screen name="Pantry" component={PantryView} />
    <Tab.Screen name="Settings" component={SettingsView} />
  </Tab.Navigator>
);

const Tab = createBottomTabNavigator();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_, authSession) => {
      setSession(authSession);
    });
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {session ? (
                <Stack.Group>
                  <Stack.Screen
                    name="HomeStack"
                    component={HomeStack}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetailsView}
                  />
                  <Stack.Screen
                    options={{
                      presentation: 'transparentModal',
                      headerShown: false,
                    }}
                    name={RouteNames.PantryItemBottomsSheet}
                    component={PantryItemBottomSheet}
                  />
                  <Stack.Screen
                    name={RouteNames.BarcodeScanner}
                    component={BarcodeScannerView}
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack.Group>
              ) : (
                <Stack.Group screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Splash" component={Splash} />
                  <Stack.Screen name="Login" component={LoginView} />
                  <Stack.Screen name="Signup" component={SignupView} />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
