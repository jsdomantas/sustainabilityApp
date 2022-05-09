import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MaterialIcons } from '@expo/vector-icons';
import FloatingActionButton from '../../components/FloatingActionButton';
import { useNavigation } from '@react-navigation/native';
import { useFoodCollectionsQuery } from './queries';
import { ActivityIndicator } from 'react-native';

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
          >
            {title}
          </Text>
          <Text
            fontSize="sm"
            _light={{ color: 'coolGray.500' }}
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
