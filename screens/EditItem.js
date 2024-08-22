import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { ROOT_URL } from '../globals'

export default function EditItem() {
  const navigation = useNavigation()
  const item = useRoute().params.item

  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = () => {
    if (image && name && team && country) {
      updateItem()
    } else if (image === item.image && name === item.name && team === item.team && country === item.country) {
      Alert.alert('Error', 'No se ha realizado ningun cambio');
    } else {
      Alert.alert('Error', 'Por favor, llene todos los campos');
    }
  };

  const updateItem = () => fetch(ROOT_URL + `list/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id, image, name, team, country })
  }).then(res => res.json())
    .then(() => {
      setId('');
      setImage('');
      setName('');
      setTeam('');
      setCountry('');
      navigation.navigate("ListView", { reload: true })
    }).catch(err => console.log(err))

  const handleCancel = () => {
    setId('');
    setImage('');
    setName('');
    setTeam('');
    setCountry('');
    navigation.goBack()
  };


  useEffect(() => {
    setId(item.id ?? '');
    setImage(item.image ?? '');
    setName(item.name ?? '');
    setTeam(item.team ?? '');
    setCountry(item.country ?? '');
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>ID:</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setId}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Imagen:</Text>
        <TextInput
          style={styles.input}
          value={image}
          onChangeText={setImage}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Equipo:</Text>
        <TextInput
          style={styles.input}
          value={team}
          onChangeText={setTeam}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pais:</Text>
        <TextInput
          style={styles.input}
          value={country}
          onChangeText={setCountry}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Cancel" onPress={handleCancel} color="#d9534f" />
        <Button title="Submit" onPress={handleSubmit} color="#5cb85c" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});


