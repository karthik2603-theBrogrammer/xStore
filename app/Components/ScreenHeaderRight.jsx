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
        className="flex flex-row items-center justify-center space-x-2 bg-purple-900 p-3 rounded-lg mt-3"
      >
        <Text className="text-white font-bold">View Contacts</Text>
        <Icon name="sc-telegram" type="evilicon" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ScreenHeaderRight;
