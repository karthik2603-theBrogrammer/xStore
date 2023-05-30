import { View, Text } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "native-base";
import { Icon } from "react-native-elements";
import { useRouter } from "expo-router";


const Form = () => {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    firstname: null,
    lastname: null,
    phone: null,
    email: null,
  });

  const handleInputChange = (name, value) => {
    const router = useRouter();

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };
  return (
    <View className="flex flex-col justify-center items-center my-5 space-y-6">
      <View className="flex flex-row  justify-center items-center">
        <Icon name="person" className="mr-4" />
        <Input
          type="text"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="First Name"
          onChangeText={(text) => handleInputChange("firstname", text)}
        />
      </View>
      <View className="flex flex-row  justify-center items-center">
        <Icon name="people" className="mr-4" />
        <Input
          type="text"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Last Name"
          onChangeText={(text) => handleInputChange("lastname", text)}
        />
      </View>
      <View className="flex flex-row  justify-center items-center">
        <Icon name="phone" className="mr-4" />
        <Input
          type="phone"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Phone Number"
          onChangeText={(text) => handleInputChange("phone", text)}
        />
      </View>
      <View className="flex flex-row  justify-center items-center">
        <Icon name="email" className="mr-4" />
        <Input
          type="email"
          w={{
            base: "75%",
            md: "25%",
          }}
          placeholder="Email"
          onChangeText={(text) => handleInputChange("email", text)}
        />
      </View>
      <Button
        color="emerald.200"
        onPress={() => {
          console.log(formValues);
        }}
      >
        <Text className="text-white">Success</Text>
      </Button>

      <Button color="emerald.200" onPress={() => {router.push('/contacts-screen/contacts')}}>
        <Text className="text-white">View Contacts</Text>
      </Button>
    </View>
  );
};

export default Form;
