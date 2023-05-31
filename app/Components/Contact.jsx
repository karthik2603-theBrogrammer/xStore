import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Input, Button } from "native-base";

import { useRouter } from "expo-router";

const Contact = ({ fname, lname, phone, email }) => {
  const router = useRouter();
  useEffect(() => {
    // console.log(fname, lname, email, phone);
  });
  if (fname == null && lname == null && email == null && phone == null) {
    return (
      <View className="h-fit w-[90vw] bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 p-3 m-3 flex items-center justify-center cursor-pointer space-y-4">
        <Text className = 'text-white text-2xl'>No Contacts Present!</Text>

        <Button
          color="emerald.200"
          onPress={() => {
            router.push("/home");
          }}
        >
          <Text className="text-white">Add A Contact</Text>
        </Button>
      </View>
    );
  }
  return (
    <View className="h-fit w-[90vw] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 p-3 m-3 flex items-center justify-center cursor-pointer">
      <Text className = 'text-[18px] font-bold text-white'>{fname}</Text>
      <Text className = 'text-[18px] font-bold text-white'>{lname}</Text>
      <Text className = 'text-[18px] font-bold text-white'>{phone}</Text>
      <Text className = 'text-[18px] font-bold text-white'>{email}</Text>
    </View>
  );
};

export default Contact;
