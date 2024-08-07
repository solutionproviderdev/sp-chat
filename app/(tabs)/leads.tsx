import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	ScrollView,
	View,
	ActivityIndicator,
	Text,
	StatusBar,
} from 'react-native';
import { useGetLeadsQuery } from '@redux/features/lead-center/leadCenterAPI';
import { getSocket } from '@hooks/getSocket';
import Header from '@components/home/Header';
import SearchBar from '@components/home/SearchBar';
import FilterSection from '@components/home/FilterSection';
import ConversationItem from '@components/home/ConversationItem';
import { router } from 'expo-router';

const Leads = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filter, setFilter] = useState('all');
	const [page, setPage] = useState(1);
	const [leads, setLeads] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const { data, error, isLoading, isFetching, refetch } = useGetLeadsQuery({
		page,
		limit: 20,
	});

	const socket = getSocket();

	useEffect(() => {
		socket.io.on('ping', () => {
			console.log('Connected to socket.io server');
		});

		socket.on('conversation', data => {
			console.log(data);
			// update leads
			setLeads(prevLeads => [data, ...prevLeads]);
		});
	}, [socket]);

	useEffect(() => {
		if (data && data.length > 0) {
			setLeads(prevLeads => [...prevLeads, ...(data || [])]);
		} else if (data && data.length === 0) {
			setHasMore(false); // No more data to fetch
		}
	}, [data]);

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
				<FilterSection
					filter={filter}
					setFilter={setFilter}
					refetch={refetch}
				/>
			</View>
			<ScrollView
				className="mt-2"
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				{leads?.map((conversation, index) => (
					<ConversationItem
						key={index}
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
