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
import AddFoodCollectionView from './containers/Admin/AddFoodCollectionView';
import FoodCollectionDetails from './containers/Admin/FoodCollectionDetails';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserRole } from './state/user/userSelectors';
import auth from '@react-native-firebase/auth';
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

  const dispatch = useDispatch();

  console.log(`is logged in: ${isLoggedIn}`);
  console.log(`user role: ${userRole}`);

  const onAuthStateChanged = authUser => {
    if (authUser) {
      auth()
        .currentUser?.getIdToken()
        .then(token => {
          setJWT(token);
          // setUser(authUser);
          getProfile().then(data => {
            console.log('inside profile');
            dispatch(setProfile(data));
          });
        });
    }
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
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
      <Stack.Screen
        name={RouteNames.AddFoodCollection}
        component={AddFoodCollectionView}
      />
      <Stack.Screen
        name={RouteNames.FoodCollectionDetails}
        component={FoodCollectionDetails}
      />
    </>
  );

  return (
    <NavigationContainer ref={navigationRef}>
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
