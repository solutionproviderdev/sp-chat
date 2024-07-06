// app/(spchat)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="[employeeId]" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="[spchat-profile]"
        options={{ headerShown: true, title: "Profile" }}
      />{" "} */}
       <Stack.Screen
        name="profile/[spchat-profile]"
        options={{ headerShown: true, title: "Profile" }}
      />
    </Stack>
  );
};

export default Layout;
