import React, { useCallback, useMemo, useRef, useState } from 'react';

import { StyleSheet, TextInput } from 'react-native';
import {
  Button,
  Colors,
  DateTimePicker,
  Picker,
  Text,
  View,
} from 'react-native-ui-lib';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../../constants/RouteNames';
import { addSeconds, format, getTime } from 'date-fns';
import { useAddPantryItemMutation } from './queries/queries';
import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

const PantryItemBottomSheet = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [formData, setFormData] = useState<{
    title: string | null;
    quantity: number | null;
    expiration_date: string | null;
    pantry_category_id: number | null;
  }>({
    title: null,
    quantity: null,
    expiration_date: null,
    pantry_category_id: null,
  });

  const addPantryItemMutation = useAddPantryItemMutation();

  const snapPoints = useMemo(() => ['25%', '65%'], []);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        navigation.goBack();
      }
      console.log('handleSheetChanges', index);
    },
    [navigation],
  );

  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const tenSecondsFromNowOn = getTime(addSeconds(new Date(), 10));

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: tenSecondsFromNowOn,
    };

    // Display a notification
    await notifee.createTriggerNotification(
      {
        title: 'Notification Title',
        body: 'Main body content of the notification',
        android: {
          channelId,
        },
      },
      trigger,
    );
  }

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text text50 marginB-24>
            Add new item
          </Text>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Rice"
            onChangeText={text => setFormData({ ...formData, title: text })}
          />
          <Text style={styles.inputLabel}>Quantity (grams)</Text>
          <TextInput
            style={styles.input}
            placeholder="300"
            keyboardType={'number-pad'}
            onChangeText={text => setFormData({ ...formData, quantity: +text })}
          />
          <Text style={styles.inputLabel}>Category</Text>
          <Picker
            placeholder="Fridge"
            value={formData.pantry_category_id}
            onChange={selection =>
              setFormData({ ...formData, pantry_category_id: selection.value })
            }
          >
            <Picker.Item key={1} value={1} label="Fridge" />
            <Picker.Item key={2} value={2} label="Freezer" />
            <Picker.Item key={3} value={3} label="Dry pantry" />
          </Picker>
          <Text style={styles.inputLabel}>Expiration date</Text>
          <DateTimePicker
            onChange={date =>
              setFormData({
                ...formData,
                expiration_date: format(date, 'yyyy-MM-dd'),
              })
            }
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 16,
              right: 16,
              paddingBottom: 30,
            }}
          >
            <Button
              outline={true}
              style={{ marginBottom: 16 }}
              label="Scan barcode"
              onPress={() => {
                navigation.goBack();
                // @ts-ignore
                navigation.navigate(RouteNames.BarcodeScanner);
              }}
            />
            <Button
              label="Save"
              onPress={() => {
                addPantryItemMutation.mutate(formData, {
                  onSuccess: () => {
                    navigation.goBack();
                    onDisplayNotification();
                  },
                });
              }}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default PantryItemBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.grey50,
    marginBottom: 22,
  },
});
