import React, { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Icon,
  Pressable,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import DashboardLayout from '../layouts/DashboardLayout';
import { Ionicons } from '@expo/vector-icons';
import { useLeaveReviewMutation } from '../queries';
import { useNavigation } from '@react-navigation/native';

const ClientRatingView = ({
  route: {
    params: { offerId, receiverId, navigateToAfterSaving },
  },
}) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');

  const leaveReviewMutation = useLeaveReviewMutation();

  const { navigate } = useNavigation();

  return (
    <DashboardLayout title="Feedback">
      <VStack
        px={4}
        _light={{
          bg: { md: 'white', base: 'white' },
          borderColor: 'coolGray.200',
        }}
        mt={4}
        flex="1"
      >
        <RatingStars
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
        <FeedbackInput onChangeText={setComment} />
        <Button
          mt={{ md: '8' }}
          mb={4}
          _light={{ bg: 'primary.900' }}
          mx={{ base: '4', md: '0' }}
          _text={{ fontWeight: 'medium' }}
          isLoading={leaveReviewMutation.isLoading}
          onPress={() => {
            leaveReviewMutation.mutate(
              {
                receiverId,
                offerId,
                review: { rating: selectedRating, comment },
              },
              {
                onSuccess: () => {
                  navigate(navigateToAfterSaving || 'Home');
                },
              },
            );
          }}
        >
          Submit
        </Button>
      </VStack>
    </DashboardLayout>
  );
};

function FeedbackInput({ onChangeText }) {
  return (
    <Box _light={{ bg: 'white' }} flex={1}>
      <Text _light={{ color: 'coolGray.800' }} fontWeight="bold" fontSize="md">
        Share your experience
      </Text>
      <TextArea
        testID="feedbackInput"
        _focus={{
          _light: { borderColor: 'coolGray.400' },
        }}
        h="40"
        mt="4"
        onChangeText={text => onChangeText(text)}
        fontSize="sm"
        _light={{ color: 'coolGray.500' }}
        placeholder="Would you like to add anything?"
      />
    </Box>
  );
}

function RateStar({ isSelected, onPress, testID }) {
  const handlePress = onPress;

  if (isSelected) {
    return (
      <Pressable onPress={handlePress} testID={testID}>
        <Icon size="5" color="yellow.400" as={Ionicons} name={'ios-star'} />
      </Pressable>
    );
  } else {
    return (
      <Pressable onPress={handlePress} testID={testID}>
        <Icon
          size="5"
          color="coolGray.400"
          as={Ionicons}
          name={'md-star-outline'}
        />
      </Pressable>
    );
  }
}

function RatingStars({ selectedRating, setSelectedRating }) {
  return (
    <Box _light={{ bg: 'white' }}>
      <Text _light={{ color: 'coolGray.800' }} fontWeight="bold" fontSize="md">
        Rate your experience
      </Text>

      <HStack mt="4" alignItems="center" space={6}>
        {[1, 2, 3, 4, 5].map(item => {
          return (
            <RateStar
              testID={`star-${item}`}
              key={item}
              isSelected={selectedRating >= item}
              onPress={() => setSelectedRating(item)}
            />
          );
        })}
      </HStack>
      <Text my="3" _light={{ color: 'coolGray.400' }}>
        Tap the stars
      </Text>
    </Box>
  );
}

export default ClientRatingView;
