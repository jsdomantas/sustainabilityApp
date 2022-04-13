import { useActionSheet } from '@expo/react-native-action-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
import { useState } from 'react';

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
            maxHeight: 200,
            maxWidth: 200,
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
