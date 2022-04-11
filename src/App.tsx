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
import AddFoodCollectionView from './containers/Admin/AddFoodCollectionView';
import SelectLocationView from './containers/Admin/SelectLocationView';
import FoodCollectionDetails from './containers/Admin/FoodCollectionDetails';
import { setJWT } from './axiosConfig';
import OnboardingView from './containers/Admin/OnboardingView';
import { navigationRef } from './utilities/rootNavigation';
import SelectProductsView from './containers/Admin/SelectProductsView';
import OrdersView from './containers/Admin/Offers/OffersListView';
import { RootStackParamList } from './RootStackParamList';
import AddOfferView from './containers/Admin/Offers/AddOfferView';
import StockView from './containers/Admin/StockView';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import OfferDetailsView from './containers/Admin/Offers/OfferDetailsView';
import ClientRatingView from './containers/Admin/Offers/ClientRatingView';

const Stack = createNativeStackNavigator<RootStackParamList>();

const tabIcons = {
  Home: 'home',
  Settings: 'cog',
  Locations: 'map',
  Pantry: 'clipboard-list-outline',
  Stock: 'clipboard-list-outline',
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
    <Tab.Screen name="Home" component={OrdersView} />
    <Tab.Screen name={RouteNames.Stock} component={StockView} />
    <Tab.Screen name="Settings" component={SettingsView} />
  </Tab.Navigator>
);

const Tab = createBottomTabNavigator();

const App = () => {
  LogBox.ignoreLogs(['NativeBase', 'UILib', 'When server rendering']);
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
      <Stack.Screen name={RouteNames.HomeStack} component={HomeStack} />
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
      <Stack.Screen name={RouteNames.AdminStack} component={AdminHomeStack} />
      <Stack.Screen name={RouteNames.AddOffer} component={AddOfferView} />
      <Stack.Screen
        name={RouteNames.ClientRatingView}
        component={ClientRatingView}
      />
      <Stack.Screen
        name={RouteNames.AdminOfferDetails}
        component={OfferDetailsView}
      />
      <Stack.Screen
        name={RouteNames.AdminOnboarding}
        component={OnboardingView}
      />
      <Stack.Screen
        name={RouteNames.SelectProducts}
        component={SelectProductsView}
      />
      <Stack.Screen
        name={RouteNames.AddFoodCollection}
        component={AddFoodCollectionView}
      />
      <Stack.Screen
        name={RouteNames.SelectLocation}
        component={SelectLocationView}
      />
      <Stack.Screen
        name={RouteNames.FoodCollectionDetails}
        component={FoodCollectionDetails}
      />
    </>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <NativeBaseProvider>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator>
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
                    <Stack.Screen name={RouteNames.Splash} component={Splash} />
                    <Stack.Screen
                      name={RouteNames.Login}
                      component={LoginView}
                    />
                    <Stack.Screen
                      name={RouteNames.Signup}
                      component={SignupView}
                    />
                  </Stack.Group>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
