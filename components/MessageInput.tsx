import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <View className="flex-row items-center bg-white p-3 rounded-full shadow my-2">
      <TouchableOpacity>
        <Icon name="emoticon-outline" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="microphone-outline"
          size={24}
          color="gray"
          style={{ marginHorizontal: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="image-outline" size={24} color="gray" />
      </TouchableOpacity>
      <TextInput
        className="flex-1 ml-2"
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button onPress={handleSend}>
      <Icon name="send" size={24} />

      </Button>
    </View>
  );
};

export default MessageInput;
