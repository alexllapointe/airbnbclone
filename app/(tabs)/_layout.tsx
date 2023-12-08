import React from "react";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const NotificationBell = () => {
  return (
    <TouchableOpacity onPress={() => console.log('Notification bell pressed')}
      style={{ paddingRight: 15 }}>
      <FontAwesome5 name="bell" size={24} color="black" />
    </TouchableOpacity>
  );
};


export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary
    }}>
      <Tabs.Screen name="explore" options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="search" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="wishlist" options={{
        tabBarLabel: 'Wishlist',
        headerTitle: "Wishlist",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24
        },
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="heart" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="trips" options={{
        tabBarLabel: 'Trips',
        headerTitle: "Trips",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24
        },
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="airbnb" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="inbox" options={{
        tabBarLabel: 'Inbox',
        headerTitle: "Inbox",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24
        },
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="envelope" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarLabel: 'Profile',
        headerTitle: "Profile",
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24
        },
        headerRight: () => <NotificationBell />,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="user" size={size} color={color} />
        ),
      }}
      />
    </Tabs>
  );
}

