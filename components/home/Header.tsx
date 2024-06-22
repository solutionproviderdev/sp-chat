import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const Header = ({ title }: { title: string }) => {

  return (
    <View className="flex-row justify-between items-center p-4 bg-white shadow">
      <Text className="text-xl font-bold">{title}</Text>
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.push("/notification")}>
          <Icon
            name="bell"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Icon name="account" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
