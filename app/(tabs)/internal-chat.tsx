import React, { useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import Header from "@components/home/Header";
import SearchBar from "@components/home/SearchBar";
import FilterSection from "@components/home/FilterSection";
import ConversationItem from "@components/home/ConversationItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const InternalChat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const conversations = [
    { name: "John Doe", message: "Hello!", time: "12:34" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    { name: "Jane Smith", message: "How are you?", time: "12:35" },
    // Add more dummy data here
  ];

  return (
    <SafeAreaView className="h-full w-full">
      <Header title="SP Chat" className="mt-10" />
      <View className="w-full px-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterSection filter={filter} setFilter={setFilter} />
      </View>
      <ScrollView className="mt-2">
        {conversations.map((conversation, index) => (
          <ConversationItem
            key={index}
            name={conversation.name}
            message={conversation.message}
            time={conversation.time}
            onPress={() => router.push(`/inbox/${conversation}`)}
          />
        ))}
      </ScrollView>
      <StatusBar backgroundColor={"#fff"} />
    </SafeAreaView>
  );
};

export default InternalChat;
