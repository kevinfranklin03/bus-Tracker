import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch} from 'react-redux';
import {setOrigin} from '../../slices/navSlice';

const ChooseLocation = () => {
  const dispatch = useDispatch();

  // fetch location details from google map API.

  const onPressAddress = (data, details) => {
  const area = details.address_components[0].long_name
    dispatch(
      setOrigin({
        location: details.geometry.location,
        description: data.description,
        area: area
      }),
      
    );
  };

  return (

    <GooglePlacesAutocomplete
      placeholder="Where are you ?"
      textInputProps={{
        color: 'black',
        placeholderTextColor: 'grey',
        returnKeyType: "search"
      }}
      minLength={2}
      autoFocus={false}
      returnKeyType={'default'}
      styles={{
        container: {
          flex: 0,
          width: '80%',
          top: 5,
        },
        description: {
          color: 'black',
        },
        textInput: {
          position: 'relative',
          borderRadius: 20,
          width: '80%',
          height: '82%',
          backgroundColor: '#f6f8e1',
          fontSize: 18,
          marginVertical: 7,
          paddingLeft: 20,
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 5,
          zIndex: 1,
        },
        predefinedPlacesDescription: {
          color: 'black',
        },
      }}
      query={{
        key: GOOGLE_MAPS_KEY,
        language: 'en',
      }}
      onPress={onPressAddress}
      enablePoweredByContainer={false}
      fetchDetails={true}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={400}
      radius={20000}
    />
  );
};

export default ChooseLocation;
