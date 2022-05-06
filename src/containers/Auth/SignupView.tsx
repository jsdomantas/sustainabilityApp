import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  HStack,
  VStack,
  Text,
  Link,
  Icon,
  IconButton,
  useColorModeValue,
  Pressable,
  Hidden,
} from 'native-base';
import { AntDesign, Entypo } from '@expo/vector-icons';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GuestLayout from '../../layouts/GuestLayout';
import { useNavigation } from '@react-navigation/native';
import notifee, { IOSAuthorizationStatus } from '@notifee/react-native';
import { RouteNames } from '../../constants/RouteNames';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [confirm_pass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  const { navigate } = useNavigation();

  async function requestUserPermission() {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  }

  useEffect(() => {
    requestUserPermission().then();
  }, []);

  return (
    <GuestLayout>
      <VStack px="4" mt="4" mb="5" space="9">
        <Pressable onPress={() => navigate(RouteNames.Splash)}>
          <Icon size="6" as={AntDesign} name="arrowleft" color="coolGray.50" />
        </Pressable>
        <VStack space="2">
          <Text fontSize="3xl" fontWeight="bold" color="coolGray.50">
            Welcome
          </Text>
          <Text
            fontSize="md"
            fontWeight="normal"
            _light={{
              color: 'coolGray.50',
            }}
          >
            Sign up to continue
          </Text>
        </VStack>
      </VStack>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{ flex: 1 }}
      >
        <VStack
          flex="1"
          px="6"
          py="9"
          _light={{ bg: 'white' }}
          justifyContent="space-between"
          space="3"
          borderTopRightRadius={{ base: '2xl', md: 'xl' }}
          borderBottomRightRadius={{ base: '0', md: 'xl' }}
          borderTopLeftRadius={{ base: '2xl', md: '0' }}
        >
          <VStack space="7">
            <Hidden till="md">
              <Text fontSize="lg" fontWeight="normal">
                Sign up to continue!
              </Text>
            </Hidden>
            <VStack>
              <VStack space="8">
                <VStack space="4">
                  <FloatingLabelInput
                    testID="emailInput"
                    py="3"
                    isRequired
                    label="Email"
                    labelColor="#9CA3AF"
                    labelBGColor={useColorModeValue('#fff', '#1F2937')}
                    borderRadius="sm"
                    defaultValue={email}
                    onChangeText={(txt: string) => setEmail(txt)}
                    _text={{
                      fontSize: 'sm',
                      fontWeight: 'medium',
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
                    defaultValue={password}
                    onChangeText={(txt: string) => setPassword(txt)}
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
                  <FloatingLabelInput
                    testID="confirmPasswordInput"
                    py="3"
                    isRequired
                    type={showConfirmPass ? '' : 'password'}
                    label="Confirm Password"
                    borderRadius="4"
                    labelColor="#9CA3AF"
                    labelBGColor={useColorModeValue('#fff', '#1F2937')}
                    defaultValue={confirm_pass}
                    onChangeText={(txt: string) => setConfirmPass(txt)}
                    InputRightElement={
                      <IconButton
                        variant="unstyled"
                        mr="1"
                        icon={
                          <Icon
                            size="4"
                            color="coolGray.400"
                            as={Entypo}
                            name={showConfirmPass ? 'eye' : 'eye-with-line'}
                          />
                        }
                        onPress={() => {
                          setShowConfirmPass(!showConfirmPass);
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
                <Checkbox
                  testID="checkbox"
                  value="isBusiness"
                  _light={{
                    // @ts-ignore
                    _checked: { bg: 'primary.900' },
                  }}
                  isChecked={isBusiness}
                  onChange={isSelected => setIsBusiness(isSelected)}
                  accessibilityLabel="Remember me"
                >
                  <Text fontSize="sm" color="coolGray.800" pl="2">
                    I am a business owner
                  </Text>
                </Checkbox>
                <Button
                  testID="submitBtn"
                  onPress={() => {
                    if (isBusiness) {
                      navigate(RouteNames.AdminOnboarding, {
                        credentials: {
                          email,
                          password,
                          isBusinessAccount: true,
                        },
                      });
                    } else {
                      navigate(RouteNames.CreateUserProfile, {
                        credentials: {
                          email,
                          password,
                        },
                      });
                    }
                  }}
                  size="md"
                  py="3"
                  borderRadius="sm"
                  _light={{
                    bg: 'primary.900',
                  }}
                >
                  SIGN UP
                </Button>
              </VStack>
            </VStack>
          </VStack>
          <HStack
            space="1"
            alignItems="center"
            justifyContent="center"
            mt={{ base: 'auto', md: '8' }}
          >
            <Text fontSize="sm" color="coolGray.500">
              Already have an account?
            </Text>
            <Link
              onPress={() => navigate(RouteNames.Login)}
              _text={{
                fontSize: 'sm',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
              _light={{
                _text: {
                  color: 'primary.900',
                },
              }}
            >
              Sign in
            </Link>
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>
    </GuestLayout>
  );
}
