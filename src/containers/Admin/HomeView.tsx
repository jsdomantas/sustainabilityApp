import { HStack, Icon, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MaterialIcons } from '@expo/vector-icons';
import FloatingActionButton from '../../components/FloatingActionButton';
import { useNavigation } from '@react-navigation/native';

type OptionItemProps = {
  title: string;
  defaultOption: string;
};

function OptionItem({ title, defaultOption }: OptionItemProps) {
  return (
    <Pressable>
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
  return (
    <>
      <DashboardLayout
        title="Food collections"
        mobileHeader={{ backButton: false }}
      >
        <VStack px={4} space={4} mt={4}>
          <Text
            _light={{ color: 'coolGray.800' }}
            fontSize="md"
            fontWeight="semibold"
          >
            Active
          </Text>
          <VStack space={2}>
            <OptionItem
              title="Charity 1"
              defaultOption="Started at 2022-03-30"
            />
            <OptionItem
              title="Charity 2"
              defaultOption="Started at 2022-03-31"
            />
            <OptionItem
              title="Charity 3"
              defaultOption="Started at 2022-04-01"
            />
          </VStack>
          <Text
            _light={{ color: 'coolGray.800' }}
            fontSize="md"
            fontWeight="semibold"
          >
            Completed
          </Text>
          <VStack space={2}>
            <OptionItem
              title="Charity 0"
              defaultOption="Completed at 2022-03-28"
            />
          </VStack>
        </VStack>
      </DashboardLayout>
      <FloatingActionButton onPress={() => navigate('AddFoodCollection')} />
    </>
  );
};

export default HomeView;
