import { Tabs } from "expo-router";
import React = require("react");
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface TabsIconProps {
  name: string;
  color: string;
  icon: string;
  focused: boolean;
}

const TabsIcon: React.FC<TabsIconProps> = ({
  name,
  color,
  icon,
  focused,
}: TabsIconProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <Icon name={icon} size={24} color={color} />
      <Text
        className={`${focused ? "font-bold" : "font-normal"} text-xs`}
        style={{
          color: color,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const HomeLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="leads"
          options={{
            title: "Leads",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                name="Leads"
                color={color}
                focused={focused}
                icon="account-group"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="internal-chat"
          options={{
            title: "Internal Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                name="SpChat"
                color={color}
                focused={focused}
                icon="chat"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Meeting"
          options={{
            title: "Meeting",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsIcon
                name="Meeting"
                color={color}
                focused={focused}
                icon="calendar-clock"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default HomeLayout;
