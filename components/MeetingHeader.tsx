import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

const MeetingHeader = ({ name,id }: { name: string,id:string }) => {

  return (
    <View className="flex-row justify-between items-center p-4 bg-white shadow">
      <Text className="text-xl font-bold">{name},{id}</Text>
      <TouchableOpacity onPress={() => router.push(`/profile/${id}`)}>
          <Icon name="account" size={24} color="black" />
        </TouchableOpacity>
    </View>
  );
};
// profile/[spchat-profile]

export default MeetingHeader;
