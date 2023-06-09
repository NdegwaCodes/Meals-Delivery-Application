import { View, Text,TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter'
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';
import { useDispatch, useSelector } from 'react-redux';

const ItemRow = ({ id, name, price, short_description, image, quantity} ) => {
    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        dispatch(addToBasket({id,name, short_description,price,image}));
    };
    const removeItemFromBasket = () => {
        // remove item from basket
        if (!items.length > 0) return;
        dispatch(removeFromBasket({id}));
    }
  return (
    <>
    <TouchableOpacity onPress={() => setIsPressed(!isPressed)}
    className={'bg-white border p-4 border-gray-200 ${isPressed && "border-b-0")'}>
    <View className="flex-row">
        <View className="flex-1 pr-2">
      <Text className="text-lg mb-1">{name}</Text>
      <Text className="text-gray-400">{short_description}</Text>
      <Text className="text-gray-400 mt-2"><Currency quantity={price} currency='KSH'/></Text>
    </View>
    <View>
        <Image style={{borderWidth:1, borderColor:"#F3F3F4",}}
        source={{ url: urlFor(image).url() }}
        className="h-20 w-20 bg-gray-300 p-4" />
    </View>
    </View>
    </TouchableOpacity>
   
    {isPressed && (
        <View className="bg-white px-4">
            <View className="flex-row items-center space-x-2 pb-3" >
                <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket} >
                    <MinusCircleIcon color="#00CCBB" size={40} />
                </TouchableOpacity>
                    <Text>(items.length)</Text>
                <TouchableOpacity onPress={addItemToBasket} >
                    <PlusCircleIcon color="#00CCBB" size={40} />
                </TouchableOpacity>

            </View>
        </View>
    )}
    </>
  );
    };

export default ItemRow