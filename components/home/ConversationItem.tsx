
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const ConversationItem = ({
  name,
  image,
  tab,
  creName,
  status,
  message,
  time,
  unreadCount = 50,
  onPress,
  onUnreadPress,
}: {
  name: string;
  image: string;
  message: string;
  time: string;
  unreadCount: number;
  onPress: () => void;
  onUnreadPress: () => void;
}) => {

  const renderImageSource = tab === "spchat"
  ? { uri: image }
  : { uri: "https://media.istockphoto.com/id/1888326378/photo/young-girl-and-adult-friends-splash-in-the-ocean-together.webp?s=2048x2048&w=is&k=20&c=iSFQRykkOoLN6hvh-q8Dw2DZj5dvdx9PyBLAyWLE3sw=" };

  return (
    <TouchableOpacity
      className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200"
      onPress={onPress}
    >
      <Image
        source={renderImageSource}
        className="w-12 h-12 rounded-full mr-4"
      />

      <View className="flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-gray-600 " numberOfLines={1} ellipsizeMode="tail">{  message}</Text>
      </View>

      <View className="flex">
        {tab !== 'spchat'&& (
        <View className="flex-row">
          <TouchableOpacity
            onPress={onUnreadPress}
          >
            <Text className="text-white bg-blue-300 py-1 px-1 rounded  mr-1">{status}</Text>
          </TouchableOpacity>
          {/* <Text className="py-1 px-1">{creName}</Text> */}
        </View>
        )}
        <View className="flex-row justify-center items-center">
          <Text className="text-gray-600 mr-2">{time}m</Text>
          <Text className="text-white bg-red-300 p-1 rounded-full font-bold">{unreadCount}</Text>
        </View>
        
      </View>
        
    </TouchableOpacity>
  );
};

export default ConversationItem;
