import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LeadInboxLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="employee-inbox" options={{ headerShown: false }} />
        <Stack.Screen name="employee-profile" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default LeadInboxLayout;
