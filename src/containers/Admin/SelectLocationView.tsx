import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import MapView, { Region } from 'react-native-maps';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

const SelectLocationView = ({
  route: {
    params: { coordinates, navigateToAfterSaving = 'AddFoodCollection' },
  },
}) => {
  const { navigate } = useNavigation();

  const [selectedRegion, setSelectedRegion] = useState<Region>(
    coordinates
      ? coordinates
      : {
          latitudeDelta,
          longitudeDelta,
          latitude: 25.1948475,
          longitude: 55.2682899,
        },
  );

  const onRegionChange = (region: Region) => {
    setSelectedRegion(region);
  };

  return (
    <DashboardLayout title="Select location">
      <MapView
        initialRegion={selectedRegion}
        style={{ flex: 1 }}
        onRegionChangeComplete={onRegionChange}
      />
      <View style={styles.markerFixed}>
        <Image
          source={require('../Map/components/IconRestaurant.png')}
          style={{ height: 35, width: 35 }}
          alt="Alternate Text"
        />
      </View>
      <Button
        style={{
          position: 'absolute',
          left: 32,
          right: 32,
          bottom: 170,
        }}
        onPress={() =>
          navigate(
            navigateToAfterSaving ? navigateToAfterSaving : 'AddFoodCollection',
            { coordinates: selectedRegion },
          )
        }
      >
        Save
      </Button>
      <SafeAreaView style={styles.footer}>
        <Text style={styles.region}>
          {JSON.stringify(selectedRegion, null, 2)}
        </Text>
      </SafeAreaView>
    </DashboardLayout>
  );
};

export default SelectLocationView;

const styles = StyleSheet.create({
  markerFixed: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -12,
    marginTop: -56,
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});
