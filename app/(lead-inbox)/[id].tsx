// ## hare all things is correct just get realtime is not

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import InboxHeader from '../../components/InboxHeader';
// import MessageInput from '../../components/MessageInput';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useGetLeadConversationDetailsQuery, useSendMessageMutation } from '@redux/features/lead-center/leadCenterAPI';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import NetInfo from "@react-native-community/netinfo";
// import { getSocket } from '@hooks/getSocket';

// const Inbox = () => {
//   const { id } = useLocalSearchParams();
//   const scrollViewRef = useRef(null);

//   const { data: lead, error: leadError, isLoading: leadLoading, refetch } = useGetLeadConversationDetailsQuery(id);
//   const [sendMessage, { isLoading: isSending, error: sendError }] = useSendMessageMutation();

//   const [messages, setMessages] = useState([]);
//   const [networkError, setNetworkError] = useState(false);

//   const updateMessage = useCallback((messageId, updates) => {
//     setMessages(prevMessages =>
//       prevMessages.map(msg =>
//         msg._id === messageId ? { ...msg, ...updates } : msg
//       )
//     );
//   }, []);

//   useEffect(() => {
//     refetch();
//   }, [id, refetch]);

//   useEffect(() => {
//     if (lead && lead.messages) {
//       setMessages(lead.messages);
//     }
//   }, [lead]);

//   useEffect(() => {
//     if (sendError) {
//       setNetworkError(true);
//     }
//   }, [sendError]);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       if (state.isConnected) {
//         setNetworkError(false);
//         retryFailedMessages();
//       } else {
//         setNetworkError(true);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const socket = getSocket();

//     socket.on(`fbMessage${id}`, message => {
//       if (!message.sentByMe) {
//         updateMessage(message);
//       }
//     });

//     return () => {
//       socket.off(`fbMessage${id}`);
//     };
//   }, [id, updateMessage]);

//   const retryFailedMessages = async () => {
//     const failedMessages = messages.filter(msg => msg.status === 'error');
//     for (const msg of failedMessages) {
//       try {
//         const result = await sendMessage({ id, message: msg.content }).unwrap();
//         updateMessage({ ...msg, _id: result.data.messageId, status: 'sent' });
//       } catch (error) {
//         console.error('Failed to retry message:', error);
//       }
//     }
//   };

//   const handleSendMessage = async newMessage => {
//     const tempMessageId = Date.now().toString();
//     const newMessageData = {
//       _id: tempMessageId,
//       content: newMessage,
//       senderId: "2078095355564923",
//       sentByMe: true,
//       date: new Date().toISOString(),
//       status: 'sending',
//     };

//     setMessages(prevMessages => [...prevMessages, newMessageData]);

//     try {
//       const result = await sendMessage({ id, message: newMessage }).unwrap();
//       updateMessage(tempMessageId, { _id: result.data.messageId, status: 'sent' });
//     } catch (error) {
//       console.error('Failed to send message:', error);
//       updateMessage(tempMessageId, { status: 'error' });
//     }
//   };

//   useEffect(() => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollToEnd({ animated: true });
//     }
//   }, [messages]);

//   // Rest of your component remains the same...

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       <InboxHeader name={lead?.name || 'Unknown'} />
//       {networkError && (
//         <View style={styles.networkError}>
//           <Text style={styles.networkErrorText}>No internet connection</Text>
//         </View>
//       )}

// <ScrollView
//       className="p-4"
//       ref={scrollViewRef}
//       onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
//     >
//       {messages.map(message => (
//         <View
//           key={message._id}
//           className={`flex-row mb-4 ${message.sentByMe ? 'justify-end' : 'justify-start'}`}
//         >
//           <View style={styles.messageContainer}>
//             <Text
//               className={`p-2 rounded-lg shadow ${message.sentByMe ? 'bg-blue-100' : 'bg-white'}`}
//               style={{
//                 alignSelf: message.sentByMe ? 'flex-end' : 'flex-start',
//               }}
//             >
//               {message.content}
//             </Text>
//             {message.sentByMe && (
//               <View style={styles.statusIcon}>
//                 {message.status === 'sending' && <ActivityIndicator size="small" color="#0000ff" />}
//                 {message.status === 'sent' && <Icon name="check-circle" size={16} color="blue" />}
//                 {message.status === 'error' && <Icon name="alert-circle" size={16} color="red" />}
//               </View>
//             )}
//           </View>
//         </View>
//       ))}
//     </ScrollView>

//       <MessageInput onSendMessage={handleSendMessage} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   messageContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     maxWidth: '75%',
//   },
//   statusIcon: {
//     marginLeft: 8,
//   },
//   networkError: {
//     backgroundColor: 'red',
//     padding: 8,
//     alignItems: 'center',
//   },
//   networkErrorText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default Inbox;

//## i can get as final code ok just incoming message override each other and once we go back and return in to inbox its show as messge need to show in a serial

// import React, {
// 	useState,
// 	useEffect,
// 	useRef,
// 	useCallback,
// 	useLayoutEffect,
// } from 'react';
// import {
// 	ScrollView,
// 	View,
// 	Text,
// 	ActivityIndicator,
// 	StyleSheet,
// } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import InboxHeader from '../../components/InboxHeader';
// import MessageInput from '../../components/MessageInput';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
// 	useGetLeadConversationDetailsQuery,
// 	useSendMessageMutation,
// } from '@redux/features/lead-center/leadCenterAPI';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import NetInfo from '@react-native-community/netinfo';
// import { getSocket } from '@hooks/getSocket';

// const Inbox = () => {
// 	const { id } = useLocalSearchParams();
// 	const scrollViewRef = useRef(null);

// 	const {
// 		data: lead,
// 		error: leadError,
// 		isLoading: leadLoading,
// 		refetch,
// 	} = useGetLeadConversationDetailsQuery(id);
// 	const [sendMessage, { isLoading: isSending, error: sendError }] =
// 		useSendMessageMutation();

// 	const [messages, setMessages] = useState([]);
// 	const [networkError, setNetworkError] = useState(false);

// 	// console.log('messages hare', messages);

// 	const updateMessages = useCallback(
// 		newMessage => {
// 			setMessages(prevMessages => {
// 				const existingMessageIndex = prevMessages.findIndex(
// 					msg => msg._id === newMessage._id
// 				);
// 				if (existingMessageIndex !== -1) {
// 					// Update existing message
// 					const updatedMessages = [...prevMessages];
// 					updatedMessages[existingMessageIndex] = {
// 						...updatedMessages[existingMessageIndex],
// 						...newMessage,
// 					};
// 					return updatedMessages;
// 				} else {
// 					// Add new message
// 					return [...prevMessages, newMessage];
// 				}
// 			});
// 		},
// 		[messages]
// 	);

// 	const updateMessage = useCallback((messageId, updates) => {
// 		setMessages(prevMessages =>
// 			prevMessages.map(msg =>
// 				msg._id === messageId ? { ...msg, ...updates } : msg
// 			)
// 		);
// 	}, []);

// 	useEffect(() => {
// 		refetch();
// 	}, [id, refetch]);

// 	useEffect(() => {
// 		if (lead && lead.messages) {
// 			setMessages(lead.messages);
// 		}
// 	}, [lead]);

// 	useEffect(() => {
// 		if (sendError) {
// 			setNetworkError(true);
// 		}
// 	}, [sendError]);

// 	useEffect(() => {
// 		const unsubscribe = NetInfo.addEventListener(state => {
// 			if (state.isConnected) {
// 				setNetworkError(false);
// 				retryFailedMessages();
// 			} else {
// 				setNetworkError(true);
// 			}
// 		});

// 		return () => unsubscribe();
// 	}, []);

// 	useLayoutEffect(() => {
// 		console.log('Here inside --> ');
// 		const socket = getSocket();

// 		socket.on(`fbMessage${id}`, message => {
// 			console.log('message --> ', message);
// 			if (!message.sentByMe) {
// 				updateMessages(message);
// 			}
// 		});

// 		return () => {
// 			console.log('getting offf--');
// 			socket.off(`fbMessage${id}`);
// 		};
// 	}, [id]);

// 	const retryFailedMessages = async () => {
// 		const failedMessages = messages.filter(msg => msg.status === 'error');
// 		for (const msg of failedMessages) {
// 			try {
// 				const result = await sendMessage({ id, message: msg.content }).unwrap();
// 				updateMessage({ ...msg, _id: result.data.messageId, status: 'sent' });
// 			} catch (error) {
// 				console.log('Failed to retry message:', error);
// 			}
// 		}
// 	};

// 	const handleSendMessage = async newMessage => {
// 		const tempMessageId = Date.now().toString();
// 		const newMessageData = {
// 			_id: tempMessageId,
// 			content: newMessage,
// 			senderId: '2078095355564923',
// 			sentByMe: true,
// 			date: new Date().toISOString(),
// 			status: 'sending',
// 		};

// 		setMessages(prevMessages => [...prevMessages, newMessageData]);

// 		try {
// 			const result = await sendMessage({ id, message: newMessage }).unwrap();
// 			updateMessage(tempMessageId, {
// 				_id: result.data.messageId,
// 				status: 'sent',
// 			});
// 		} catch (error) {
// 			console.log('Failed to send message:', error);
// 			updateMessage(tempMessageId, { status: 'error' });
// 		}
// 	};

// 	useEffect(() => {
// 		if (scrollViewRef.current) {
// 			scrollViewRef.current.scrollToEnd({ animated: true });
// 		}
// 	}, [messages]);

// 	// Rest of your component remains the same...

// 	return (
// 		<SafeAreaView className="flex-1 bg-gray-100">
// 			<InboxHeader name={lead?.name || 'Unknown'} />
// 			{networkError && (
// 				<View style={styles.networkError}>
// 					<Text style={styles.networkErrorText}>No internet connection</Text>
// 				</View>
// 			)}

// 			<ScrollView
// 				className="p-4"
// 				ref={scrollViewRef}
// 				onContentSizeChange={() =>
// 					scrollViewRef.current.scrollToEnd({ animated: true })
// 				}
// 			>
// 				{messages.map((message, index) => (
// 					<View
// 						key={`message__${message._id}__index__${index}`}
// 						className={`flex-row mb-4 ${
// 							message.sentByMe ? 'justify-end' : 'justify-start'
// 						}`}
// 					>
// 						<View style={styles.messageContainer}>
// 							<Text
// 								className={`p-2 rounded-lg shadow ${
// 									message.sentByMe ? 'bg-blue-100' : 'bg-white'
// 								}`}
// 								style={{
// 									alignSelf: message.sentByMe ? 'flex-end' : 'flex-start',
// 								}}
// 							>
// 								{message.content}
// 							</Text>
// 							{message.sentByMe && (
// 								<View style={styles.statusIcon}>
// 									{message.status === 'sending' && (
// 										<ActivityIndicator size="small" color="#0000ff" />
// 									)}
// 									{message.status === 'sent' && (
// 										<Icon name="check-circle" size={16} color="blue" />
// 									)}
// 									{message.status === 'error' && (
// 										<Icon name="alert-circle" size={16} color="red" />
// 									)}
// 								</View>
// 							)}
// 						</View>
// 					</View>
// 				))}
// 			</ScrollView>

// 			<MessageInput onSendMessage={handleSendMessage} />
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	messageContainer: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		maxWidth: '75%',
// 	},
// 	statusIcon: {
// 		marginLeft: 8,
// 	},
// 	networkError: {
// 		backgroundColor: 'red',
// 		padding: 8,
// 		alignItems: 'center',
// 	},
// 	networkErrorText: {
// 		color: 'white',
// 		fontWeight: 'bold',
// 	},
// });

// export default Inbox;

// ## final code
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	ScrollView,
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import InboxHeader from '../../components/InboxHeader';
import MessageInput from '../../components/MessageInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
	useGetLeadConversationDetailsQuery,
	useSendMessageMutation,
} from '@redux/features/lead-center/leadCenterAPI';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';
import { getSocket } from '@hooks/getSocket';

const Inbox = () => {
	const { id } = useLocalSearchParams();
	const scrollViewRef = useRef(null);
	const socketRef = useRef(null);

	const {
		data: lead,
		error: leadError,
		isLoading: leadLoading,
		refetch,
	} = useGetLeadConversationDetailsQuery(id);
	const [sendMessage, { isLoading: isSending, error: sendError }] =
		useSendMessageMutation();

	const [messages, setMessages] = useState([]);
	const [networkError, setNetworkError] = useState(false);
	const [socketConnected, setSocketConnected] = useState(false);

	const updateMessages = useCallback(newMessage => {
		setMessages(prevMessages => [...prevMessages, newMessage]);
	}, []);

	const updateMessage = useCallback((messageId, updates) => {
		setMessages(prevMessages =>
			prevMessages.map(msg =>
				msg._id === messageId ? { ...msg, ...updates } : msg
			)
		);
	}, []);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const result = await refetch();
				if (result.data && result.data.messages) {
					setMessages(result.data.messages);
				}
			} catch (error) {
				console.error('Failed to fetch messages:', error);
			}
		};

		fetchMessages();
	}, [id, refetch]);

	useEffect(() => {
		console.log('Setting up socket connection');
		const socket = getSocket();
		socketRef.current = socket;

		socket.on('connect', () => {
			console.log('Socket connected');
			setSocketConnected(true);
		});

		socket.on('disconnect', () => {
			console.log('Socket disconnected');
			setSocketConnected(false);
		});

		socket.on(`fbMessage${id}`, message => {
			console.log('Received message:', message);
			if (!message.sentByMe) {
				updateMessages(message);
			}
		});

		return () => {
			console.log('Cleaning up socket connection');
			socket.off(`fbMessage${id}`);
			socket.disconnect();
		};
	}, [id, updateMessages]);

	useEffect(() => {
		if (sendError) {
			setNetworkError(true);
		}
	}, [sendError]);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener(state => {
			if (state.isConnected) {
				setNetworkError(false);
				retryFailedMessages();
			} else {
				setNetworkError(true);
			}
		});

		return () => unsubscribe();
	}, []);

	const retryFailedMessages = async () => {
		const failedMessages = messages.filter(msg => msg.status === 'error');
		for (const msg of failedMessages) {
			try {
				const result = await sendMessage({ id, message: msg.content }).unwrap();
				updateMessage(msg._id, { _id: result.data.messageId, status: 'sent' });
			} catch (error) {
				console.log('Failed to retry message:', error);
			}
		}
	};

	const handleSendMessage = async newMessage => {
		const tempMessageId = Date.now().toString();
		const newMessageData = {
			_id: tempMessageId,
			content: newMessage,
			senderId: '2078095355564923',
			sentByMe: true,
			date: new Date().toISOString(),
			status: 'sending',
		};

		setMessages(prevMessages => [...prevMessages, newMessageData]);

		try {
			const result = await sendMessage({ id, message: newMessage }).unwrap();
			updateMessage(tempMessageId, {
				_id: result.data.messageId,
				status: 'sent',
			});
		} catch (error) {
			console.log('Failed to send message:', error);
			updateMessage(tempMessageId, { status: 'error' });
		}
	};

	useEffect(() => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollToEnd({ animated: true });
		}
	}, [messages]);

	return (
		<SafeAreaView className="flex-1 bg-gray-100">
			<InboxHeader name={lead?.name || 'Unknown'} />
			{networkError && (
				<View style={styles.networkError}>
					<Text style={styles.networkErrorText}>No internet connection</Text>
				</View>
			)}
			{!socketConnected && (
				<View style={styles.socketStatus}>
					<Text style={styles.socketStatusText}>
						Connecting to chat server...
					</Text>
				</View>
			)}

			<ScrollView
				className="p-4"
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef.current.scrollToEnd({ animated: true })
				}
			>
				{messages.map((message, index) => (
					<View
						key={`message__${message._id}__index__${index}`}
						className={`flex-row mb-4 ${
							message.sentByMe ? 'justify-end' : 'justify-start'
						}`}
					>
						<View style={styles.messageContainer}>
							<Text
								className={`p-2 rounded-lg shadow ${
									message.sentByMe ? 'bg-blue-100' : 'bg-white'
								}`}
								style={{
									alignSelf: message.sentByMe ? 'flex-end' : 'flex-start',
								}}
							>
								{message.content}
							</Text>
							{message.sentByMe && (
								<View style={styles.statusIcon}>
									{message.status === 'sending' && (
										<ActivityIndicator size="small" color="#0000ff" />
									)}
									{message.status === 'sent' && (
										<Icon name="check-circle" size={16} color="blue" />
									)}
									{message.status === 'error' && (
										<Icon name="alert-circle" size={16} color="red" />
									)}
								</View>
							)}
						</View>
					</View>
				))}
			</ScrollView>

			<MessageInput onSendMessage={handleSendMessage} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		maxWidth: '75%',
	},
	statusIcon: {
		marginLeft: 8,
	},
	networkError: {
		backgroundColor: 'red',
		padding: 8,
		alignItems: 'center',
	},
	networkErrorText: {
		color: 'white',
		fontWeight: 'bold',
	},
	socketStatus: {
		backgroundColor: '#FFA500',
		padding: 8,
		alignItems: 'center',
	},
	socketStatusText: {
		color: 'white',
		fontWeight: 'bold',
	},
});

export default Inbox;
