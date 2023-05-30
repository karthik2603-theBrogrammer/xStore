import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import ScreenHeaderLeft from "../Components/ScreenHeaderLeft";
import ScreenHeaderRight from "../Components/ScreenHeaderRight";
import { NativeBaseProvider } from "native-base";
import ViewContacts from "../Components/ViewContacts";
const ContactsScreen = () => {
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
            <ViewContacts/>
          </View>
        </NativeBaseProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactsScreen;
