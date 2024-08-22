import { StyleSheet, Text, View } from 'react-native';

export default function CreateItem({route}) {
  console.log(route.params)
  return (
    <View></View>
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

