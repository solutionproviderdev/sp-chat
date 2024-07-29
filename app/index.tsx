import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import validateToken from '../utils/validateToken';
import { userLoggedIn } from '@redux/features/auth/authSlice';
import SPChatLogo from '../assets/images/SPChat-logo.png';

const Index = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

	useEffect(() => {
		const checkToken = async () => {
			const token = await validateToken();
			if (token) {
				// Assuming your token contains the user info
				const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
				dispatch(userLoggedIn({ user, token }));
			}
			setIsLoading(false);
		};

		checkToken();
	}, [dispatch]);

	const handleLoginPress = () => {
		if (isAuthenticated) {
			router.replace('/leads');
		} else {
			router.push('/signin');
		}
	};

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#f3f4f6',
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'center',
					alignItems: 'center',
					padding: 20,
				}}
			>
				<Image
					source={SPChatLogo}
					className='h-32 w-32'
				/>

				<Text
					style={{
						fontSize: 30,
						fontWeight: 'bold',
						marginBottom: 20,
						color: '#000',
					}}
				>
					Welcome to SPChat
				</Text>
				<Text
					style={{
						fontSize: 16,
						textAlign: 'center',
						marginBottom: 40,
						color: '#4a4a4a',
					}}
				>
					Connect with your leads and team members efficiently. Streamline your
					communication and enhance your productivity with SPChat.
				</Text>
				<Button
					mode="contained"
					style={{ width: '100%', backgroundColor: '#6200ee' }}
					labelStyle={{ color: 'white' }}
					onPress={handleLoginPress}
				>
					{isAuthenticated ? 'Go to Leads' : 'Login to SPChat'}
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Index;
