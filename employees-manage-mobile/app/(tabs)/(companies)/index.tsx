import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import React from "react";
import { View, Text, StatusBar, Dimensions } from "react-native";


const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

export default function Index() {
  return (
  
    <View style={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width }}>
      <MasonryFlashList
      data={DATA}
      numColumns={2}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      estimatedItemSize={200}
    />
    </View>
  );
}
