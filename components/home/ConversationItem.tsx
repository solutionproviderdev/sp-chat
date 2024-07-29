import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import noProfile from '../../assets/images/No Profile Search.png';

const ConversationItem = ({
	name,
	image,
	tab,
	creName,
	status,
	message,
	time,
	unreadCount = 50,
	onPress,
	onUnreadPress,
}: {
	name: string;
	image: string;
	message: string;
	time: string;
	unreadCount: number;
	onPress: () => void;
	onUnreadPress: () => void;
}) => {

	return (
		<TouchableOpacity
			className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200"
			onPress={onPress}
		>
			<Image
				source={image ? image : noProfile}
				className="w-12 h-12 rounded-full mr-4"
			/>

			<View className="flex-1">
				<Text className="font-bold">{name}</Text>
				<Text className="text-gray-600 " numberOfLines={1} ellipsizeMode="tail">
					{message}
				</Text>
			</View>

			<View className="flex">
				{tab !== 'spchat' && (
					<View className="flex-row">
						<TouchableOpacity onPress={onUnreadPress}>
							<Text className="text-xs text-white bg-blue-300 py-1 px-1 rounded  mr-1">
								{status}
							</Text>
						</TouchableOpacity>
						{/* <Text className="py-1 px-1">{creName}</Text> */}
					</View>
				)}
				<View className="flex-row justify-center items-center">
					<Text className="text-gray-600 mr-2">{moment(time).fromNow()}</Text>
					<Text className="text-white bg-red-300 p-1 rounded-full font-bold">
						{unreadCount}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ConversationItem;
