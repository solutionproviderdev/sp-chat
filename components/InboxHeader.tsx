import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import MeetingModal from './MeetingModal'; // Import the MeetingModal component
import NumberModal from './NumberModal'; // Import the NumberModal component
import { StatusBar } from 'expo-status-bar';

const InboxHeader = ({ name, id }: { name: string; id: string }) => {
	const navigation = useNavigation();
	const [selectedStatus, setSelectedStatus] = useState('unread'); // State for selected status
	const [isMeetingModalVisible, setMeetingModalVisible] = useState(false); // State for Meeting Modal visibility
	const [isNumberModalVisible, setNumberModalVisible] = useState(false); // State for Number Modal visibility
	const [collectedNumber, setCollectedNumber] = useState(''); // State to store collected number

	const statusOptions = [
		{ label: 'Read', value: 'read' },
		{ label: 'Number collected', value: 'number_collected' },
		{ label: 'Meeting', value: 'meeting' },
	];

	const handleStatusChange = value => {
		setSelectedStatus(value);
		if (value === 'meeting') {
			setMeetingModalVisible(true);
		} else if (value === 'number_collected') {
			setNumberModalVisible(true);
		}
	};

	const handleSaveNumber = number => {
		setCollectedNumber(number);
		console.log('Collected Number:', number);
	};

	return (
		<View className="flex-row justify-between items-center py-1 px-2 bg-white shadow">
			<Text className="text-xl font-bold">{name}</Text>

			<View className="flex-row gap-2 items-center">
				<View className="rounded-md" style={{ width: 150 }}>
					<RNPickerSelect
						onValueChange={handleStatusChange}
						items={statusOptions}
						style={{
							inputIOS: {
								borderColor: '#ccc',
								borderWidth: 1,
								borderRadius: 8,
								padding: 12,
								color: 'black',
							},
							inputAndroid: {
								borderColor: '#ccc',
								borderWidth: 1,
								borderRadius: 8,
								padding: 12,
								color: 'black',
							},
							iconContainer: {
								top: 10,
								right: 12,
							},
						}}
						value={selectedStatus}
						placeholder={{ label: 'Unread', value: 'unread' }}
						Icon={() => {
							return <Icon name="chevron-down" size={24} color="gray" />;
						}}
					/>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('lead-profile')}>
					<Icon name="information" size={24} color="black" />
				</TouchableOpacity>
			</View>

			{/* Meeting Modal */}
			<MeetingModal
				isVisible={isMeetingModalVisible}
				onClose={() => setMeetingModalVisible(false)}
			/>

			{/* Number Modal */}
			<NumberModal
				isVisible={isNumberModalVisible}
				onClose={() => setNumberModalVisible(false)}
				onSave={handleSaveNumber}
			/>
		</View>
	);
};

export default InboxHeader;
