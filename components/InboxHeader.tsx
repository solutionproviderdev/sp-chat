import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const InboxHeader = ({ name }: { name: string }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between items-center p-4 bg-white shadow">
      <Text className="text-xl font-bold">{name}</Text>
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Icon
            name="account"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            /* handle call action */
          }}
        >
          <Icon
            name="phone"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LeadsProfile")}>
          <Icon name="information" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InboxHeader;
