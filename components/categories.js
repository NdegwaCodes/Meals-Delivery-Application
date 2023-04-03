import { View, Text } from 'react-native'
import React from 'react'

const Categories = () => {
  return (
    <ScrollView 
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
    >
        {/* Category Card*/}

        <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing 1"/>
        <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing 2"/>
        <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing 3"/>
        <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing 4"/>
        <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing 5"/>
        <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing 6"/>
        <CategoryCard imgUrl="https://links.papareact.com/wru" title="Testing 7"/>

         
      <Text>Categories</Text>
    </ScrollView>
  )
}

export default Categories;