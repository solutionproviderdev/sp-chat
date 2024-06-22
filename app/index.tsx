import { SafeAreaView, ScrollView, View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text className="text-4xl font-bold mb-5 text-black">
          Welcome to SPChat
        </Text>
        <Text className="text-lg text-center mb-10 text-gray-800">
          Connect with your leads and team members efficiently. Streamline your
          communication and enhance your productivity with SPChat.
        </Text>
        <Button
          mode="contained"
          className="w-full bg-primary"
          labelStyle={{ color: "white" }}
          onPress={() => router.push("/login")}
        >
          Login to SPChat
        </Button>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Index;
