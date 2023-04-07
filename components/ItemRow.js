import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-web'

const ItemRow = ( id, name, price, short_description, image, quantity, ) => {
  return (
    <TouchableOpacity>
    <View>
      <Text className="text-lg mb-1">{name}</Text>
      <Text className="text-gray-400">{short_description}</Text>
    </View>
    </TouchableOpacity>
  );
};

export default ItemRow