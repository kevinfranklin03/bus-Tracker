import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const BusBtn = ({ bgColor, btnLabel, textColor, Press }) => {
  return (
<TouchableOpacity 
    onPress={Press}
    style={{ backgroundColor: '#E8A317', 
            borderRadius: 200,
            alignItems: "center",
            width: 80,
            paddingVertical: 3,
            margin: 8
            }}>
    <Text style = {{ color: 'white',
                    fontSize: 20,
                    fontWeight: 'bold'
                     }}>
        {btnLabel}
    </Text>
</TouchableOpacity>
  )
}

export default BusBtn;
