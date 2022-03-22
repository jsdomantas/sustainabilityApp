import React from 'react';

import MapView, { Marker } from 'react-native-maps';

const LocationsMapView = () => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{ longitude: -122.43, latitude: 37.78 }}
        title="Test"
        description="Testing"
      />
    </MapView>
  );
};

export default LocationsMapView;
