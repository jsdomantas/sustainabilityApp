import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Text } from 'native-base';
import { useReservationHistoryQuery } from './queries';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ReservationHistoryView = () => {
  const { navigate } = useNavigation();
  const reservationHistoryQuery = useReservationHistoryQuery();

  return (
    <DashboardLayout title="History" onPressBack={() => navigate('More')}>
      {reservationHistoryQuery.isLoading ? (
        <ActivityIndicator />
      ) : (
        reservationHistoryQuery.data.map(item => (
          <Text key={item.id}>{item.title}</Text>
        ))
      )}
    </DashboardLayout>
  );
};

export default ReservationHistoryView;
