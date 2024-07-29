import React, { useState, useEffect, useCallback } from 'react';
import {
	SafeAreaView,
	ScrollView,
	View,
	ActivityIndicator,
	Text,
	RefreshControl,
} from 'react-native';
import { useGetAllLeadConversationsQuery } from '@redux/features/lead-center/leadCenterAPI';
import Header from '../../components/home/Header';
import SearchBar from '../../components/home/SearchBar';
import ConversationItem from '../../components/home/ConversationItem';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { getInitializedSocket } from '@hooks/socketManager';
import { useIsFocused } from '@react-navigation/native';

const Leads = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(1);
	const [leads, setLeads] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const state = useSelector(state => state.auth);
	const isFocused = useIsFocused();

	const { data, error, isLoading, isFetching, refetch } =
		useGetAllLeadConversationsQuery({
			page,
			limit: 20,
		});

		console.log('image of no 4',leads[13]?.sourcePageProfilePicture)

	useEffect(() => {
		if (data && data.leads) {
			if (page === 1) {
				setLeads(data.leads);
			} else {
				setLeads(prevLeads => [...prevLeads, ...data.leads]);
			}
			setHasMore(data.leads.length === 20);
		}
	}, [data, page]);
	const connectSocket = useCallback(() => {
		const socket = getInitializedSocket();

		const handleConversation = updatedLead => {
			setLeads(prevLeads => {
				const leadExists = prevLeads.find(lead => lead._id === updatedLead._id);
				if (leadExists) {
					return [
						updatedLead,
						...prevLeads.filter(lead => lead._id !== updatedLead._id),
					];
				} else {
					return [updatedLead, ...prevLeads];
				}
			});
		};

		socket.on('conversation', handleConversation);
		console.log('Socket connected in Leads page');

		return () => {
			socket.off('conversation', handleConversation);
			console.log('Socket disconnected in Leads page');
		};
	}, []);

	useEffect(() => {
		let cleanup;
		if (isFocused) {
			cleanup = connectSocket();
			refetch();
		}
		return () => {
			if (cleanup) cleanup();
		};
	}, [isFocused, connectSocket, refetch]);

	const handleScroll = ({ nativeEvent }) => {
		const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
		if (
			layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 &&
			!isFetching &&
			hasMore
		) {
			setPage(prevPage => prevPage + 1);
		}
	};
	
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setPage(1);
		refetch().then(() => {
			setRefreshing(false);
			connectSocket();
		});
	}, [refetch, connectSocket]);
	
	return (
		<SafeAreaView className="h-full w-full mt-6">
			<Header title="Leads" className="" />
			<View className="w-full px-4">
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</View>
			<ScrollView
				className="mt-2"
				onScroll={handleScroll}
				scrollEventThrottle={16}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{leads?.map((conversation, index) => (
					<ConversationItem
						key={index}
						time={conversation?.lastMessageTime}
						image={conversation?.sourcePageProfilePicture}
						name={conversation?.name}
						creName={conversation?.creName}
						status={conversation.status}
						message={conversation?.lastMessage}
						onPress={() => router.push(`/(lead-inbox)/${conversation._id}`)}
					/>
				))}
				{isFetching && (
					<View style={{ padding: 10 }}>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				)}
				{!hasMore && !isFetching && (
					<View style={{ padding: 10 }}>
						<Text>No more leads to load</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Leads;
