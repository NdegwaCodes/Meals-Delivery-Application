import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image, TouchableOpacity } from 'react-native-web';
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronDoubleRightIcon, LocationMarkerIcon,StarIcon } from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon, ArrowLeftCircleIcon } from 'react-native-heroicons/outline';
import ItemRow from '../components/ItemRow';
import BasketIcon from '../components/BasketIcon';
const GroceryShopScreen = () => {
    const navigation = useNavigation();
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
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);
  return (
    <>
    <BasketIcon />
    <ScrollView>
      <View className="relative">
        <Image source={{
            url: urlFor(imgUrl.url()),
        }} className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity 
        onPress={navigation.goBack} 
        className="absolute top-14 left-5 bg-gray-100 rounded-full"
        >
        <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
        <Text className="text-3xl font-bold">{title}</Text>
        <View className="flex-row space-x-2 my-1">
        <View className="flex-row items-center space-x-1">
        <StarIcon color="green"opacity={0.5} size={22} />
        <Text className="text-xs text-gray-500">
         <Text className="text-green-500">{rating}</Text>.{genre}
        </Text>
        </View>
        <View className="flex-row items-center space-x-1">
            <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
            <Text className="text-xs text-gray-500">Nearby.{address}</Text>
            </View>
           </View>
           <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y-2 border-gray-300">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
            <Text className="pl-2 flex-1 text-md font-bold "> 
            Have a Food Allergy?
            </Text>
            <ChevronDoubleRightIcon color="#00CCBB" />
        </TouchableOpacity>
        </View>
        <View className="pb-36">
            <Text className="px-4 pt-6 mb-3 font-bold text-xl">Items</Text>
            {/*Item Rows */}
            {items.map(item => {
                <ItemRow 
                key={item._id}
                id={item._id}
                name={item.title}
                price={item.price}
                imgUrl={item.imgUrl}
                short_description={item.short_description}
             />
            })}
        </View>
      </ScrollView>
      </>
  );
};

export default GroceryShopScreen