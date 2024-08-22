import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { ROOT_URL } from '../globals';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FAB } from 'react-native-paper';


export default function ListView() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()
  const incomingParams = useRoute().params

  const [shouldReload, _] = useState(incomingParams?.reload ?? false)

  useEffect(() => {
    fetch(ROOT_URL + "list")
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err))
      .finally(setLoading(false))
  }, [shouldReload])

  const renderItem = ({ item }) => {
    return <TouchableOpacity style={styles.container} onPress={() => handlePress(item.id)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.team}</Text>
      </View>
    </TouchableOpacity>
  }

  const handlePress = (id) => navigation.navigate('ItemViewNavigation', params = { screen: "ItemView", params: { id: id } })

  return (
    <View style={{ flex: 1 }}>
      {
        loading ?
          (<ActivityIndicator color="#0000ff" />) :
          (<View style={{ flex: 1 }}>
            <FlatList data={data.filter(item => validateItem(item))}
              keyExtractor={item => item.id}
              renderItem={renderItem} />
            <FAB icon='plus' style={styles.fab} onPress={() => navigation.navigate("CreateItem", { id: 10 })} />
          </View>)
      }
    </View >
  );
}


function isNotEmpty(str) {
  return (str && str.length !== 0)
}

function validateItem(item) {
  if (isNotEmpty(item.name) && isNotEmpty(item.team)
    && isNotEmpty(item.country) && isNotEmpty(item.image)) {
    return true
  } else {
    return false
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

