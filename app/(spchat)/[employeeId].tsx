import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import InboxHeader from "@components/InboxHeader";
import MessageInput from "@components/MessageInput";
import { SafeAreaView } from "react-native-safe-area-context";
import MeetingHeader from "@components/MeetingHeader";

const InternalConversation = () => {
  const { employeeId: id } = useLocalSearchParams();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hi", sender: "John Doe" },
    { id: 2, text: "What's up?", sender: "Jane Doe" },
  ]);

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

  const conversation = conversations.find((conv) => conv.id === parseInt(id));
  console.log('Found Conversation:', conversation);

  const handleSendMessage = (newMessage) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: newMessage, sender: "You" },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <MeetingHeader name={conversation.name} id={conversation.id} />
      
      <ScrollView className="p-4 flex-1">
        {messages.map((message) => (
          <View
            key={message.id}
            className={`flex-row mb-2 ${
              message.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <Text
              className={`p-2 rounded-lg shadow ${
                message.sender === "You" ? "bg-blue-100" : "bg-white"
              }`}
            >
              {message.text}{conversation.id}
            </Text>
          </View>
        ))}
      </ScrollView>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </SafeAreaView>
  );
};

export default InternalConversation;
