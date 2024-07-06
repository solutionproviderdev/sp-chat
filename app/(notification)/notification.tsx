import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const NotificationCard = () => {
  const notifications = [
    { id: '1', title: "New Message", description: "You have received a new message." },
    { id: '2', title: "Meeting Reminder", description: "Don't forget your meeting at 3 PM." },
    { id: '3', title: "Task Due", description: "Your task is due tomorrow." },
    { id: '4', title: "Profile Update", description: "Your profile has been updated." },
    { id: '5', title: "New Connection", description: "You have a new connection request." },
    { id: '6', title: "Password Changed", description: "Your password was changed successfully." },
    { id: '7', title: "New Comment", description: "Someone commented on your post." },
    { id: '8', title: "Mention", description: "You were mentioned in a comment." },
    { id: '9', title: "Like", description: "Your post received a new like." },
    { id: '10', title: "Follow", description: "You have a new follower." },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View className='bg-blue-100 p-4 m-2 rounded-lg shadow-md'>
        <Text className='text-lg font-bold'>{item.title}</Text>
        <Text className='text-sm text-gray-600'>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default NotificationCard;
