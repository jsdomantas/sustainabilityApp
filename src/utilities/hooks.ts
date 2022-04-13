import { useActionSheet } from '@expo/react-native-action-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import { useEffect, useState } from 'react';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';

export const useImagePickerActionSheet = () => {
  const { showActionSheetWithOptions } = useActionSheet();

  const [isUploading, setIsUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');

  const openActionSheet = () => {
    showActionSheetWithOptions(
      {
        options: ['Take picture', 'Select picture', 'Cancel'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          launchCamera({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
          }).then(r => console.log(r));
        } else if (buttonIndex === 1) {
          launchImageLibrary({
            maxHeight: 1000,
            maxWidth: 1000,
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
          }).then(r => {
            const uri = r?.assets?.[0].uri;
            if (uri) {
              const fileName = uri.substring(uri.lastIndexOf('/') + 1);
              const uploadUri =
                Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

              setIsUploading(true);

              const task = storage().ref(fileName);

              task
                .putFile(uploadUri)
                .then(() => {
                  task.getDownloadURL().then(value => setPhotoUrl(value));
                })
                .catch(reason => console.error(reason))
                .finally(() => setIsUploading(false));
            }
          });
        }
      },
    );
  };

  return { openActionSheet, isUploading, photoUrl };
};

export const useCurrentLocation = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [pos, setPos] = useState<GeoPosition | null>(null);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow the app to determine your location.',
        '',
        [
          { text: 'Go to More', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      );
    }

    return false;
  };

  useEffect(() => {
    const hasLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        return await hasPermissionIOS();
      }

      if (Platform.OS === 'android' && Platform.Version < 23) {
        return true;
      }

      const permissionGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      console.log('permission granted: ' + permissionGranted);

      if (permissionGranted) {
        return true;
      }

      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      if (status === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
          'Location permission denied by user.',
          ToastAndroid.LONG,
        );
      } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        ToastAndroid.show(
          'Location permission revoked by user.',
          ToastAndroid.LONG,
        );
      }

      return false;
    };

    const checkIfHasPermission = async () => {
      const hasGivenPermission = await hasLocationPermission();
      setHasPermission(hasGivenPermission);
    };
    checkIfHasPermission().then();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      getLocation();
    }
  }, [hasPermission]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        setPos(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
        setPos(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: false,
        showLocationDialog: true,
      },
    );
  };

  return { pos };
};
