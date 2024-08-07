import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,  
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import Header from "@components/home/Header";

//i can get all the data that i is in my auth i will bring it in the profile and oplace it ok !

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white pt-6">
      <View className="flex-row gap-2 items-center p-4 bg-white shadow">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold mb-1">Profile</Text>
      </View>

      <View className="items-center p-4">
        <Image
          source={{ uri: "https://i.ibb.co/jw8vS61/Screenshot-2.png" }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-2xl font-bold mt-4">Your Name</Text>
        <Text className="text-gray-600 mt-2">Active now</Text>
      </View>
      <View className="mt-6">
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-300">
          <Icon name="account-edit" size={24} color="black" />
          <Text className="text-lg ml-4">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-300">
          <Icon name="bell" size={24} color="black" />
          <Text className="text-lg ml-4">Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-300">
          <Icon name="shield-check" size={24} color="black" />
          <Text className="text-lg ml-4">Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-300">
          <Icon name="cog" size={24} color="black" />
          <Text className="text-lg ml-4">Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-300">
          <Icon name="logout" size={24} color="black" />
          <Text className="text-lg ml-4">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;