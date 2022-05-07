import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { useReservationHistoryQuery } from './queries';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../constants/RouteNames';
import { format, parseISO } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ReservationHistoryView = () => {
  const { navigate } = useNavigation();
  const reservationHistoryQuery = useReservationHistoryQuery();

  return (
    <DashboardLayout title="History" onPressBack={() => navigate('More')}>
      {reservationHistoryQuery.isLoading ? (
        <ActivityIndicator />
      ) : (
        <VStack p={4}>
          {reservationHistoryQuery.data.map((item, index) => (
            <Pressable
              key={item.id}
              onPress={() =>
                navigate(RouteNames.ProductDetails, { id: item.id })
              }
            >
              <VStack space="1">
                <HStack alignItems="center">
                  {!item.photoUrl ? (
                    <Box
                      h={50}
                      w={50}
                      borderRadius={8}
                      backgroundColor="gray.100"
                    />
                  ) : (
                    <Image
                      source={{ uri: item.photoUrl }}
                      h={50}
                      w={50}
                      borderRadius={8}
                      alt="offer image"
                    />
                  )}
                  <VStack ml={3} flex={1}>
                    <Text>{item.title}</Text>
                    <Text color={'gray.500'}>
                      {format(parseISO(item.createdAt), 'yyyy-MM-dd')}
                    </Text>
                  </VStack>
                  <Box
                    backgroundColor="blue.200"
                    px={2}
                    py={1}
                    borderRadius={4}
                  >
                    <Text>{item.status}</Text>
                  </Box>
                  <Menu
                    defaultIsOpen={false}
                    trigger={triggerProps => {
                      return (
                        <IconButton
                          testID="moreActionsBtn"
                          accessibilityLabel="More options menu"
                          {...triggerProps}
                          icon={
                            <Icon
                              ml={0}
                              size="6"
                              color="coolGray.400"
                              name={'dots-vertical'}
                              as={MaterialCommunityIcons}
                            />
                          }
                        />
                      );
                    }}
                    placement="bottom right"
                  >
                    <Menu.Item
                      onPress={() =>
                        navigate(RouteNames.ClientRatingView, {
                          offerId: item.id,
                          receiverId: item.businessOwner.id,
                          navigateToAfterSaving: RouteNames.ReservationHistory,
                        })
                      }
                    >
                      Leave a review
                    </Menu.Item>
                  </Menu>
                </HStack>
                {index !== reservationHistoryQuery.data.length - 1 && (
                  <Divider backgroundColor="gray.100" />
                )}
              </VStack>
            </Pressable>
          ))}
        </VStack>
      )}
    </DashboardLayout>
  );
};

export default ReservationHistoryView;
