import React, { useState } from 'react';
import {
  Button,
  HStack,
  VStack,
  Text,
  Link,
  useColorModeValue,
  IconButton,
  Icon,
  Hidden,
} from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import GuestLayout from '../../layouts/GuestLayout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation, useProfileQuery } from './queries';
import { RouteNames } from '../../constants/RouteNames';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../state/user/userSlice';

export function SignInForm() {
  const [text, setText] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = React.useState(false);

  const dispatch = useDispatch();
  const loginMutation = useLoginMutation();
  const profileQuery = useProfileQuery();
  const { navigate } = useNavigation();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={{ flex: 1 }}
    >
      <VStack
        px="6"
        py="9"
        flex="1"
        space="3"
        _light={{ bg: 'white' }}
        justifyContent="space-between"
        borderTopLeftRadius={{ base: '2xl', md: '0' }}
        borderTopRightRadius={{ base: '2xl', md: 'xl' }}
        borderBottomRightRadius={{ base: '0', md: 'xl' }}
      >
        <VStack space="7">
          <Hidden till="md">
            <Text fontSize="lg" fontWeight="normal" letterSpacing="1">
              Sign in to continue!
            </Text>
          </Hidden>
          <VStack>
            <VStack space="3">
              <VStack space="4">
                <FloatingLabelInput
                  testID="usernameInput"
                  py="3"
                  isRequired
                  label="Email"
                  labelColor="#9CA3AF"
                  labelBGColor={useColorModeValue('#fff', '#1F2937')}
                  borderRadius="4"
                  defaultValue={text}
                  onChangeText={(txt: string) => setText(txt)}
                  fontWeight="semibold"
                  _text={{
                    fontSize: 'sm',
                    fontWeight: 'semibold',
                  }}
                  _light={{
                    borderColor: 'coolGray.300',
                  }}
                />
                <FloatingLabelInput
                  testID="passwordInput"
                  py="3"
                  isRequired
                  type={showPass ? '' : 'password'}
                  label="Password"
                  borderRadius="4"
                  labelColor="#9CA3AF"
                  labelBGColor={useColorModeValue('#fff', '#1F2937')}
                  defaultValue={pass}
                  onChangeText={(txt: string) => setPass(txt)}
                  fontWeight="semibold"
                  InputRightElement={
                    <IconButton
                      mr="1"
                      variant="unstyled"
                      icon={
                        <Icon
                          size="4"
                          color="coolGray.400"
                          as={Entypo}
                          name={showPass ? 'eye' : 'eye-with-line'}
                        />
                      }
                      onPress={() => {
                        setShowPass(!showPass);
                      }}
                    />
                  }
                  _text={{
                    fontSize: 'sm',
                    fontWeight: 'medium',
                  }}
                  _light={{
                    borderColor: 'coolGray.300',
                  }}
                />
              </VStack>
              <Button
                testID="submitBtn"
                onPress={() =>
                  loginMutation.mutate({
                    email: text,
                    password: pass,
                    callback: () => {
                      profileQuery
                        .refetch()
                        .then(r => dispatch(setProfile(r.data)));
                    },
                  })
                }
                mt="5"
                size="md"
                py="3"
                borderRadius="4"
                _text={{
                  fontWeight: 'medium',
                }}
                _light={{
                  bg: 'primary.900',
                }}
              >
                SIGN IN
              </Button>
            </VStack>
          </VStack>
        </VStack>
        <HStack
          space="1"
          safeAreaBottom
          alignItems="center"
          justifyContent="center"
          mt={{ base: 'auto', md: '8' }}
        >
          <Text _light={{ color: 'coolGray.800' }}>Don't have an account?</Text>
          <Link
            onPress={() => navigate(RouteNames.Signup)}
            _text={{
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
            _light={{
              _text: {
                color: 'primary.900',
              },
            }}
          >
            Sign up
          </Link>
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
export default function SignIn() {
  const { navigate } = useNavigation();
  return (
    <GuestLayout>
      <Hidden from="md">
        <VStack px="4" mt="4" mb="5" space="9">
          <HStack space="2" alignItems="center">
            <IconButton
              variant="unstyled"
              pl="0"
              onPress={() => {
                navigate(RouteNames.Splash);
              }}
              icon={
                <Icon
                  size="6"
                  as={AntDesign}
                  name="arrowleft"
                  color="coolGray.50"
                />
              }
            />
            <Text color="coolGray.50" fontSize="lg">
              Sign In
            </Text>
          </HStack>
          <VStack space="2">
            <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
              Welcome back,
            </Text>
            <Text
              fontSize="md"
              fontWeight="normal"
              _light={{
                color: 'primary.300',
              }}
            >
              Sign in to continue
            </Text>
          </VStack>
        </VStack>
      </Hidden>
      <SignInForm />
    </GuestLayout>
  );
}
