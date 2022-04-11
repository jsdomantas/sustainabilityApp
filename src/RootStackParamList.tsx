import { RouteNames } from './constants/RouteNames';
import { Region } from 'react-native-maps';

type Credentials = {
  email: string;
  password: string;
  isBusinessAccount: boolean;
};

type AdminRegistrationData = Credentials & {
  name: string;
  pickupTime: string;
  location: Region;
};

export type RootStackParamList = {
  [RouteNames.HomeStack]: any;
  [RouteNames.PantryItemBottomsSheet]: any;
  [RouteNames.AddOffer]: any;
  [RouteNames.Stock]: any;

  [RouteNames.BarcodeScanner]: any;
  [RouteNames.Login]: any;
  [RouteNames.Signup]: any;
  [RouteNames.Splash]: any;

  [RouteNames.ProductDetails]: any;
  [RouteNames.Catalog]: any;

  [RouteNames.AdminStack]: any;
  [RouteNames.AdminOnboarding]: {
    coordinates?: Region;
    userData: Credentials;
  };
  [RouteNames.SelectProducts]: {
    profile: AdminRegistrationData;
  };
  [RouteNames.AdminOfferDetails]: any;
  [RouteNames.ClientRatingView]: any;

  [RouteNames.AddFoodCollection]: any;
  [RouteNames.FoodCollectionDetails]: any;
  [RouteNames.SelectLocation]: any;
};
