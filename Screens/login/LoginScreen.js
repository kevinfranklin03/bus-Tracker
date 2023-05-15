import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import startStyle from '../../screenStyles/loginStyle';
import Background from '../../src/Background';
import {yellow, cream} from '../../src/constants';
import WhiteField from '../../src/WhiteField';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {auth, db} from '../../firebase/firebase.config';
import LoginBtn from '../../src/components/loginBtn';
import {useNavigation} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import {useDispatch} from 'react-redux';
import {setOrigin} from '../../slices/navSlice';

import tw from 'tailwind-react-native-classnames';

const Start = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [seePassword, setSeePassword] = useState(true);
  const [toggle, setToggle] = useState(true);
  console.log(email);

  // Basically it depends on the toggle
  // if the toggle is student / staff then they are logged in
  // if the toggle is driver then the driver logged in

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Authentication using google firebase

  const login = () => {
    if (!email) {
      console.log('invalid Email');
    } else {
      const key = email.match(/^([^@]*)@/)[1];
      dispatch(
        setOrigin({
          id: key,
        }),
      );
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Login Successful');
        toggle
          ? navigation.replace('UserHome')
          : navigation.replace('DriverHome');
      })
      .catch(error => {
        const errorMessage = error.message;
        if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
          alert('Wrong Password');
        } else {
          alert('Check your Email');
        }
      });
  };

  const resetPassword = () => {
    toggle
      ? reset()
      : Alert.alert('RESET PASSWORD', 'Please Contact Your Admin');

    function reset() {
      if (email != null) {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert('Password reset email has been sent successfully');
          })
          .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('Please enter a valid email');
          });
      } else {
        alert('Please enter a valid email');
      }
    }
  };

  // If already logged in
  // Restarting the app will let you in

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        toggle
          ? navigation.replace('UserHome')
          : navigation.replace('DriverHome');
      }
    });
  }, []);

  // styles are done in loginStyle.js

  return (
    <Background>
      <KeyboardAwareScrollView>
        <SafeAreaView style={tw` flex-auto `}>
          <SafeAreaView style={startStyle.container}>
            <Text style={startStyle.text}>Bus Tracker</Text>

            <ToggleSwitch
              isOn={toggle}
              onColor={yellow}
              offColor={yellow}
              label={toggle ? 'Passenger' : 'Driver'}
              labelStyle={{color: 'white', fontWeight: '900', fontSize: 20}}
              size="small"
              onToggle={() => setToggle(!toggle)}
            />

            {
              // Login Screen for Student or a staff
              <SafeAreaView style={startStyle.formBg}>
                <WhiteField
                  placeholder="  Email"
                  onChangeText={text => setEmail(text)}
                />
                <SafeAreaView style={startStyle.password}>
                  <TextInput
                    style={startStyle.passwordInput}
                    placeholder="  Password"
                    placeholderTextColor={'grey'}
                    secureTextEntry={seePassword}
                    onChangeText={text => setPassword(text)}
                  />
                  <TouchableOpacity
                    style={startStyle.wrapperIcon}
                    onPress={() => setSeePassword(!seePassword)}>
                    {seePassword ? (
                      <Image
                        source={require('../../src/assets/images/hide.png')}
                        style={startStyle.wrapperIcon}
                      />
                    ) : (
                      <Image
                        source={require('../../src/assets/images/eye.png')}
                        style={startStyle.wrapperIcon}
                      />
                    )}
                  </TouchableOpacity>
                </SafeAreaView>
                <LoginBtn
                  bgColor={yellow}
                  textColor={cream}
                  btnLabel="Login"
                  Press={() => login()}
                />
                <SafeAreaView>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('RegisterScreen')}>
              <Text style={startStyle.buttonText}>Don't have an account?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('RegisterScreen')
              }></TouchableOpacity>

            <TouchableOpacity onPress={() => resetPassword()}>
              <Text style={startStyle.passwordText}>Forgot your password?</Text>
            </TouchableOpacity>
          </SafeAreaView>
              </SafeAreaView>
            }
          </SafeAreaView>
          
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
};

export default Start;
