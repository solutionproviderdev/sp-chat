import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import InboxHeader from "../../components/InboxHeader";
import MessageInput from "../../components/MessageInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useGetLeadDetailsQuery, useSendMessegeMutation } from "@redux/features/lead-center/leadCenterAPI";


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
  }, [lead]);

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
      <ScrollView className="p-4  ">
        {messages.map((message) => (
          <View
            key={message._id}
            className={`flex-row mb-2 ${
              message.sentByMe ? "justify-end" : "justify-start"
            }`}
          >
            <Text
              className={`p-2 mb-2 rounded-lg shadow ${
                message.sentByMe ? "bg-blue-100" : "bg-white"
              }`}
            >
              {message.content}
            </Text>
          </View>
        ))}
      </ScrollView>
      <MessageInput onSendMessage={handleSendMessage} />
      {sendError && (
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-600">
          <Text className="text-white text-center">Failed to send message</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Inbox;



// import React, { useState, useEffect } from "react";
// import { ScrollView, View, Text, ActivityIndicator } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import InboxHeader from "../../components/InboxHeader";
// import MessageInput from "../../components/MessageInput";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// // import { useGetLeadDetailsQuery, useSendMessegeMutation } from "@redux/lead-center/leadCenterAPI";
// import useSocket from '../../hooks/useSocket'; // Ensure this path is correct
// import { useGetLeadDetailsQuery, useSendMessegeMutation } from "@redux/features/lead-center/leadCenterAPI";

// const serverUrl = 'http://localhost:3000'; // Replace with your server URL

// const Inbox = () => {
//   const { id } = useLocalSearchParams();
//   console.log("leads er id ", id);
//   const {
//     data: lead,
//     error: leadError,
//     isLoading: leadLoading,
//   } = useGetLeadDetailsQuery(id);
//   const [sendMessage, { isLoading: isSending, error: sendError }] =
//     useSendMessegeMutation();
//   const [messages, setMessages] = useState([]);
//   const socket = useSocket(serverUrl);

//   useEffect(() => {
//     if (lead && lead.messages) {
//       setMessages(lead.messages);
//     }
//   }, [lead]);

//   useEffect(() => {
//     if (socket) {
//       socket.on('conversation', (newMessage) => {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       });
//     }
//     return () => {
//       if (socket) {
//         socket.off('conversation');
//       }
//     };
//   }, [socket]);

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
//     setMessages((prevMessages) => [...prevMessages, newMessageData]);

//     try {
//       const result = await sendMessage({
//         id,
//         message: newMessage,
//       }).unwrap();

//       console.log("Message sent successfully:", result);

//       // Update the message ID with the one returned from the server
//       setMessages((prevMessages) =>
//         prevMessages.map((msg) =>
//           msg._id === newMessageData._id
//             ? { ...msg, _id: result.data.messageId }
//             : msg
//         )
//       );
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       // Remove the optimistic message if sending fails
//       setMessages((prevMessages) =>
//         prevMessages.filter((msg) => msg._id !== newMessageData._id)
//       );
//     }
//   };

//   if (leadLoading) {
//     return (
//       <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
//         <ActivityIndicator size="large" color="#0000ff" />
//       </SafeAreaView>
//     );
//   }

//   if (leadError) {
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
//               className={`p-2 mb-2 rounded-lg shadow ${
//                 message.sentByMe ? "bg-blue-100" : "bg-white"
//               }`}
//             >
//               {message.content}
//             </Text>
//           </View>
//         ))}
//       </ScrollView>
//       <MessageInput onSendMessage={handleSendMessage} />
//       {sendError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-600">
//           <Text className="text-white text-center">Failed to send message</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default Inbox;







// import React, { useState, useEffect } from "react";
// import { ScrollView, View, Text, ActivityIndicator } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import InboxHeader from "../../components/InboxHeader";
// import MessageInput from "../../components/MessageInput";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   useGetLeadDetailsQuery,
//   useSendMessegeMutation,
// } from "@redux/features/lead-center/leadCenterAPI";


// const Inbox = () => {
//   const { id } = useLocalSearchParams();
//   console.log("leads er id ", id);
//   const {
//     data: lead,
//     error: leadError,
//     isLoading: leadLoading,
//   } = useGetLeadDetailsQuery(id);
//   const [sendMessage, { isLoading: isSending, error: sendError }] =
//     useSendMessegeMutation();
//   const [messages, setMessages] = useState([]);


//   useEffect(() => {
//     if (lead && lead.messages) {
//       setMessages(lead.messages);
//     }
//   }, [lead?.messages]);
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
//     setMessages((prevMessages) => [...prevMessages, newMessageData]);


//     try {
//       const result = await sendMessage({
//         id,
//         message: newMessage,
//       }).unwrap();


//       console.log("Message sent successfully:", result);


//       // Update the message ID with the one returned from the server
//       setMessages((prevMessages) =>
//         prevMessages.map((msg) =>
//           msg._id === newMessageData._id
//             ? { ...msg, _id: result.data.messageId }
//             : msg
//         )
//       );
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       // Remove the optimistic message if sending fails
//       setMessages((prevMessages) =>
//         prevMessages.filter((msg) => msg._id !== newMessageData._id)
//       );
//     }
//   };


//   if (leadLoading) {
//     return (
//       <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
//         <ActivityIndicator size="large" color="#0000ff" />
//       </SafeAreaView>
//     );
//   }


//   if (leadError) {
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
//       {isSending && (
//         <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black bg-opacity-50">
//           <ActivityIndicator size="large" color="#fff" />
//         </View>
//       )}
//       {sendError && (
//         <View className="absolute bottom-0 left-0 right-0 p-4 bg-red-600">
//           <Text className="text-white text-center">Failed to send message</Text>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };


// export default Inbox;









