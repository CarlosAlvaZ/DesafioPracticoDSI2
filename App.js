import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListView from './screens/ListView';
import ItemViewNavigation from './navigation/ItemViewNavigation';
import { PaperProvider } from 'react-native-paper';
import CreateItem from './screens/CreateItem';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='ListView' component={ListView} options={{ title: "Stadium List" }} />
          <Stack.Screen name='ItemViewNavigation' component={ItemViewNavigation} options={{ headerShown: false }} />
          <Stack.Screen name='CreateItem' component={CreateItem} options={{ title: "Create Stadium" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
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
