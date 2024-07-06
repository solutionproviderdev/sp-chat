import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const LeadInboxLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
        <Stack.Screen name="lead-profile" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" backgroundColor="#fff" />
    </>
  );
};

export default LeadInboxLayout;
