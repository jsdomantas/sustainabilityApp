import { RouteNames } from './constants/RouteNames';
import { Region } from 'react-native-maps';

type Credentials = {
  email: string;
  password: string;
  isBusinessAccount: boolean;
};

type AdminRegistrationData = {
  name: string;
  pickupTime: string;
  coordinates: Region;
};

type Product = {
  title: string;
  id: number;
};

export type RootStackParamList = {
  [RouteNames.HomeStack]: any;
  [RouteNames.Home]: undefined;
  [RouteNames.PantryItemBottomsSheet]: any;
  [RouteNames.AddOffer]: {
    selectedProducts: Product[];
  };
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
    credentials: Credentials;
  };
  [RouteNames.SelectProducts]: {
    credentials: Credentials;
    profile: AdminRegistrationData;
  };
  [RouteNames.AdminOfferDetails]: any;
  [RouteNames.ClientRatingView]: any;

  [RouteNames.AddFoodCollection]: any;
  [RouteNames.FoodCollectionDetails]: any;
  [RouteNames.ReservationHistory]: any;
  [RouteNames.SelectLocation]: any;
  [RouteNames.CreateUserProfile]: {
    credentials: {
      email: string;
      password: string;
    };
  };
};
