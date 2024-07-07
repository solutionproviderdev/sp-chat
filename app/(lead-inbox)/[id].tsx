// import React, { useState, useEffect } from "react";
// import { ScrollView, View, Text, ActivityIndicator } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import InboxHeader from "../../components/InboxHeader";
// import MessageInput from "../../components/MessageInput";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { useGetLeadDetailsQuery } from "@redux/apiSlice";

// const Inbox = () => {
//   const { id } = useLocalSearchParams();
//   console.log("leads er id ", id);
//   const { data: lead, error, isLoading } = useGetLeadDetailsQuery(id);
//   const { data:sendMessage, error, isLoading } = useSendMessegeMutation(id);
//   console.log("lead result", lead);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     if (lead && lead.messages) {
//       setMessages(lead.messages);
//     }
//   }, [lead]);

//   const handleSendMessage = async (newMessage) => {
//     console.log("handleSendMessage:", newMessage);

//     // Create a new message data object
//     const newMessageData = {
//       _id: Date.now().toString(), // Temporary ID until the server returns the real one
//       content: newMessage,
//       senderId: "You",
//       sentByMe: true,
//       date: new Date().toISOString(),
//     };

//     // Optimistically add the new message to the UI

//     // Send the message to the backend
//     try {
//       // const response = await fetch(
//       //   `http://192.168.68.108:5000/fbmessage/${id}`,
//       //   {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     body: JSON.stringify({ message: newMessage }),
//       //   }
//       // );

//       const response = sendMessage(id, newMessage)

//       const data = await response.json();
//       if (response.ok) {
//         setMessages((prevMessages) => [...prevMessages, newMessageData]);

//         console.log("Message sent successfully:", data);
//         // Update the message ID with the one returned from the server
//         setMessages((prevMessages) =>
//           prevMessages.map((msg) =>
//             msg._id === newMessageData._id
//               ? { ...msg, _id: data.data.messageId }
//               : msg
//           )
//         );
//       } else {
//         console.error("Failed to send message:", data.error);
//         // Optionally handle the error in the UI (e.g., remove the optimistic message)
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//       // Optionally handle the error in the UI (e.g., remove the optimistic message)
//     }
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
//         <ActivityIndicator size="large" color="#0000ff" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
//         <Text>Error loading messages</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       <InboxHeader name={lead?.name || "Unknown"} />

//       <ScrollView className="p-4">
//         {messages.map((message) => (
//           <View
//             key={message._id}
//             className={`flex-row mb-2 ${
//               message.sentByMe ? "justify-end" : "justify-start"
//             }`}
//           >
//             <Text
//               className={`p-2 rounded-lg shadow ${
//                 message.sentByMe ? "bg-blue-100" : "bg-white"
//               }`}
//             >
//               {message.content}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>
//       <MessageInput onSendMessage={handleSendMessage} />
//     </SafeAreaView>
//   );
// };

// export default Inbox;

import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import InboxHeader from "../../components/InboxHeader";
import MessageInput from "../../components/MessageInput";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useGetLeadDetailsQuery,
  useSendMessegeMutation,
} from "@redux/features/lead-center/leadCenterAPI";

const Inbox = () => {
  const { id } = useLocalSearchParams();
  console.log("leads er id ", id);
  const {
    data: lead,
    error: leadError,
    isLoading: leadLoading,
  } = useGetLeadDetailsQuery(id);
  const [sendMessage, { isLoading: isSending, error: sendError }] =
    useSendMessegeMutation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (lead && lead.messages) {
      setMessages(lead.messages);
    }
  }, [lead?.messages]);
  const handleSendMessage = async (newMessage) => {
    console.log("handleSendMessage:", newMessage);

    // Create a new message data object
    const newMessageData = {
      _id: Date.now().toString(), // Temporary ID until the server returns the real one
      content: newMessage,
      senderId: "You",
      sentByMe: true,
      date: new Date().toISOString(),
    };

    // Optimistically add the new message to the UI
    setMessages((prevMessages) => [...prevMessages, newMessageData]);

    try {
      const result = await sendMessage({
        id,
        message: newMessage,
      }).unwrap();

      console.log("Message sent successfully:", result);

      // Update the message ID with the one returned from the server
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === newMessageData._id
            ? { ...msg, _id: result.data.messageId }
            : msg
        )
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      // Remove the optimistic message if sending fails
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== newMessageData._id)
      );
    }
  };

  if (leadLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (leadError) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <Text>Error loading messages</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <InboxHeader name={lead?.name || "Unknown"} />
      <ScrollView className="p-4">
        {messages.map((message) => (
          <View
            key={message._id}
            className={`flex-row mb-2 ${
              message.sentByMe ? "justify-end" : "justify-start"
            }`}
          >
            <Text
              className={`p-2 rounded-lg shadow ${
                message.sentByMe ? "bg-blue-100" : "bg-white"
              }`}
            >
              {message.content}
            </Text>
          </View>
        ))}
      </ScrollView>
      <MessageInput onSendMessage={handleSendMessage} />
      {isSending && (
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black bg-opacity-50">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {sendError && (
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-600">
          <Text className="text-white text-center">Failed to send message</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Inbox;
