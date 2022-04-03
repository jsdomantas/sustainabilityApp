import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MaterialIcons } from '@expo/vector-icons';
import FloatingActionButton from '../../components/FloatingActionButton';
import { useNavigation } from '@react-navigation/native';
import { useFoodCollectionsQuery } from './queries';
import { ActivityIndicator } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { axiosClient } from '../../axiosConfig';

type OptionItemProps = {
  title: string;
  defaultOption: string;
  onPress: () => void;
};

function OptionItem({ title, defaultOption, onPress }: OptionItemProps) {
  return (
    <Pressable onPress={onPress}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack>
          <Text
            fontSize="md"
            letterSpacing="0.5"
            _light={{ color: 'coolGray.800' }}
            _dark={{ color: 'coolGray.50' }}
          >
            {title}
          </Text>
          <Text
            fontSize="sm"
            _light={{ color: 'coolGray.500' }}
            _dark={{ color: 'coolGray.300' }}
            letterSpacing="0.5"
          >
            {defaultOption}
          </Text>
        </VStack>
        <Icon as={MaterialIcons} name="chevron-right" color="coolGray.300" />
      </HStack>
    </Pressable>
  );
}

const HomeView = () => {
  const { navigate } = useNavigation();
  const foodCollectionsQuery = useFoodCollectionsQuery();

  const [token, setToken] = useState('');

  const getFirebaseToken = async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    return await messaging().getToken();
  };

  const onMessageReceived = async message => {
    if (!message) {
      return;
    }
    console.log(message.data.type);
  };

  const handleSetPushNotification = () => {
    fetch('http://10.0.2.2:8000/alarm', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    }).then(r => console.log(r));
  };

  useEffect(() => {
    async function fetchData() {
      const generatedToken = await getFirebaseToken();
      const userId = auth().currentUser?.uid;
      setToken(generatedToken);

      await axiosClient.post('/deviceToken', {
        deviceToken: generatedToken,
        userAuthId: userId,
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  return (
    <>
      <DashboardLayout
        title="Food collections"
        mobileHeader={{ backButton: false }}
      >
        {foodCollectionsQuery.isLoading ? (
          <ActivityIndicator />
        ) : (
          <VStack px={4} space={4} mt={4}>
            <Text
              _light={{ color: 'coolGray.800' }}
              fontSize="md"
              fontWeight="semibold"
            >
              Active
            </Text>
            <VStack space={2}>
              {foodCollectionsQuery.data?.data
                .filter(item => item.isActive)
                .map(item => (
                  <OptionItem
                    key={item.id}
                    onPress={() =>
                      navigate('FoodCollectionDetails', { id: item.id })
                    }
                    title={item.title}
                    defaultOption="Started at 2022-03-30"
                  />
                ))}
            </VStack>
            <Text
              _light={{ color: 'coolGray.800' }}
              fontSize="md"
              fontWeight="semibold"
            >
              Completed
            </Text>
            <VStack space={2}>
              {foodCollectionsQuery.data?.data
                .filter(item => !item.isActive)
                .map(item => (
                  <OptionItem
                    key={item.id}
                    onPress={() =>
                      navigate('FoodCollectionDetails', { id: item.id })
                    }
                    title={item.title}
                    defaultOption="Completed at 2022-03-30"
                  />
                ))}
            </VStack>
          </VStack>
        )}
      </DashboardLayout>
      <FloatingActionButton onPress={() => navigate('AddFoodCollection')} />
    </>
  );
};

export default HomeView;
