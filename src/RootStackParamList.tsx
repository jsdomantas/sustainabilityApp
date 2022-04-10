import { RouteNames } from './constants/RouteNames';

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
  [RouteNames.AdminOnboarding]: any;
  [RouteNames.SelectProducts]: any;

  [RouteNames.AddFoodCollection]: any;
  [RouteNames.FoodCollectionDetails]: any;
  [RouteNames.SelectLocation]: any;
};
