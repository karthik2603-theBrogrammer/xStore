import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

const ScreenHeaderRight = () => {
  return (
    <View className = 'flex flex-row space-x-2'>
      <Text className = 'text-gray-900'>View Contacts</Text>
      <Icon name="sc-telegram" type="evilicon" color="#517fa4" />
    </View>
  );
};

export default ScreenHeaderRight;
