import { View, Text } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'

const FeaturedRow = ({id, title, description,}) => {
  return (
    <View>
    <View className="mt-4 flex-row items-center justify-between px-4">
      < Text className= "font-bold text-lg" >(Offers Near You)</Text>
      <ArrowRightIcon color="#00CCBB" />
    </View>
    <Text className="text-xs text-gray-500 px-4">(description)</Text>
    </View>
  )
}

export default FeaturedRow;