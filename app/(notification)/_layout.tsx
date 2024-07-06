import { View, Text, ScrollView, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const NotificationLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="notification" options={{ headerShown: true }} />
      </Stack>
    </>
  );
};

export default NotificationLayout;



