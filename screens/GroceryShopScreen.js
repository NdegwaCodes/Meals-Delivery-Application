import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image } from 'react-native-web';
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronDoubleRightIcon, LocationMarkerIcon,StarIcon } from 'react-native-heroicons/solid';
import { QuestionMarkCircleIcon, ArrowLeftCircleIcon } from 'react-native-heroicons/outline';

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
        </View>
        </View>
      </ScrollView>
  )
}

export default GroceryShopScreen