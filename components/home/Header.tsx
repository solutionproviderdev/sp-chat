import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Header = ({ title, notificationCount=4 }: { title: string; notificationCount: number }) => {
  const route = useRoute();

  const isProfilePage = route.name === 'profile'; // Adjust based on your route name

  return (
    <View className="flex-row justify-between items-center p-3 bg-white shadow">
      <Text className="text-xl font-bold">{title}</Text>
      {!isProfilePage && (
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.push("/notification")} className="relative">
            <Icon
              name="bell"
              size={24}
              color="black"
              style={{ marginRight: 15 }}
            />
            {notificationCount > 0 && (
              <View className="absolute -top-1 ml-4 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center">
                <Text className="text-xs text-white">{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Icon name="account" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
