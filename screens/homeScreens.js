import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const homeScreens = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
       
    }, []);
  return (
    <SafeAreaView>
      <Text className= "text-red-600">
      {/*Header */}
      <View>
        <image source{{
            url: 'https://links.papareact.com/wru',
        }}
        className= "h-7 w-y bg-gray-700 p-4 rounded-full"
        />
        <View>
        <Text></Text>
        </View>
      </View>
      </Text>
    </SafeAreaView>
  )
}

export default homeScreens