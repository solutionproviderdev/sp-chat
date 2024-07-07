import React = require('react');
import { useEffect } from 'react';
import {
	Provider as PaperProvider,
	configureFonts,
	MD3LightTheme,
	MD3DarkTheme,
} from 'react-native-paper';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { store } from '@redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import { useColorScheme } from '@hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const fontConfig = {
	web: {
		regular: {
			fontFamily: 'Poppins-Regular',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'Poppins-Medium',
			fontWeight: 'normal',
		},
		light: {
			fontFamily: 'Poppins-Light',
			fontWeight: 'normal',
		},
		thin: {
			fontFamily: 'Poppins-Thin',
			fontWeight: 'normal',
		},
		labelLarge: {
			fontFamily: 'Poppins-Regular',
			fontWeight: 'normal',
		},
	},
	ios: {
		regular: {
			fontFamily: 'Poppins-Regular',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'Poppins-Medium',
			fontWeight: 'normal',
		},
		light: {
			fontFamily: 'Poppins-Light',
			fontWeight: 'normal',
		},
		thin: {
			fontFamily: 'Poppins-Thin',
			fontWeight: 'normal',
		},
		labelLarge: {
			fontFamily: 'Poppins-Regular',
			fontWeight: 'normal',
		},
	},
	android: {
		regular: {
			fontFamily: 'Poppins-Regular',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'Poppins-Medium',
			fontWeight: 'normal',
		},
		light: {
			fontFamily: 'Poppins-Light',
			fontWeight: 'normal',
		},
		thin: {
			fontFamily: 'Poppins-Thin',
			fontWeight: 'normal',
		},
		labelLarge: {
			fontFamily: 'Poppins-Regular',
			fontWeight: 'normal',
		},
	},
};

const PaperLightTheme = {
	...MD3LightTheme,
	roundness: 2,
	fonts: configureFonts(fontConfig),
};

const PaperDarkTheme = {
	...MD3DarkTheme,
	roundness: 2,
	fonts: configureFonts(fontConfig),
};

function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
		'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
		'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
		'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
		'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
		'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	const theme = colorScheme === 'dark' ? PaperDarkTheme : PaperLightTheme;

	return (
		<GestureHandlerRootView className="h-full">
			<ReduxProvider store={store}>
				<PaperProvider theme={theme}>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="(profile)" options={{ headerShown: false }} />
						<Stack.Screen
							name="(notification)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="(spchat)" options={{ headerShown: false }} />
						<Stack.Screen
							name="(lead-inbox)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="+not-found" />
					</Stack>
				</PaperProvider>
			</ReduxProvider>
		</GestureHandlerRootView>
	);
}

export default RootLayout;
