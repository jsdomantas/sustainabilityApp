import React from 'react';
import {
  Box,
  VStack,
  Button,
  StatusBar,
  Center,
  Stack,
  Text,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '../constants/RouteNames';

export default function Splash() {
  const { navigate } = useNavigation();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box safeAreaTop bg="primary.900" />
      <Center my="auto" bg="primary.900" flex="1" p={{ md: 8 }}>
        <Stack
          flexDirection={{ base: 'column', md: 'row' }}
          w="100%"
          maxW={{ md: '1016px' }}
          flex={{ base: '1', md: undefined }}
        >
          <Center w="100%" flex={1}>
            <Box
              maxW="500"
              w="100%"
              px={{
                base: '4',
                md: '20',
              }}
              py={{
                base: '8',
                md: '32',
              }}
              rounded={{ md: 'xl' }}
              bg={{ md: 'primary.800' }}
            >
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color="white"
                textAlign="center"
                mb={5}
              >
                Reduce food waste
              </Text>
              <VStack space="4">
                <Button
                  testID="loginBtn"
                  py="4"
                  onPress={() => {
                    navigate(RouteNames.Login);
                  }}
                  _text={{
                    color: 'primary.900',
                    letterSpacing: 2,
                  }}
                  _hover={{ bg: 'coolGray.200' }}
                  bg="coolGray.100"
                >
                  LOGIN
                </Button>
                <Button
                  testID="signupBtn"
                  py="4"
                  _text={{
                    color: 'coolGray.50',
                    letterSpacing: 2,
                  }}
                  onPress={() => {
                    navigate(RouteNames.Signup);
                  }}
                  variant="outline"
                  colorScheme="coolGray"
                  borderColor="coolGray.400"
                >
                  SIGN UP
                </Button>
              </VStack>
            </Box>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
