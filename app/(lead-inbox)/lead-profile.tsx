import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LeadProfile = () => {
  return (
    <SafeAreaView className="flex items-center justify-start p-4 bg-white">
      <View className="items-center justify-center bg-gray-900 h-40 w-40 rounded-full">
        <Icon
          name="account"
          size={120}
          color="black"
          className="w-full h-full"
          style={{ color: "#fff" }}
        />
      </View>
      <Text className="font-pbold text-3xl mt-4 text-gray-900">
        Rezaul Karim Dahir
      </Text>
      <View className="flex flex-row items-center gap-4 mt-4">
        <TouchableOpacity className="flex flex-row items-center justify-center px-4 py-2 bg-gray-900 rounded-lg">
          <Icon name="phone" size={24} color="white" />
          <Text className="ml-2 text-base text-white">Call</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row items-center justify-center px-4 py-2 bg-gray-900 rounded-lg">
          <Icon name="message-processing-outline" size={24} color="white" />
          <Text className="ml-2 text-base text-white">Message</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-start mt-4 w-full">
        <View className="flex flex-row items-center">
          <Icon name="phone" size={24} color="black" />
          <Text className="ml-2 text-base text-gray-900">+8801711111111</Text>
        </View>
        <View className="flex flex-row items-center mt-4">
          <Icon name="map-marker" size={24} color="black" />
          <Text className="ml-2 text-base text-gray-900">
            Arshi Nogor, Bosila, Mohammodpur
          </Text>
        </View>
      </View>
      <View className="flex flex-col items-start mt-4 w-full">
        <Text className="font-pbold text-xl text-gray-900">Reminders:</Text>
        <View className="flex flex-row items-center mt-2">
          <Icon name="phone" size={24} color="black" />
          <Text className="ml-2 text-base text-gray-900">26 May 10:30 am</Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Icon name="message-processing-outline" size={24} color="black" />
          <Text className="ml-2 text-base text-gray-900">28 May 02:30 pm</Text>
        </View>
        <View className="flex flex-row items-center mt-2">
          <Icon name="phone" size={24} color="black" />
          <Text className="ml-2 text-base text-gray-900">30 May 12:30 pm</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LeadProfile;
