import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import { useDispatch } from "react-redux";
import SmallBtn from '../src/components/SmallBtn';
import {useNavigation} from '@react-navigation/native';
import BusBtn from '../src/components/busNumber';
import MapView, {
  Marker,
  AnimatedRegion,
  MarkerAnimated,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import imagePath from '../src/constants/imagePath';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../slices/navSlice';

import Loader from '../src/components/Loader';
import {db} from '../firebase/firebase.config';
import {onValue, ref} from '@firebase/database';

const MapPage = () => {
  //create reference for map and marker
  const mapRef = useRef();
  const dispatch = useDispatch()
  const markerRef = useRef();
  const navigation = useNavigation();
  const [route, setRoute] = useState([]);

  const [bus, setBus] = useState('');
  // console.log('this is bus', bus)
  const origin = useSelector(selectOrigin);
  const area = origin.area;
  //  console.log(area)

  useEffect(() => {
    const starCountRef = ref(db, 'bus/' + area);
    onValue(starCountRef, snapshot => {
      const data = snapshot.val();
      if (data == null) {
        alert('Please Enter a valid Location');
      } else {
        Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setRoute(data.routeNo);
      }
    });
  }, []);
  // Display bus driver details:
  useEffect(() => {
 
      console.log('running')
      const starCountRef = ref(db, 'busDetails/' + bus + '/location');
      console.log('ref', starCountRef)
    onValue(starCountRef, async snapshot => {
      const data = await snapshot.val();
      // console.log('this is data', data.curLoc)
      // console.log(data.curLoc)
      if(data.curLoc.latitude == "") {
        console.log('driver gps error')
      } else {
          setDriverLoc(data.curLoc);
      }
    });
   

   
}, [dispatch, bus]);


const [driverDetails, setDriverDetails] = useState([])
useEffect(() => {

    const starCountRef = ref(db, 'busDetails/');
  onValue(starCountRef, snapshot => {

    const data = snapshot.val();
    // console.log(data)
    const newPosts = Object.entries(data);
    for(let i = 0; i < 11; i++) {
      // console.log('this is data', newPosts[i])
      setDriverDetails(newPosts);
    }
  });
}, []);

    
function getDetails (number) {
  setBus(number)
  console.log(number)
  // console.log(driverDetails)
  for(let i = 0; i < driverDetails.length; i++) {
    if(driverDetails[i][0] == number || undefined) {
      Alert.alert(
        'Bus Details',
        'Bus Condition: ' +
          driverDetails[i][1].busCondition +
          '\n' +
          "Driver's Name: " +
          driverDetails[i][1].driverName +
          '\n' +
          'Mobile Number: ' +
          driverDetails[i][1].mobile,
      );
    // console.log('details', driverDetails[i][1].driverName)
    } 
    // console.log('details',driverDetails[i][0])
  }

}


  // Get Area and start looking into the database

  // fetch lat and long from user home page with the help of slice
  // Use Animated region for smooth tracking

  const [driverLoc, setDriverLoc] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.005,
    longitudeDelta: 0.0,
  });

  const [state, setState] = useState({
    curLoc: {
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.0,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.0,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {curLoc, isLoading, coordinate, time, distance, heading} = state;
  const updateState = data => setState(state => ({...state, ...data}));

// console.log('searched loc', curLoc)
// console.log(driverLoc)
console.log('route', driverLoc.latitude, driverLoc.longitude)
  // Note !! The drop location is the user's requested location
  // after the user gets on the bus the destination changes to the Sathyabama college
  // only when the user clicks the bus arrived button

  //
  console.log('time', time)
  const [lockButton, setLockButton] = useState(true)

  useEffect(()=>{
    if(time > 1) {
      setLockButton(false)
    }else {
      setLockButton(true)
    }
  }, [])


  function changeDestination() {
    setState({
      latitude: 12.8713,
      longitude: 80.2224,
      latitudeDelta: 0.005,
      longitudeDelta: 0.0,
    })
  }

  // console.log('driverLoc', driverLoc);

  // makes the moving marker to display in the center

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.0,
    });
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.navbar}>
        <SmallBtn
          bgColor={'#4a686a'}
          btnLabel={'Back'}
          textColor={'white'}
          Press={() => navigation.navigate('UserHome')}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.busNumber}>
          <SafeAreaView>
            <Text style={styles.subHeading}>Bus Route Number</Text>
          </SafeAreaView>
          <SafeAreaView style={styles.busRoute}>
            {route.map((item, index) => {
              return (
                <SafeAreaView key={index}>
                  <BusBtn btnLabel={item} Press={() =>getDetails(item)} />
                </SafeAreaView>
              );
            })}
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.mapComponent}>
          <SafeAreaView style={styles.map}>
            <MapView
              ref={mapRef}
              style={StyleSheet.absoluteFill}
              initialRegion={driverLoc}>
              <Marker.Animated ref={markerRef} coordinate={driverLoc}>
                <Image
                  source={imagePath.icBus}
                  style={{
                    width: 50,
                    height: 50,
                    transform: [{rotate: `${heading}deg`}],
                  }}
                  resizeMode="contain"
                />
              </Marker.Animated>
              <Marker coordinate={curLoc} image={imagePath.icGreenMarker} />
              <MapViewDirections
                origin={driverLoc}
                destination={curLoc}
                apikey={GOOGLE_MAP_KEY}
                strokeWidth={3}
                strokeColor="hotpink"
                optimizeWaypoints={true}
                onReady={result => {
                  fetchTime(
                    result.distance.toFixed(0),
                    result.duration.toFixed(0),
                  );
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      // right: 30,
                      // bottom: 100,
                      // left: 30,
                      // top: 100
                    },
                  });
                }}
              />
            </MapView>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              onPress={onCenter}>
              <Image source={imagePath.greenIndicator} />
            </TouchableOpacity>
            {/* <SmallBtn
              bgColor={ lockButton? 'grey' : 'black'}
              textColor={'white'}
              btnLabel={'Bus Arrived ?'}
              disable={lockButton}
              Press={()=> changeDestination()}
            /> */}
          </SafeAreaView>
          <SafeAreaView style={styles.subHeadingMap}>
            <Text style={styles.subHeadingText}>
              Estimated Time: {time} mins
            </Text>
            <Text style={styles.subHeadingText}>
              Estimated Distance: {distance} Kms
            </Text>
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
      <Loader isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default MapPage;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fcfffd',
    alignItems: 'center',
  },
  subHeading: {
    top: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subHeadingMap: {
    width: '96%',
    height: '15%',
    backgroundColor: '#fcbc58',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 5,
    alignItems: 'center',
  },
  subHeadingText: {
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  navbar: {
    paddingLeft: 12,
    paddingTop: 2,
    backgroundColor: '#fcfffd',
  },
  busNumber: {
    height: '20%',
    width: '100%',
    backgroundColor: '#d9d6c3',
    top: 10,
    alignItems: 'center',
  },
  busRoute: {
    top: 30,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    height: '70%',
    width: '90%',
  },
  mapComponent: {
    top: 25,
    height: '65%',
    backgroundColor: '#dad7c4',
    width: '100%',
    alignItems: 'center',
  },
  map: {
    top: 10,
    height: '82%',
    width: '96%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    alignItems: 'center',
  },
});
