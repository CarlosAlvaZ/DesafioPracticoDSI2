import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View, Image, ScrollView, Button } from 'react-native';
import { ROOT_URL } from '../globals';
import { FAB } from 'react-native-paper';

const { width, height } = Dimensions.get('window')

export default function ItemView() {

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const { id } = useRoute().params

  useEffect(() => {
    fetch(ROOT_URL + `list/${id}`)
      .then(res => res.json())
      .then(res => setData(res))
      .then(console.log(data))
      .catch(err => console.log(err))
      .finally(setLoading(false))
  }, [])

  const handleDelete = () =>
    fetch(ROOT_URL + `list/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(res => console.log(res))
      .then(navigation.navigate("ListView", { reload: true }))
      .catch(err => console.log(err))

  return (
    <View style={{ flex: 1 }}>
      {
        loading ?
          (<ActivityIndicator color="#0000ff" />) :
          (<View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
              <Image
                source={{ uri: data.image }} // Replace with your image URL
                style={styles.image}
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.subtitle}>{data.team}</Text>
                <Text style={styles.subtitle}>{data.country}</Text>
                <Button title='Eliminar' onPress={() => handleDelete()} />
              </View>
            </ScrollView>
            <FAB
              style={styles.fab}
              icon="pen"
              onPress={() => navigation.navigate("EditItem", { item: data })}
            />
          </View>)
      }
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: height * 0.4, // Image takes 40% of the screen height
    resizeMode: 'cover', // Adjusts the image to cover the entire area
  },
  textContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
