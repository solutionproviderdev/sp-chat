import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RNPickerSelect from "react-native-picker-select";
import LeadProfileHeader from "@components/LeadProfileHeader";

const LeadProfile = () => {
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [assignedCre, setAssignedCre] = useState(""); // Dropdown state
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // State to manage expansion

  const creOptions = [
    { label: "CRE A", value: "cre_a" },
    { label: "CRE B", value: "cre_b" },
    { label: "CRE C", value: "cre_c" },
  ];

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSendComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment(""); // Clear the input after sending
    }
  };

  const handleSubmit = () => {
    const formData = {
      clientName,
      phoneNumber,
      address,
      tags,
      assignedCre,
      comments,
    };
    console.log("Form Data:", formData);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 mt-6">
      <LeadProfileHeader name={"John Doe"} />
      <View className="p-4">
        <View className="p-5 rounded-3xl bg-white shadow-md">
          <Text className="font-bold text-lg">Assigned CRE</Text>
          <View className="mt-5">
            <RNPickerSelect
              onValueChange={(value) => setAssignedCre(value)}
              items={creOptions}
              style={{
                inputIOS: {
                  borderColor: "#ccc",
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  color: "black",
                },
                inputAndroid: {
                  borderColor: "#ccc",
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  color: "black",
                },
              }}
              value={assignedCre}
            />
          </View>
        </View>

        <View className="p-5 rounded-3xl bg-white shadow-md mt-5">
          <Text className="font-bold text-lg">Client Details</Text>
          <View className="flex-row mt-5 items-center">
            <TextInput
              value={clientName}
              onChangeText={setClientName}
              placeholder="Client Name"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            />
          </View>
          <View className="flex-row mt-5 items-center">
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            />
          </View>
          <View className="flex-row mt-5 items-center">
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Address"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            />
          </View>
        </View>

        <View className="p-5 rounded-3xl bg-white shadow-md mt-5">
          <Text className="font-bold text-lg">Tags</Text>
          <View className="flex-row mt-5 items-center">
            <TextInput
              value={tagInput}
              onChangeText={setTagInput}
              placeholder="Add Tag"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            />
            <Button mode="contained" className="ml-2" onPress={handleAddTag}>
              Add
            </Button>
          </View>
          <View className="flex-row flex-wrap mt-3">
            {tags.map((tag, index) => (
              <View
                key={index}
                className="bg-blue-100 px-3 py-2 rounded-full flex-row items-center mr-2 mt-2"
              >
                <Text>{tag}</Text>
                <TouchableOpacity
                  onPress={() => handleDeleteTag(tag)}
                  className="ml-2"
                >
                  <Icon name="close-circle" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View
          className={`p-5 rounded-3xl bg-white shadow-md mt-5 ${
            isExpanded ? "flex-1" : ""
          }`}
        >
          <Text className="font-bold text-lg">Comments</Text>
          {!isExpanded && comments.length > 0 && (
            <TouchableOpacity
              onPress={() => setIsExpanded(true)}
              className="mt-3"
            >
              <Text className="flex-1 p-3 mb-2 bg-blue-50 rounded-md">
                {comments[0]}
              </Text>
            </TouchableOpacity>
          )}
          {isExpanded && (
            <ScrollView className="flex-1 mt-3">
              {comments.map((comment, index) => (
                <View key={index} className="p-3 mb-2 bg-blue-50 rounded-md">
                  <Text>{comment}</Text>
                </View>
              ))}
            </ScrollView>
          )}
          {comments.length > 0 && (
            <Button
              mode="text"
              className="mt-2"
              onPress={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "See less" : "See more"}
            </Button>
          )}

          <View className="flex-row items-center bg-white p-3 rounded-full shadow my-2 mt-5">
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
              className="   ml-2"
              placeholder="Type a comment"
              value={comment}
              onChangeText={setComment}
            />
            <Button onPress={handleSendComment}>
              <Icon name="send" size={24} className="" />
            </Button>
            
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

export default LeadProfile;
