import { TextInput } from 'react-native'
import React from 'react'

const WhiteField = (props) => {

  return (
    <TextInput
    {...props}
    style = {{ borderRadius: 100, color: "black", paddingHorizontal: 10, width: "90%", height: 50, backgroundColor: "white", fontSize: 19, marginVertical: 15 }}
    placeholderTextColor = "grey" >
    </TextInput>
  )
}

export default WhiteField;