import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient.fetch('*[_type == "category"]').then(data => {
      setCategories(data);
    });
  }, []);

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
        {categories.map((category) => {
          return (
            <CategoryCard 
              key={category._id}
              imgUrl={urlFor(category.image).width(200).url()}
              title={category.name}
            />
          )
        })}
    </ScrollView>
  );
};
export default Categories;