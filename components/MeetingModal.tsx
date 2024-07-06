import React, { useState } from 'react';
import { Modal, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const MeetingModal = ({ isVisible, onClose }) => {
  const [clientName, setClientName] = useState("");
  const [creName, setCreName] = useState("");
  const [clientRequirement, setClientRequirement] = useState("");
  const [address, setAddress] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(""); // Dropdown state
  const [selectedSchedule, setSelectedSchedule] = useState(""); // Radio button state
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const salesTeams = [
    { label: "Team A", value: "team_a" },
    { label: "Team B", value: "team_b" },
    { label: "Team C", value: "team_c" },
  ];

  const scheduleOptions = [
    { label: "Morning", value: "morning" },
    { label: "Afternoon", value: "afternoon" },
    { label: "Noon", value: "noon" },
    { label: "After Night", value: "after_night" },
  ];

  const handleSaveMeeting = () => {
    const meeting = {
      clientName,
      creName,
      clientRequirement,
      address,
      selectedTeam,
      selectedSchedule,
      date,
    };

    // Log the meeting data to the console
    console.log("Meeting Data:", meeting);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-gray-100">
        <StatusBar style="white" backgroundColor="#f2f2f2" />

        <ScrollView className="mt-2 p-4">
          <View className="p-5 rounded-3xl bg-white shadow-md">
            <Text className="font-bold text-lg">Client Details:</Text>
            <View className="flex-row mt-5 items-center">
              <Text className="w-1/3 mr-2">Client Name:</Text>
              <TextInput
                value={clientName}
                onChangeText={setClientName}
                placeholder="Enter Client Name"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
            </View>
            <View className="flex-row mt-5 items-center">
              <Text className="w-1/3 mr-2">CRE Name:</Text>
              <TextInput
                value={creName}
                onChangeText={setCreName}
                placeholder="Enter CRE Name"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
            </View>
            <View className="flex-row mt-5 items-center">
              <Text className="w-1/3 mr-2">Client Requirement:</Text>
              <TextInput
                value={clientRequirement}
                onChangeText={setClientRequirement}
                placeholder="Enter Client Requirement"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
            </View>
            <View className="flex-row mt-5 items-center">
              <Text className="w-1/3 mr-2">Address:</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Enter Address"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
              />
            </View>
          </View>

          <View className="p-5 rounded-3xl bg-white shadow-md mt-5">
            <Text className="font-bold text-lg">Select Date</Text>
            <View className="mt-2">
              <TouchableOpacity
                className="bg-blue-500 py-2 px-4 rounded-full"
                onPress={() => setDatePickerVisible(true)}
              >
                <Text className="text-white">Select Date</Text>
              </TouchableOpacity>
              <Text className="mx-auto p-2">{date.toDateString()}</Text>
              {isDatePickerVisible && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setDatePickerVisible(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>
          </View>

          <View className="p-5 rounded-3xl bg-white shadow-md mt-5">
            <Text className="font-bold text-lg">Sales Team:</Text>
            <View className="flex-row mt-5 items-center">
              <View className="flex-1">
                {salesTeams.map((team) => (
                  <TouchableOpacity
                    key={team.value}
                    className={`border border-gray-300 rounded-md px-3 py-2 mt-2 ${
                      selectedTeam === team.value ? 'bg-blue-300' : 'bg-white'
                    }`}
                    onPress={() => setSelectedTeam(team.value)}
                  >
                    <Text>{team.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View className="p-5 rounded-3xl bg-white shadow-md mt-5">
            <Text className="font-bold text-lg">Schedule</Text>
            <View className="flex-row mt-3 items-center">
              <View className="flex-1">
                {scheduleOptions.map((option) => (
                  <View key={option.value} className="flex-row items-center mb-2">
                    <RadioButton
                      value={option.value}
                      status={selectedSchedule === option.value ? 'checked' : 'unchecked'}
                      onPress={() => setSelectedSchedule(option.value)}
                    />
                    <Text className="ml-2">{option.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="mt-5 mb-4">
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-lg items-center mb-4"
              onPress={handleSaveMeeting}
            >
              <Text className="text-white font-bold text-lg">Save Meeting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-300 py-4 rounded-lg items-center mb-4"
              onPress={onClose}
            >
              <Text className="text-black font-bold text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default MeetingModal;
