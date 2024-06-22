import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LeadInboxLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
        <Stack.Screen name="lead-profile" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default LeadInboxLayout;
