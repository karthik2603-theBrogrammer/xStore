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
      <View className="h-fit w-[90vw] bg-violet-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 p-3 m-3 flex items-center justify-center cursor-pointer space-y-4">
        <Text className = 'text-white text-2xl font-extrabold'>No Contacts Present!</Text>

        <Button
          onPress={() => {
            router.push("/home");
          }}
          className = 'bg-transparent border-2 border-white rounded-lg'
        >
          <Text className="text-white font-bold">Add A Contact</Text>
        </Button>
      </View>
    );
  }
  return (
    <View className="h-fit w-[90vw] bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 p-3 m-3 flex items-center justify-center cursor-pointer space-y-2">
      <Text className = 'text-[18px] font-bold text-white'>First Name: <Text className = 'text-white text-2xl'>{fname}</Text></Text>
      <Text className = 'text-[18px] font-bold text-white'>Last Name: <Text className = 'text-white text-2xl'>{lname}</Text></Text>
      <Text className = 'text-[18px] font-bold text-white'>Number: <Text className = 'text-white text-2xl'>{phone}</Text></Text>
      <Text className = 'text-[18px] font-bold text-white'>Email: <Text className = 'text-white text-1xl'>{email}</Text></Text>
    </View>
  );
};

export default Contact;
