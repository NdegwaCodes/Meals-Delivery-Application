import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native-web'
import { sanityClient } from '@sanity/client';

const FeaturedRow = ({id, title, description,}) => {
  const [groceryshop, setGroceryShop] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "featured" && _id == $id] {
        ..., groceryshop[] -> {
          ..., item[] ->,
          type -> {
            name
          }
        }
      }[0]
    `, { id }).then(data=>{setGroceryShop(data?.groceryshop)});
  }, [id]);
  

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
      {groceryshop?.map((groceryshop => (
        <GroceryShopCard 
        key={restaurant._id}
        id={groceryshop._id}
        imgUrl={groceryshop.image}
          title={groceryshop.name}
          rating={groceryshop.rating}
          genre={groceryshop.type.name}
          address={groceryshop.address}
          short_description={groceryshop.short_description}
          item={groceryshop.item}
          long={groceryshop.long}
          lat={groceryshop.lat}
        />
      )))};
    
    </ScrollView>
    </View>
  )
}

export default FeaturedRow;