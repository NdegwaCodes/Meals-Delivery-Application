import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectGrocery } from '../features/grocerySlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { ScrollView, TouchableOpacity } from 'react-native-web';
import { urlFor } from '../sanity';
import Currency from "react-currency-formatter"

const BasketScreen = () => {
    const navigation = useNavigation();
    const grocery = useSelector(selectGrocery);
    const items = useSelector(selectBasketItems);
    const basketTotal= useSelector(selectBasketTotal);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const groupedItems = items.reduce((results, item) => {
          (results[item.id] = results[item.id] || []).push(item);
          return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
      }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white" >
        <View className="flex-1 bg-gray-100">
            <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                <View>
                    <Text className="text-lg font-bold text-center">Basket</Text>
                    <Text className="font-extrabold" >{grocery.title}</Text>
                </View>
                <TouchableOpacity
                    onPress={navigation.goBack}
                    className="rounded-full bg-gray-100 absolute top-3 right-5">
                    <XCircleIcon height={50} width={50} color="#00CCBB" />
                </TouchableOpacity>
            </View>
            </View>
            <View>
                <Image source={{
                    url: "https://links.papareact.com/wru",
                }} className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
              <Text className="flex-1"> Delivery in 50-75 minutes</Text>
              <TouchableOpacity>
                <Text className="text-[#00ccbb]"> Change</Text>
              </TouchableOpacity>
            </View>
            <ScrollView className="divide-gray-200">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
                <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                <Text className="text-[#00ccbb]">{items.length} x</Text>
                <Image
                source={{ url: urlFor(items[0]?.imgUrl.url()) }}
                className="h-12 w-12 rounded-full" />
                <Text className="flex-1">(items[0]?.name)</Text>
                <Text className="text-gray-600">
                    <Currency quantity={items[0]?.price} currency="KSH"/>
                </Text>
                <TouchableOpacity>
                    <Text className="text-[#00ccbb] text-xs"
                    onPress={() => dispatch(removeFromBasket({id:key}))}
                    >Remove</Text>
                </TouchableOpacity>
                </View>
            ))}
            </ScrollView>
            <View>
               <View className="p-5 bg-white mt-5 space-y-4">
                <Text className="text-gray-400">Subtotal</Text>
                <Text className="text-gray-400">
                <Currency quantity={basketTotal} currency="KSH"/>
                </Text>
                </View> 
            </View>
            <View>
               <View className="flex-row justify-between">
                <Text className="text-gray-400">Delivery Fee</Text>
                <Text className="text-gray-400">
                <Currency quantity={150} currency="KSH"/>
                </Text>
                </View> 
                <View>
               <View className="flex-row justify-between">
                <Text>Order Total</Text>
                <Text className="font-extrabold">
                <Currency quantity={basketTotal + 150} currency="KSH"/>
                </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} 
                className="rounded-lg bg-[#00CCBB] p-4">
                    <Text className="text-center text-white text-lg font-bold">Place Order</Text>
                </TouchableOpacity>

                </View> 
        </View>
    </SafeAreaView>
  );
};

export default BasketScreen