import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../../slices/navSlice';

const SearchBtn = ({bgColor, btnLabel, textColor, Press}) => {
  const origin = useSelector(selectOrigin);
  console.log(origin.area)
  const area = origin.area;

  const thisIsTrue = {
    opacity: 0.6,
    backgroundColor: '#d3d3d3',
    borderRadius: 100,
    alignItems: 'center',
    width: 120,
    paddingVertical: 6,
    marginVertical: 5,
  };

  const thisIsFalse = {
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    width: 120,
    paddingVertical: 6,
    marginVertical: 5,
  };

  return (
    <TouchableOpacity
      disabled={area == undefined ? true : false}
      onPress={Press}
      style={area == undefined ? thisIsTrue : thisIsFalse}>
      <Text style={{color: textColor, fontSize: 20, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchBtn;
