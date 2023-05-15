import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const SmallBtn = ({ bgColor, btnLabel, textColor, Press, disable }) => {

  return (
<TouchableOpacity 
  disabled={disable}
    onPress={Press}
    style={{ backgroundColor: bgColor, 
            borderRadius: 100,
            alignItems: "center",
            width: 120,
            paddingVertical: 6,
            marginVertical: 5,
            }}>
    <Text style = {{ color: textColor,
                    fontSize: 17,
                    fontWeight: "bold" }}>
        {btnLabel}
        
    </Text>
</TouchableOpacity>
  )
}

export default SmallBtn;
