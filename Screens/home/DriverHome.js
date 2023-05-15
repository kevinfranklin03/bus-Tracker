import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import SmallBtn from '../../src/components/SmallBtn';
import LogOutIcon from 'react-native-vector-icons/Feather';
import {getAuth, signOut} from 'firebase/auth';
import {onValue, ref, set} from '@firebase/database';
import {useNavigation} from '@react-navigation/native';
import {db, auth} from '../../firebase/firebase.config';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../../slices/navSlice';
import {
  locationPermission,
  getCurrentLocation,
} from '../../src/helper/helperFunction'
import tw from 'tailwind-react-native-classnames'

const DriverHome = () => {
  const navigation = useNavigation();

  const origin = useSelector(selectOrigin);
  const markerRef = useRef();
  const [message, setMessage] = useState(null);
  const [welcome, setWelcome] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const  [bus, setBus] = useState('');
  // console.log(bus)
  const [state, setState] = useState({
    curLoc: {
      latitude: '',
      longitude: '',
      latitudeDelta: 0.005,
      longitudeDelta: 0.0,
    },
    isLoading: false,
    coordinate:{
      latitude: '',
      longitude: '',
      latitudeDelta: 0.005,
      longitudeDelta: 0.0,
    }

  })
    // send driver's location

  const {curLoc } = state;
  console.log(curLoc)
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();

    // create smooth animated tracking based on the OS

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };
    // get location permission from user
    // if location granted

    if (locPermissionDenied) {
      const {latitude, longitude} = await getCurrentLocation();
            animate(latitude, longitude);
      updateState({
        curLoc: {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        coordinate:{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.0,
        },
      });
      
    }else {
      console.log('error')
    }
  };

  


  // // track live location every 3 seconds

  useEffect(() => {
    
    const interval = setInterval(() => {
      getLiveLocation();
    }, 3000);
    return () => clearInterval(interval);
  })


  // get user name from the database
  // console.log('this is bus from outside ', routeNo)


  useEffect( () => {

    const starCountRef =  ref(db, 'driver/' + origin.id);
     onValue(starCountRef, async snapshot => {
      const data = await snapshot.val();
      if (data == null) {
        alert("invalid login", signOutUser())
       } else {
    
      const name = data.fullName;
      const age = data.age;
      const busRoute = data.busRoute;
      const mobile = data.mobile;

      setWelcome(name);
      setAge(age);
      setBus(busRoute);
      setMobile(mobile);
       }
    });
  }, []);


  function saveData() {
    // Generate Random key to have unique id
    const newKey = (+new Date() * Math.random()).toString(36).substring(0, 6);

    set(ref(db, 'messages/' + newKey), {
      message: message,
    })
      .then(() => {
        // Data saved successfully
        alert('Message sent to all passengers');
      })
      .catch(error => {
        // failed
        console.log(error);
      });
  }

  // get driver details from firebase

  signOutUser = () => {
    signOut(auth)
      .then(function () {
        console.log('success');
        navigation.replace('Login');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
var route = bus

    useEffect(()=> { 
     
        console.log(route)
        console.log('route', bus)
        set(ref(db, 'busDetails/' + `${route}/` + 'location'), {
          curLoc
        }).then(() => {
          // Data saved successfully
          // console.log('data saved for location');
        })
        .catch(error => {
          // failed
          console.log(error);
        });
  
  }, [state]) 
     
  
  return (
    <SafeAreaView style={[tw`pt-10`,styles.container]}>
      <SafeAreaView style={styles.navbar}>
        <SafeAreaView style={styles.top}>
          <Text style={styles.welcome}>
            Welcome, {welcome == null ? 'Loading...' : welcome}
          </Text>
          <TouchableOpacity onPress={() => this.signOutUser()}>
            <LogOutIcon name="log-out" size={30} color={'#fff'} />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView>
          <Text style={styles.subHeading}>Your Details:</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.bottom}>
          <Text style={styles.details}>Name: {welcome}</Text>
          <Text style={styles.details}>Mobile: {mobile}</Text>
          <Text style={styles.details}>Bus Route No: {bus}</Text>
          <Text style={styles.details}>Age: {age}</Text>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.message}>
        <Text style={styles.subHeading}>Send Alert Message :</Text>
        <SafeAreaView style={styles.alert}>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholder="Start typing..."
            placeholderTextColor={'grey'}
            onChangeText={text => setMessage(text)}
          />
        </SafeAreaView>
        <SmallBtn
          bgColor={'white'}
          textColor={'black'}
          btnLabel={'Send'}
          Press={saveData}
        />
        <Text style={styles.details}>
          * While Sending Message, Please Specify the Bus Number.
        </Text>
        <Text style={styles.details}>
          * If you face any issue with the app, Please contact the admin.
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default DriverHome;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fcfffd',
    alignItems: 'center',
  },
  navbar: {
    height: '32%',
    width: '90%',
    backgroundColor: '#f6b756',
    borderRadius: 20,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#4a686a',
    height: '23%',
    paddingLeft: 10,
    paddingRight: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  welcome: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'black',
    paddingRight: 20,
  },
  subHeading: {
    fontSize: 22,
    color: '#4a686a',
    fontWeight: '700',
    width: '100%',
    height: 50,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 15,
  },
  details: {
    fontSize: 20,
    color: 'white',
    width: '100%',
    textAlign: 'left',
    paddingLeft: 15,
    paddingBottom: 6,
  },
  message: {
    alignItems: 'center',
    top: 30,
    height: '62%',
    width: '90%',
    backgroundColor: '#f6b756',
    borderRadius: 20,
  },
  alert: {
    top: 10,
    height: '50%',
    width: '90%',
    backgroundColor: '#f6f8e1',
    borderRadius: 20,
    marginBottom: 30,
  },
  input: {
    fontSize: 20,
    padding: 20,
    color: 'black',
  },
});
