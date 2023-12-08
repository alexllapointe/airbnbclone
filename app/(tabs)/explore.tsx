import { View, Text } from "react-native";
import React, { FC, useState } from "react";
import ExploreHeader from "../../components/ExploreHeader";
import Listings from "../../components/Listings";

const Explore: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategorySelected = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <View style={{ flex: 1 }}>
      <ExploreHeader onCategorySelected={handleCategorySelected} />
      <Listings category={selectedCategory} />
    </View>
  );
};
export default Explore;

