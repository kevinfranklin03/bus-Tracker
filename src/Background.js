import { View, ImageBackground } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
const Background = ( {children} ) => {
  return (
    <View>
      <ImageBackground  
        source = { require('../src/assets/images/busBG.jpg') }
        style = {{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: -500,
          left: 0
        }}
      />
      <View>
        {children}
      </View>
    </View>
  )
}

export default Background
