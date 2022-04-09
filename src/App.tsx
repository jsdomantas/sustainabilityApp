import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import LocationsMapView from './containers/Map/LocationsMapView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PantryView from './containers/Pantry/PantryView/PantryView';
import SignupView from './containers/Auth/SignupView';
import LoginView from './containers/Auth/LoginView';
import SettingsView from './containers/Settings/SettingsView';
import ProductDetailsView from './containers/Home/ProductDetailsView';
import { RouteNames } from './constants/RouteNames';
import BarcodeScannerView from './containers/Pantry/BarcodeScannerView';
import { LogBox, Platform, StatusBar } from 'react-native';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './utilities/reactQuery';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import HomeScreen from './containers/Home/Home';
import Splash from './containers/SplashView';
import AddPantryItemView from './containers/Pantry/AddPantryItemView';
import CatalogView from './containers/Home/CatalogView';
import HomeView from './containers/Admin/HomeView';
import AddFoodCollectionView from './containers/Admin/AddFoodCollectionView';
import SelectLocationView from './containers/Admin/SelectLocationView';
import FoodCollectionDetails from './containers/Admin/FoodCollectionDetails';
import { setJWT } from './axiosConfig';
import OnboardingView from './containers/Admin/OnboardingView';
import { navigationRef } from './utilities/rootNavigation';
import SelectProductsView from './containers/Admin/SelectProductsView';

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
            color={focused ? '#0e7490' : '#6b7280'}
          />
        );
      },
      tabBarActiveTintColor: '#0e7490',
      tabBarInactiveTintColor: '#6b7280',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Locations" component={LocationsMapView} />
    <Tab.Screen name="Pantry" component={PantryView} />
    <Tab.Screen name="Settings" component={SettingsView} />
  </Tab.Navigator>
);

const AdminHomeStack = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        return (
          <MaterialCommunityIcons
            name={tabIcons[route.name]}
            size={28}
            color={focused ? '#0e7490' : '#6b7280'}
          />
        );
      },
      tabBarActiveTintColor: '#0e7490',
      tabBarInactiveTintColor: '#6b7280',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeView} />
    <Tab.Screen name="Settings" component={SettingsView} />
  </Tab.Navigator>
);

const Tab = createBottomTabNavigator();

const App = () => {
  LogBox.ignoreLogs(['NativeBase', 'UILib']);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = authUser => {
    if (authUser) {
      auth()
        .currentUser?.getIdToken()
        .then(token => {
          setJWT(token);
          setUser(authUser);
        });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
  }, []);

  const renderUserRoutes = () => (
    <>
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen
        name={RouteNames.ProductDetails}
        component={ProductDetailsView}
      />
      <Stack.Screen name={RouteNames.Catalog} component={CatalogView} />
      <Stack.Screen
        name={RouteNames.PantryItemBottomsSheet}
        component={AddPantryItemView}
      />
      <Stack.Screen
        name={RouteNames.BarcodeScanner}
        component={BarcodeScannerView}
        options={{
          headerShown: false,
        }}
      />
    </>
  );

  const renderAdminRoutes = () => (
    <>
      <Stack.Screen
        name={RouteNames.AdminOnboarding}
        component={OnboardingView}
      />
      <Stack.Screen
        name={RouteNames.SelectProducts}
        component={SelectProductsView}
      />
      <Stack.Screen name="AdminStack" component={AdminHomeStack} />
      <Stack.Screen
        name="AddFoodCollection"
        component={AddFoodCollectionView}
      />
      <Stack.Screen name="SelectLocation" component={SelectLocationView} />
      <Stack.Screen
        name="FoodCollectionDetails"
        component={FoodCollectionDetails}
      />
    </>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={RouteNames.AdminOnboarding}>
              {user ? (
                <Stack.Group
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  {false ? renderUserRoutes() : renderAdminRoutes()}
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
