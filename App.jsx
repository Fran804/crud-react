import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersList from "./pages/UsersList";
import CreateUserPage from "./pages/CreateUserPage";
import UserDetailsPage from "./pages/UserDetailsPage";

const Stack = createNativeStackNavigator();

function MyStack() {
  return(
    <Stack.Navigator>
        <Stack.Screen name="UsersList" component={UsersList} options={{title: 'Usuarios'}} />
        <Stack.Screen name="CreateUserPage" component={CreateUserPage} options={{title: 'Crear Usuario'}} />
        <Stack.Screen name="UserDetailsPage" component={UserDetailsPage} options={{title: 'Detalles Usuario'}} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
