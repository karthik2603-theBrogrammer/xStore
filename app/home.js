import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import ScreenHeaderLeft from "./Components/ScreenHeaderLeft";
import ScreenHeaderRight from "./Components/ScreenHeaderRight";
import Form from "./Components/Form";
import { NativeBaseProvider } from "native-base";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from "react";


const Home = () => {
  useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    
    lockScreenOrientation();
  }, []);
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
