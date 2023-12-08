import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import HomeScreen from "../Screens/HomeScreen";
import AccountScreen from "../Screens/AccountScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        style: { backgroundColor: "rgba(30, 30, 30, 1)" },
        tabBarActiveTintColor: "rgba(225, 205, 0, 1)",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "rgba(225, 205, 0, 1)",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size * 1.1} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size * 1.1} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
