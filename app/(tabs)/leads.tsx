// ## final code
import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	View,
	ActivityIndicator,
	Text,
	StatusBar,
} from 'react-native';
import { useGetAllLeadConversationsQuery } from '@redux/features/lead-center/leadCenterAPI';
import { getSocket } from '@hooks/getSocket';
import Header from '../../components/home/Header';
import SearchBar from '../../components/home/SearchBar';
import FilterSection from '../../components/home/FilterSection';
import ConversationItem from '../../components/home/ConversationItem';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';

const Leads = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filter, setFilter] = useState('all');
	const [page, setPage] = useState(1);
	const [leads, setLeads] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const state = useSelector(state => state.auth);

	console.log('RootState:', state);

	const { data, error, isLoading, isFetching } =
		useGetAllLeadConversationsQuery({
			page,
			limit: 20,
		});

	// console.log('name ta undefine check korar jconno',leads)

	useEffect(() => {
		if (data && data.leads) {
			if (page === 1) {
				setLeads(data.leads);
			} else {
				setLeads(prevLeads => [...prevLeads, ...data.leads]);
			}
			if (data.leads.length === 0) {
				setHasMore(false);
			}
		}
	}, [data, page]);

	useEffect(() => {
		const socket = getSocket();
		socket.io.on('ping', () => {
			console.log('Connected to socket.io server');
		});

		socket.on('conversation', updatedLead => {
			// console.log('socket leads:', updatedLead);
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
		});

		return () => {
			socket.off('conversation');
		};
	}, []);

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

	return (
		<SafeAreaView className="h-full w-full">
			<Header title="Leads" className="mt-10" />
			<View className="w-full px-4">
				<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			</View>
			<ScrollView
				className="mt-2"
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				{leads?.map((conversation, index) => (
					<ConversationItem
						key={index}
            time={conversation?.lastMessageTime}
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
			<StatusBar backgroundColor={'#fff'} />
		</SafeAreaView>
	);
};

export default Leads;
