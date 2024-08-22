import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemView from '../screens/ItemView';
import EditItem from '../screens/EditItem';


const Stack = createNativeStackNavigator()

export default function ItemViewNavigation() {
  return (
  <Stack.Navigator initialRouteName='ItemView'>
      <Stack.Screen name='ItemView' component={ItemView} options={{ title: "Stadium" }} />
      <Stack.Screen name='EditItem' component={EditItem} options={{ title: "Edit Item" }} />
    </Stack.Navigator>
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
