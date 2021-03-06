import { navigationRef } from './utilities/rootNavigation';
import { RouteNames } from './constants/RouteNames';
import Splash from './containers/SplashView';
import LoginView from './containers/Auth/LoginView';
import SignupView from './containers/Auth/SignupView';
import CreateAdminProfileView from './containers/Admin/CreateAdminProfileView';
import SelectLocationView from './containers/Admin/SelectLocationView';
import SelectProductsView from './containers/Admin/SelectProductsView';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import ProductDetailsView from './containers/Home/ProductDetailsView';
import CatalogView from './containers/Home/CatalogView';
import AddPantryItemView from './containers/Pantry/AddPantryItemView';
import BarcodeScannerView from './containers/Pantry/BarcodeScannerView';
import AddOfferView from './containers/Admin/Offers/AddOfferView';
import ClientRatingView from './containers/ClientRatingView';
import OfferDetailsView from './containers/Admin/Offers/OfferDetailsView';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserRole } from './state/user/userSelectors';
import { setJWT } from './axiosConfig';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './containers/Home/Home';
import LocationsMapView from './containers/Map/LocationsMapView';
import PantryView from './containers/Pantry/PantryView/PantryView';
import SettingsView from './containers/More/SettingsView';
import OrdersView from './containers/Admin/Offers/OffersListView';
import StockView from './containers/Admin/StockView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateUserProfileView from './containers/Auth/CreateUserProfileView';
import ReservationHistoryView from './containers/More/ReservationHistoryView';
import { getProfile } from './containers/Auth/api';
import { setProfile } from './state/user/userSlice';
import auth from '@react-native-firebase/auth';
import * as Sentry from '@sentry/react-native';
// import appInstance, { initApp } from './utilities/firebase';

const Stack = createNativeStackNavigator<RootStackParamList>();

const tabIcons = {
  Home: 'home',
  More: 'cog',
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
    <Tab.Screen name="More" component={SettingsView} />
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
    <Tab.Screen name="More" component={SettingsView} />
  </Tab.Navigator>
);

const Tab = createBottomTabNavigator();

const Routes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUserRole);

  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

  // Sentry.init({
  //   dsn: 'https://a7d6b772174f431faae5db793f29cd80@o1235964.ingest.sentry.io/6386043',
  //   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  //   // We recommend adjusting this value in production.
  //   tracesSampleRate: 1.0,
  //   integrations: [
  //     new Sentry.ReactNativeTracing({
  //       routingInstrumentation,
  //     }),
  //   ],
  // });

  const dispatch = useDispatch();

  const onAuthStateChanged = authUser => {
    if (authUser) {
      auth()
        .currentUser?.getIdToken()
        .then(token => {
          setJWT(token);
          // setUser(authUser);
          getProfile().then(data => {
            dispatch(setProfile(data));
          });
        });
    }
  };

  useEffect(() => {
    // if (!appInstance) {
    //   initApp().then();
    // } else {
    return auth().onAuthStateChanged(onAuthStateChanged);
    // }
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
      <Stack.Screen
        name={RouteNames.ReservationHistory}
        component={ReservationHistoryView}
      />
    </>
  );

  const renderAdminRoutes = () => (
    <>
      <Stack.Screen name={RouteNames.AdminStack} component={AdminHomeStack} />
      <Stack.Screen name={RouteNames.AddOffer} component={AddOfferView} />
      <Stack.Screen
        name={RouteNames.AdminOfferDetails}
        component={OfferDetailsView}
      />
    </>
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(navigationRef);
      }}
    >
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            {userRole === 'business' ? renderAdminRoutes() : renderUserRoutes()}
            <Stack.Screen
              name={RouteNames.ClientRatingView}
              component={ClientRatingView}
            />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name={RouteNames.Splash} component={Splash} />
            <Stack.Screen name={RouteNames.Login} component={LoginView} />
            <Stack.Screen name={RouteNames.Signup} component={SignupView} />
            <Stack.Screen
              name={RouteNames.CreateUserProfile}
              component={CreateUserProfileView}
            />
            <Stack.Screen
              name={RouteNames.AdminOnboarding}
              component={CreateAdminProfileView}
            />
            <Stack.Screen
              name={RouteNames.SelectLocation}
              component={SelectLocationView}
            />
            <Stack.Screen
              name={RouteNames.SelectProducts}
              component={SelectProductsView}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
