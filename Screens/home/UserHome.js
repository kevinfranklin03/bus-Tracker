import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ChooseLocation from '../../src/components/ChooseLocation';
import SearchBtn from '../../src/components/SearchBtn';
import MapView from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import {auth, db} from '../../firebase/firebase.config';
import {signOut} from 'firebase/auth';
import {onValue, ref} from '@firebase/database';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../../slices/navSlice';
import tw from 'tailwind-react-native-classnames'

function UserHome() {
  const origin = useSelector(selectOrigin);
  const [next, setNext] = useState(0);
  const [welcome, setWelcome] = useState('');
  const [allAreas, setAllAreas] = useState([])
  const navigation = useNavigation();

  const onPressLocation = () => {

    navigation.navigate('MapPage');
  };

  // get all areas
  // useEffect(() => {
  //   const starCountRef = ref(db, 'bus/');
  //   onValue(starCountRef, snapshot => {
  //     const data = snapshot.val();
  //   //  const areas = 
  //   const newPosts = Object.keys(data).map(key => ({
  //     id: key,
  //     ...data[key],
  //   }));
  //   console.log(newPosts.)
  //   });
  // }, []);
  // Welcome name

  useEffect(() => {
    const starCountRef = ref(db, 'passenger/' + origin.id);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();

      if (data == null) {
        name = 'Loading...';
      } else {
        name = data.fullName;
      }

      setWelcome(name);
    });
  }, []);

  // Load Alert Message
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, 'messages/');
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      setMessage(newPosts);
    });
  }, []);

  const messageLength = message.length;

  function nextMessage() {
    if (next < messageLength - 1) {
      setNext(next + 1);
    } else {
      console.log('no more messages');
    }
  }

  // Previous message

  function previousMessage() {
    if (next >= 1) {
      setNext(next - 1);
    } else {
      console.log('no more messages');
    }
  }


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


  function display() {
    if (message.length == 0) {
      return 'Loading...';
    } else {
      return message[next].message;
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled={false}
      behavior="height">
      <SafeAreaView style={styles.navbar}>
        <SafeAreaView style={styles.top}>
          <Text style={styles.welcome}>
            Welcome, {welcome == null ? 'Loading...' : welcome}
          </Text>
   
          <TouchableOpacity onPress={() => this.signOutUser()}>
            <Icon name="log-out" size={30} color={'#fff'} />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={styles.autocomplete}>
          <ChooseLocation />
        </SafeAreaView>
        <SafeAreaView style={styles.bottom}>
          <TextInput
            style={styles.input}
            placeholder="Sathyabama, Chennai"
            placeholderTextColor={'grey'}
            editable={false}
          />
          <SearchBtn
            textColor={'black'}
            btnLabel={'Search'}
            Press={onPressLocation}
          />
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.body}>
        <Text style={styles.subHeading}>Alert Box</Text>
        <SafeAreaView style={styles.alert}>
          <TouchableOpacity style={styles.left} onPress={previousMessage}>
            <Icon name="chevron-left" size={30} color={'black'} />
          </TouchableOpacity>
          <ScrollView style={styles.content}>
            <Text style={styles.contentText}>{display()}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.right} onPress={nextMessage}>
            <Icon name="chevron-right" size={30} color={'black'} />
          </TouchableOpacity>
        </SafeAreaView>
        <Text style={styles.subHeading}>Buses Near You</Text>
        <SafeAreaView style={styles.nearby}>
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: 13.0827,
              longitude: 80.2707,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </SafeAreaView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default UserHome;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#cfcdb8',
    alignItems: 'center',
  },
  subHeading: {
    top: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  navbar: {
    top: 10,
    height: '30%',
    width: '90%',
    backgroundColor: '#f6b756',
    borderRadius: 20,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#4a686a',
    height: '23%',
    paddingLeft: 12,
    paddingRight: 13,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
  },
  autocomplete: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  welcome: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    borderColor: 'black',
    paddingRight: 20,
  },
  alert: {
    top: 30,
    height: '30%',
    width: '90%',
    backgroundColor: '#f6f8e1',
    borderRadius: 20,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    padding: '5%',
    width: '70%',
    height: '75%',
  },
  contentText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  nearby: {
    top: 40,
    height: '40%',
    width: '90%',
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  body: {
    position: 'relative',
    zIndex: -1,
    top: 30,
    height: '65%',
    width: '88%',
    backgroundColor: '#fbbc57',
    alignItems: 'center',
    borderRadius: 20,
  },
  input: {
    width: '80%',
    top: 20,
    backgroundColor: '#f6f8e1',
    borderRadius: 25,
    height: '29%',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 20,
    paddingBottom: 8,
    marginBottom: 30,
  },
  // search: {
  //   top: 30,
  // },
});
