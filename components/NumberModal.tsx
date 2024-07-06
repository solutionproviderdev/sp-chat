import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NumberModal = ({ isVisible, onClose, onSave }) => {
  const [number, setNumber] = useState("");

  const handleSave = () => {
    onSave(number);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <View className="bg-white p-6 rounded-3xl shadow-md w-4/5">
          <Text className="font-bold text-lg mb-4">Enter Number</Text>
          <TextInput
            value={number}
            onChangeText={setNumber}
            placeholder="Enter Number"
            keyboardType="numeric"
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="bg-blue-500 py-2 px-4 rounded-full"
              onPress={handleSave}
            >
              <Text className="text-white">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-300 py-2 px-4 rounded-full"
              onPress={onClose}
            >
              <Text className="text-black">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NumberModal;
