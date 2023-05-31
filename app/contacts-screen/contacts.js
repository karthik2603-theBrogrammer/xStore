import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import ScreenHeaderLeft from "../Components/ScreenHeaderLeft";
import { NativeBaseProvider } from "native-base";
import ViewContacts from "../Components/ViewContacts";
import { Icon } from "react-native-elements";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from "react";

const ScreenHeaderRightAddContact = () => {
  useEffect(() => {
    async function lockScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    lockScreenOrientation();
  }, []);
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        className="flex flex-row space-x-[3px] items-center justify-center"
        onPress={() => {
          router.push("/home");
        }}
      >
        <Text className = 'text-1xl font-bold'>Back</Text>
        <Icon name="sc-telegram" type="evilicon" color="#517fa4" size={50} />
      </TouchableOpacity>
    </View>
  );
};

const ContactsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderLeft />,
          headerRight: () => <ScreenHeaderRightAddContact />,
          headerTitle: "",
        }}
      />

      <NativeBaseProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <ViewContacts />
        </View>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default ContactsScreen;
