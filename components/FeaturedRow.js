import { View, Text } from 'react-native'
import React from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native-web'

const FeaturedRow = ({id, title, description,}) => {
  return (
    <View>
    <View className="mt-4 flex-row items-center justify-between px-4">
      < Text className= "font-bold text-lg" >(Offers Near You)</Text>
      <ArrowRightIcon color="#00CCBB" />
    </View>
    <Text className="text-xs text-gray-500 px-4">(description)</Text>
    <ScrollView 
    horizontal
    contentContainerStyle={{
        paddingHorizontal: 15,
    }}
    showsHorizontalScrollIndicator={false}
    className="pt-4"
    >
    {/*Grocery Cards */}  
      <RestaurantCard 
      id={123}
      imgUrl="https://links.papareact.com/gn7"
        title="Sukuma Wiki"
        rating={4.5}
        genre="Kenyan"
        address="Nairobi"
        short_description="Sukuma wiki is a Kenyan dish made from collard greens, tomatoes, onions, and spices. It is a popular dish in Kenya and is often served with ugali, chapati, or rice."
        dishes={[]}
        long={36.8219}
        lat={-1.2921}
      />
      <RestaurantCard 
      id={123}
      imgUrl="https://links.papareact.com/gn7"
        title="Sukuma Wiki"
        rating={4.5}
        genre="Kenyan"
        address="Nairobi"
        short_description="Sukuma wiki is a Kenyan dish made from collard greens, tomatoes, onions, and spices. It is a popular dish in Kenya and is often served with ugali, chapati, or rice."
        dishes={[]}
        long={36.8219}
        lat={-1.2921}
      />
      <RestaurantCard 
      id={123}
      imgUrl="https://links.papareact.com/gn7"
        title="Sukuma Wiki"
        rating={4.5}
        genre="Kenyan"
        address="Nairobi"
        short_description="Sukuma wiki is a Kenyan dish made from collard greens, tomatoes, onions, and spices. It is a popular dish in Kenya and is often served with ugali, chapati, or rice."
        dishes={[]}
        long={36.8219}
        lat={-1.2921}
      />
    </ScrollView>
    </View>
  )
}

export default FeaturedRow;