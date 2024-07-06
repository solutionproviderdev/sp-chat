import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const LeadProfileHeader = ({ name }: { name: string }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between items-center p-4 bg-white shadow">
      <Text className="text-xl font-bold">{name}</Text>
    </View>
  );
};

export default LeadProfileHeader;
