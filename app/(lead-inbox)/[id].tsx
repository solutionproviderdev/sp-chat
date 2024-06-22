import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import InboxHeader from "../../components/InboxHeader";
import MessageInput from "../../components/MessageInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Inbox = () => {
  const { id } = useLocalSearchParams();

  const messages = [
    { id: 1, text: "Hi", sender: "John Doe" },
    { id: 2, text: "What's up?", sender: "Jane Doe" },
    // Add more dummy messages here
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <InboxHeader name={"John Doe" + id} />
      <ScrollView className="p-4">
        {messages.map((message) => (
          <View key={message.id} className="flex-row justify-start mb-2">
            <Text className="bg-white p-2 rounded-lg shadow">
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <MessageInput />
      <StatusBar style="auto" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default Inbox;
