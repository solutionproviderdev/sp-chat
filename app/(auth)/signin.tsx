// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { Button } from "react-native-paper";
// import { StatusBar } from "expo-status-bar";
// import { router } from "expo-router";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [secureTextEntry, setSecureTextEntry] = useState(true);

//   const handleLogin = () => {
//     // Handle login logic
//     console.log("Logging in with:", email, password);

//     router.push("/leads");
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100 p-5">
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-4xl font-bold mb-5 text-black">Login</Text>
//         <TextInput
//           className="w-full p-3 mb-4 bg-white rounded border border-gray-300"
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoCompleteType="email"
//         />
//         <View className="w-full p-3 mb-4 bg-white rounded border border-gray-300 flex-row items-center">
//           <TextInput
//             className="flex-1"
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={secureTextEntry}
//             style={{ flex: 1 }}
//           />
//           <TouchableOpacity
//             onPress={() => setSecureTextEntry(!secureTextEntry)}
//           >
//             <Icon
//               name={secureTextEntry ? "eye-off" : "eye"}
//               size={24}
//               color="gray"
//             />
//           </TouchableOpacity>
//         </View>
//         <Button
//           mode="contained"
//           className="w-full bg-primary"
//           labelStyle={{ color: "white" }}
//           onPress={handleLogin}
//         >
//           Login
//         </Button>
//       </View>
//       <StatusBar style="dark" />
//     </SafeAreaView>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@redux/features/auth/authAPI';
import { userLoggedIn } from '@redux/features/auth/authSlice';

const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	const handleLogin = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      if (res.success) {
        dispatch(userLoggedIn({ user: res.user, token: res.token }));
        router.replace('/leads');
      } else {
        Alert.alert('Login Failed', res.message);
      }
    } catch (error) {
      console.log('err', error);
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };


	return (
		<SafeAreaView className="flex-1 bg-gray-100 p-5">
			<View className="flex-1 justify-center items-center">
				<Text className="text-4xl font-bold mb-5 text-black">Login</Text>
				<TextInput
					className="w-full p-3 mb-4 bg-white rounded border border-gray-300"
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					keyboardType="email-address"
					autoCapitalize="none"
					autoCompleteType="email"
				/>
				<View className="w-full p-3 mb-4 bg-white rounded border border-gray-300 flex-row items-center">
					<TextInput
						className="flex-1"
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry={secureTextEntry}
						style={{ flex: 1 }}
					/>
					<TouchableOpacity
						onPress={() => setSecureTextEntry(!secureTextEntry)}
					>
						<Icon
							name={secureTextEntry ? 'eye-off' : 'eye'}
							size={24}
							color="gray"
						/>
					</TouchableOpacity>
				</View>
				<Button
					mode="contained"
					className="w-full bg-primary"
					labelStyle={{ color: 'white' }}
					onPress={handleLogin}
					loading={isLoading}
				>
					Login
				</Button>
			</View>
			<StatusBar style="dark" />
		</SafeAreaView>
	);
};

export default Signin;
