import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const GroceryShopScreen = () => {
    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            items,
            long,
            lat,
        }
    } = useRoute();
  return (
    <View>
      <Text>GroceryShopScreen</Text>
    </View>
  )
}

export default GroceryShopScreen