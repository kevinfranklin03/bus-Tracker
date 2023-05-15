import * as React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import registerStyle from '../../screenStyles/registerStyle';
import Background from '../../src/Background';
import {yellow} from '../../src/constants';
import ToggleSwitch from 'toggle-switch-react-native';
import FormStyle from '../../screenStyles/formStyle';
import {useNavigation} from '@react-navigation/native';
import WhiteField from '../../src/WhiteField';
// import SmallBtn from '../../src/components/SmallBtn';
import LoginBtn from '../../src/components/loginBtn';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {db, auth} from '../../firebase/firebase.config';
import {ref, set} from '@firebase/database';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import tw from 'tailwind-react-native-classnames'

const RegisterScreen = props => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [seePassword, setSeePassword] = useState(true);
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [busRoute, setBusRoute] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggle, setToggle] = useState(true);

  // Basically it depends on the toggle
  // if the toggle is student / staff then their details are collected
  // if the toggle is driver then the driver details are collected

  const navigation = useNavigation();

  // Email and password validation:

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    return null;
  };

  const handleLogin = () => {
    const checkPassword = checkPasswordValidity(password);
    if (!checkPassword && password === confirmPassword) {
      signup();
    
    } else if (password !== confirmPassword) {
      alert('Password does not match');
    } else {
      alert(checkPassword);
    }
  };

  // Authenticate using firebase

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('user created successfully');
        navigation.replace('Login');a
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  // Store user data in database

  function saveData() {
    // Generate Random key to have unique id
    const newKey = email.match(/^([^@]*)@/)[1];

    set(ref(db, toggle ? 'passenger/' + newKey : 'driver/' + newKey), {
      fullName,
      email,
      mobile,
      age,
      busRoute
    })
      .then(() => {
        // Data saved successfully
        console.log('data saved');
      })
      .catch(error => {
        // failed
        console.log(error);
      });
  }

  return (
    <Background>
      <KeyboardAwareScrollView>
        <SafeAreaView style={[tw`pt-10`,registerStyle.container]}>
          <ToggleSwitch
            isOn={toggle}
            onColor={yellow}
            offColor={yellow}
            label={toggle ? 'Driver ?' : 'Passenger?'}
            labelStyle={{color: 'white', fontWeight: '900', fontSize: 20}}
            size="small"
            onToggle={() => setToggle(!toggle)}
          />

          {
            // STUDENT REGISTRATION

            toggle ? (
              <SafeAreaView style={FormStyle.container}>
                <Text style={FormStyle.title}>Passenger</Text>
                <SafeAreaView style={FormStyle.formBgStudent}>
                  <Text style={FormStyle.formTitle}>Create an Account</Text>
                  <WhiteField
                    placeholder="  Full Name"
                    onChangeText={text => setFullName(text)}
                  />
                  <WhiteField
                    placeholder="  Mobile"
                    keyboardType={'number-pad'}
                    onChangeText={text => setMobile(text)}
                  />
                  <WhiteField
                    placeholder="  Email"
                    keyboardType={'email-address'}
                    onChangeText={text => handleCheckEmail(text)}
                  />
                  {checkValidEmail ? (
                    <Text style={FormStyle.invalid}>invalid email</Text>
                  ) : (
                    ''
                  )}
                  <SafeAreaView style={FormStyle.password}>
                    <TextInput
                      style={FormStyle.passwordInput}
                      placeholder="  Password"
                      placeholderTextColor={'grey'}
                      secureTextEntry={seePassword}
                      onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity
                      style={FormStyle.wrapperIcon}
                      onPress={() => setSeePassword(!seePassword)}>
                      {seePassword ? (
                        <Image
                          source={require('../../src/assets/images/hide.png')}
                          style={FormStyle.wrapperIcon}
                        />
                      ) : (
                        <Image
                          source={require('../../src/assets/images/eye.png')}
                          style={FormStyle.wrapperIcon}
                        />
                      )}
                    </TouchableOpacity>
                  </SafeAreaView>
                  <WhiteField
                    placeholder="  Re-enter Password"
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPassword(text)}
                  />
                  {email == '' ||
                  password == '' ||
                  checkValidEmail ||
                  confirmPassword == '' ||
                  mobile == '' ||
                  (fullName == '') == true ? (
                    <TouchableOpacity
                      disabled
                      style={{
                        backgroundColor: 'grey',
                        borderRadius: 100,
                        alignItems: 'center',
                        width: 120,
                        paddingVertical: 6,
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 17,
                          fontWeight: 'bold',
                        }}>
                        {'Register'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <LoginBtn
                      bgColor={yellow}
                      textColor="white"
                      btnLabel={'Register'}
                      Press={() => {
                        handleLogin();
                        saveData();
                      }}
                    />
                  )}
                </SafeAreaView>
              </SafeAreaView>
            ) : (
              // DRIVER REGISTRATION

              <SafeAreaView style={FormStyle.container}>
                <Text style={FormStyle.title}>Driver Register</Text>
                <SafeAreaView style={FormStyle.formBgDriver}>
                  <Text style={FormStyle.formTitle}>Create an Account</Text>
                  <WhiteField
                    placeholder="  Full Name"
                    onChangeText={text => setFullName(text)}
                  />
                  <WhiteField
                    placeholder="  Mobile"
                    keyboardType={'number-pad'}
                    onChangeText={text => setMobile(text)}
                  />
                  <WhiteField
                    placeholder="  Email"
                    keyboardType={'email-address'}
                    onChangeText={text => handleCheckEmail(text)}
                  />
                  <SafeAreaView style={FormStyle.smallContainer}>
                    <TextInput
                      style={FormStyle.age}
                      placeholder="  Age"
                      placeholderTextColor="grey"
                      onChangeText={text => setAge(text)}
                    />
                    <TextInput
                      style={FormStyle.age}
                      placeholder="  Bus route"
                      placeholderTextColor="grey"
                      onChangeText={text => setBusRoute(text)}
                    />
                  </SafeAreaView>
                  <WhiteField
                    placeholder="  Email"
                    keyboardType={'email-address'}
                    onChangeText={text => handleCheckEmail(text)}
                  />
                  {checkValidEmail ? (
                    <Text style={FormStyle.invalid}>invalid email</Text>
                  ) : (
                    ''
                  )}
                  <SafeAreaView style={FormStyle.password}>
                    <TextInput
                      style={FormStyle.passwordInput}
                      placeholder="  Password"
                      placeholderTextColor={'grey'}
                      secureTextEntry={seePassword}
                      onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity
                      style={FormStyle.wrapperIcon}
                      onPress={() => setSeePassword(!seePassword)}>
                      {seePassword ? (
                        <Image
                          source={require('../../src/assets/images/hide.png')}
                          style={FormStyle.wrapperIcon}
                        />
                      ) : (
                        <Image
                          source={require('../../src/assets/images/eye.png')}
                          style={FormStyle.wrapperIcon}
                        />
                      )}
                    </TouchableOpacity>
                  </SafeAreaView>
                  <WhiteField
                    placeholder="  Re-enter Password"
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPassword(text)}
                  />
                  {email == '' ||
                  password == '' ||
                  checkValidEmail ||
                  fullName == '' ||
                  (mobile == '') == true ? (
                    <TouchableOpacity
                      disabled
                      style={{
                        backgroundColor: 'grey',
                        borderRadius: 100,
                        alignItems: 'center',
                        width: 120,
                        paddingVertical: 6,
                        marginVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 17,
                          fontWeight: 'bold',
                        }}>
                        {'Register'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <LoginBtn
                      bgColor={yellow}
                      textColor="white"
                      btnLabel={'Register'}
                      Press={() => {
                        handleLogin();
                        saveData();
                      }}
                    />
                  )}
                </SafeAreaView>
              </SafeAreaView>
            )
          }
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </Background>
  );
};

export default RegisterScreen;
