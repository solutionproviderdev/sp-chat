import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

const ProfilePage = () => {
  // const profileImageUrl = "https://images.alphacoders.com/262/262943.jpg";
  // const backgroundImageUrl = "https://images.alphacoders.com/262/262943.jpg";

  const params = useLocalSearchParams(); // Get the 'id' parameter from the route

  const id = params["spchat-profile"];
  console.log("ididididididid", id);

  const profiles = [
    {
      id: 1,
      coverPhoto: "https://images.alphacoders.com/262/262943.jpg",
      profilePicture:
        "https://www.redwolf.in/image/cache/catalog/stickers/jerry-face-sticker-india-600x800.jpg?m=1687857111 bolsi!",
      time: "12:34",
      name: "salman fursi",
      phone: "123-456-7890",
      email: "jane.doe@example.com",
      address: "123 Main St, Springfield, USA",
      role: "developer",
    },
    {
      id: 2,
      coverPhoto: "https://images.alphacoders.com/262/262943.jpg",
      profilePicture:
        "https://www.redwolf.in/image/cache/catalog/stickers/jerry-face-sticker-india-600x800.jpg?m=1687857111",
      message: "hello there!",
      time: "12:35",
      name: "ali rahman",
      phone: "123-456-7890",
      email: "jane.doe@example.com",
      address: "123 Main St, Springfield, USA",
      role: "manager",
    },
    {
      id: 3,
      coverPhoto: "https://images.alphacoders.com/262/262943.jpg",
      profilePicture:
        "https://www.redwolf.in/image/cache/catalog/stickers/jerry-face-sticker-india-600x800.jpg?m=1687857111",
      message: "good morning!",
      name: "ayesha khan",
      time: "12:36",
      phone: "123-456-789076",
      email: "jane.doe@example.com",
      address: "123 Main St, Springfield, USA",
      role: "sales",
    },
    {
      id: 4,
      coverPhoto: "https://images.alphacoders.com/262/262943.jpg",
      profilePicture:
        "https://www.redwolf.in/image/cache/catalog/stickers/jerry-face-sticker-india-600x800.jpg?m=1687857111",
      name: "omar sharif",
      message: "what's up?",
      time: "12:37",
      phone: "123-456-0000",
      email: "jane.doe@example.com",
      address: "123 Main St, Springfield, USA",
      role: "cre",
    },
    {
      id: 5,
      coverPhoto: "https://images.alphacoders.com/262/262943.jpg",
      profilePicture:
        "https://www.redwolf.in/image/cache/catalog/stickers/jerry-face-sticker-india-600x800.jpg?m=1687857111",
      name: "nadia islam",
      message: "see you soon.",
      time: "12:38",
      phone: "123-456-7890",
      email: "jane.doe@example.com",
      address: "123 Main St, Springfield, USA",
      role: "graphic",
    },
  ];
  const profile = profiles.find((conv) => conv.id === parseInt(id));

  const profileImageUrl = profile?.coverPhoto;
  const backgroundImageUrl = profile?.profilePicture;
  console.log(
    "hare is my profile and all thingj",
    profileImageUrl,
    backgroundImageUrl,
    profile
  );

  return (
    <ScrollView className="flex-1 bg-white">
      {/* <Image
        className="w-full h-40 "
        source={{
          uri: profileImageUrl,
        }}
      />
      <View className="-mt-20 items-center">
        <Image
          source={{ uri: backgroundImageUrl }}
          className="w-40 h-40 rounded-full border-4 border-white"
        />
      </View> */}

      <Image
        style={{ width: "100%", height: 160 }}
        source={{ uri: profileImageUrl }}
      />

      <View style={{ marginTop: -80, alignItems: "center" }}>
        <View
        style
        >
        <Image
          source={{ uri: backgroundImageUrl }}
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            borderWidth: 4,
            borderColor: "white",
          }}
        />
      </View>
      </View>

      <View className="px-5 items-center">
        <Text className="text-2xl font-bold mt-5">{profile.name}</Text>
        <Text className="text-lg mt-2">Phone:{profile.phone}</Text>
        <Text className="text-lg mt-2">Email:{profile.email}</Text>
        <Text className="text-lg mt-2">Address:{profile.address}</Text>
        <Text className="text-lg mt-2">Profile:{profile.role}</Text>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
