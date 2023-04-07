import { View, Text,TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter'
import { urlFor } from '../sanity';
import { MinusCircleIcon } from 'react-native-heroicons/outline';

const ItemRow = ( id, name, price, short_description, image, quantity, ) => {
    const (isPressed, setIsPressed) = useState(false);
  return (
    <>
    <TouchableOpacity onPress=(() => setIsPressed(!isPressed)}
    className="bg-white border p-4 border-gray-200">
    <View className="flex-row">
        <View className="flex-1 pr-2">
      <Text className="text-lg mb-1">{name}</Text>
      <Text className="text-gray-400">{short_description}</Text>
      <Text className="text-gray-400 mt-2"><Currency quantity={price} currency='KSH' /></Text>
    </View>
    <View>
        <Image style={{borderWidth:1, borderColor:"#F3F3F4",}}
        source={{ url: urlFor(image).url() }}
        className="h-20 w-20 bg-gray-300 p-4"
        />
    </View>
    </View>
    </TouchableOpacity>
    {isPressed && (
        <View>
            <View>
                <TouchableOpacity>
                    <MinusCircleIcon size={40} />
                </TouchableOpacity>
            </View>
        </View>
    )}

    </>
  );
};

export default ItemRow