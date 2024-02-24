import { Feather } from '@expo/vector-icons';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';

import SplashScreen from '~/screens/SplashScreen';
import HomeScreen from '~/screens/HomeScreen';
import AddItemScreen from '~/screens/AddItemScreen';
import EditItemScreen from '~/screens/EditItemScreen';
import ShowItemsScreen from '~/screens/ShowItemsScreen';

export type RootStackParamList = {
  SplashScreen: undefined; 
  HomeScreen: undefined; 
  AddItemScreen: undefined; 
  EditItemScreen: undefined; 
  ShowItemsScreen: undefined;
  // Overview: undefined;
  // Details: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: "#81C784" },
};

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />

         <Stack.Screen name="AddItemScreen" component={AddItemScreen} />

        <Stack.Screen name="EditItemScreen" component={EditItemScreen} />

        <Stack.Screen name="ShowItemsScreen" component={ShowItemsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  backButtonText: {
    color: '#007AFF',
    marginLeft: 4,
  },
});
