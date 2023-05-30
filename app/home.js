import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import ScreenHeaderLeft from "./Components/ScreenHeaderLeft";
import ScreenHeaderRight from "./Components/ScreenHeaderRight";
import Form from "./Components/Form";
import { NativeBaseProvider } from "native-base";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderLeft />,
          headerRight: () => <ScreenHeaderRight />,
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
        <NativeBaseProvider>
          <View
            style={{
              flex: 1,
            }}
            
          >
            <Form />
          </View>
        </NativeBaseProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
