import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { yellow } from '../constants';

const LoginBtn = ({bgColor, btnLabel, textColor, Press}) => {

  const thisIsTrue = {
    backgroundColor: yellow,
    borderRadius: 100,
    alignItems: 'center',
    width: 120,
    paddingVertical: 6,
    marginVertical: 20,
  };


  return (
    <TouchableOpacity
      onPress={Press}
      style={thisIsTrue}>
      <Text style={{color: textColor, fontSize: 20, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default LoginBtn;
