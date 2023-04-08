import { View, Text } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectGrocery } from '../features/grocerySlice';
import { ProgressBar, SafeAreaView, TouchableOpacity } from 'react-native-web';
import { XIcon } from 'react-native-heroicons/solid';
import * as Progress from "react-native-progress"; 

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const grocery = useSelector(selectGrocery);
  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-50">
        <View>
        <View className="flex-row justify-between items-center p-5">
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <XIcon color="white" size={30}/>
            </TouchableOpacity>
            <Text className="font-light text-white text-lg">Order Help</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md" >
            <View className="flex-row justify-between" >
            <View>
            <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                <Text className="text-4xl font-bold">45-55 Minutes</Text>
        </View>
        <Image source={{
            uri: "https://links.papareact.com/fls",
        }}
        className="h-20 w-20"/>
            </View>
            <Progress.Bar size={30} color="#00CCBB indeterminate={true}" />
            <Text>Your Order at {grocery.title} is being prepared</Text>
        </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen