import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import HomeScreen from "./Component/Screens/HomeScreen";
import DetailScreen from "./Component/Screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          style={styles.HomeScreen}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          style={styles.DetailScreen}
          options={{
            title: "Détails",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
