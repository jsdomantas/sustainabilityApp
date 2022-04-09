import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const SelectProductsView = () => {
  const { navigate } = useNavigation();
  return (
    <DashboardLayout title="Select possible leftover stock">
      <Text>Test</Text>
      <Button onPress={() => navigate('AdminStack')}>Save</Button>
    </DashboardLayout>
  );
};

export default SelectProductsView;
