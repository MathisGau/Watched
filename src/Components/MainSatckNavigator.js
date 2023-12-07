import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "../Components/BottomTabNavigation";
import DetailScreen from "../Screens/DetailScreen";
import SearchScreen from "../Screens/SearchScreen";
import { Image, View } from "react-native";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        component={BottomTabNavigation}
        options={{
          headerTitle: () => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 0,
                padding: 0,
              }}
            >
              <Image
                source={require("../../assets/logo.png")}
                style={{
                  width: 120,
                  height: 40,
                  resizeMode: "contain",
                  tintColor: "rgba(225, 205, 0, 1)",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "rgba(30, 30, 30, 1)",
          },
        }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require("../../assets/logo.png")}
              style={{
                width: 120,
                height: 40,
                resizeMode: "contain",
                tintColor: "rgba(225, 205, 0, 1)",
              }}
            />
          ),
          headerStyle: {
            backgroundColor: "rgba(30, 30, 30, 1)",
          },
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require("../../assets/logo.png")}
              style={{
                width: 120,
                height: 40,
                resizeMode: "contain",
                tintColor: "rgba(225, 205, 0, 1)",
              }}
            />
          ),
          headerStyle: {
            backgroundColor: "rgba(30, 30, 30, 1)",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
