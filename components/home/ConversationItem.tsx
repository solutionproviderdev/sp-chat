import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ConversationItem = ({ name, message, time, onPress }: { name: string; message: string; time: string; onPress: () => void }) => {
  return (
    <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200" onPress={onPress}>
      <View>
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-gray-600">{message}</Text>
      </View>
      <Text className="text-gray-600">{time}</Text>
    </TouchableOpacity>
  );
};

export default ConversationItem;
