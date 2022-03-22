import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Text } from 'react-native-ui-lib';
import { useGetScannedItemMutation } from './queries/queries';

const BarcodeScannerView = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState('');

  const scannedItemQuery = useGetScannedItemMutation();

  const isProductFound = scannedItemQuery.data?.data.status === 1;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setBarcode(data);
    scannedItemQuery.mutate(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, paddingBottom: 30 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 2 }}
      />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text
          text50L
          style={{ marginTop: 12 }}
        >{`Scanned barcode: ${barcode}`}</Text>
        {scanned && (
          <>
            {isProductFound ? (
              <Text text50L marginT-10>
                {`Found item: ${scannedItemQuery.data?.data.product.product_name}
                `}
              </Text>
            ) : (
              <Text text50L marginT-10>
                Could not find such item.
              </Text>
            )}
            <Button
              style={{ marginTop: 'auto' }}
              label={'Tap to scan again'}
              onPress={() => {
                setScanned(false);
                setBarcode('');
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default BarcodeScannerView;
