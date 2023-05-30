import { View, Text } from "react-native";
import React from "react";

const Contact = (props) => {
  return (
    <View className="h-fit w-[90vw] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 p-3 m-3 flex items-center justify-center cursor-pointer">
      <Text>{props.fname}</Text>
      <Text>{props.lname}</Text>
    </View>
  );
};

export default Contact;
