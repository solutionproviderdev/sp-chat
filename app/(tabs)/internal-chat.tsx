import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import Header from "@components/home/Header";
import SearchBar from "@components/home/SearchBar";
import FilterSection from "@components/home/FilterSection";
import ConversationItem from "@components/home/ConversationItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const InternalChat = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const spchat = "spchat";
  const conversations = [
    {
      id: 1,
      image: "https://i.ibb.co/Pmx9Q8Y/Screenshot-3.png",
      name: "salman fursi",
      message: "spchat bolsi!",
      time: "12:34",
    },
    {
      id: 2,
      image: "https://i.ibb.co/Yy1QsQR/Screenshot-4.png",
      name: "ali rahman",
      message: "hello there!",
      time: "12:35",
    },
    {
      id: 3,
      image: "https://i.ibb.co/zXVyV0Z/Screenshot-5.png",
      name: "ayesha khan",
      message: "good morning!",
      time: "12:36",
    },
    {
      id: 4,
      image: "https://i.ibb.co/3kXgVX2/Screenshot-6.png",
      name: "omar sharif",
      message: "what's up?",
      time: "12:37",
    },
    {
      id: 5,
      image: "https://i.ibb.co/vkmPn4z/Screenshot-7.png",
      name: "nadia islam",
      message: "see you soon.",
      time: "12:38",
    },
    {
      id: 6,
      image: "https://i.ibb.co/5vjMTnQ/Screenshot-8.png",
      name: "reza chowdhury",
      message: "how are you?",
      time: "12:39",
    },
    {
      id: 7,
      image: "https://i.ibb.co/m9JbBPh/Screenshot-9.png",
      name: "farah hossain",
      message: "let's meet.",
      time: "12:40",
    },
    {
      id: 8,
      image: "https://i.ibb.co/f4PHPSj/Screenshot-10.png",
      name: "kamal uddin",
      message: "great job!",
      time: "12:41",
    },
    {
      id: 9,
      image: "https://i.ibb.co/4m4qg5k/Screenshot-11.png",
      name: "shamim hasan",
      message: "nice to see you.",
      time: "12:42",
    },
    {
      id: 10,
      image: "https://i.ibb.co/XLzKtjm/Screenshot-12.png",
      name: "rahim uddin",
      message: "good night.",
      time: "12:43",
    },
  ];
  

  return (
    <SafeAreaView className="h-full w-full">
      <Header title="SP Chat" />
      <View className="w-full px-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterSection filter={filter} setFilter={setFilter} />
      </View>
      <ScrollView className="mt-2">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            tab={spchat}
            image={conversation.image}
            name={conversation.name}
            message={conversation.message}
            time={conversation.time}
            onPress={() => {
              console.log(`Navigating to /spchat/${conversation.id}`);
              router.push(`/(spchat)/${conversation.id}`);
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default InternalChat;
