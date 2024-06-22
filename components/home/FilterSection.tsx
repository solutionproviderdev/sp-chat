import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, TouchableOpacity } from "react-native";

const FilterSection = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) => {
  return (
    <View className="flex-row justify-between items-center px-2">
      <View className="flex-row">
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ${
            filter === "all" ? "bg-primary" : "bg-gray-200"
          }`}
          onPress={() => setFilter("all")}
        >
          <Text className={`text-xs ${filter === "all" ? " text-white" : ""}`}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`px-4 py-2 rounded-full ml-2 ${
            filter === "unread" ? "bg-primary" : "bg-gray-200"
          }`}
          onPress={() => setFilter("unread")}
        >
          <Text className={`text-xs ${filter === "unread" ? " text-white" : ""}`}>
            Unread
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-sm">
        <Icon name="filter" size={16} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default FilterSection;
