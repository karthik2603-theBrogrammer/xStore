import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "native-base";
import { useRouter } from "expo-router";

const ScreenHeaderRight = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push("/contacts-screen/contacts");
        }}
        className="flex flex-row space-x-2"
      >
        <Text className="text-gray-900 font-bold">View Contacts</Text>
        <Icon name="sc-telegram" type="evilicon" color="#517fa4" />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeaderRight;
