import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "../Components/BottomTabNavigation";
import DetailScreen from "../Screens/DetailScreen";
import SearchScreen from "../Screens/SearchScreen";
import Header from "./Header";

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: "Détails",
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "Recherche",
        }}
      />
    </Stack.Navigator>
  );
}
