import { RootStackParamList } from './RootStackParamList';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
