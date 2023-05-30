import React from "react";
import { View, Text } from "react-native";
import { Input } from "native-base";
import { Icon } from "react-native-elements";
import Contact from "./Contact";

const ViewContacts = () => {
  return (
    <View className="flex flex-col  justify-center items-center">
      <View className = 'flex flex-row justify-center items-center'>
        <Icon name="book" className="mr-4" />
        <Input
          type="text"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Search For Phone Number"
        />
      </View>
      {/* make flatlist here{} */}
      <Contact />
      <Contact />
    </View>
  );
};

export default ViewContacts;
