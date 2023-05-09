import React, {useState} from 'react'
import { View, TextInput, ScrollView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from '../database/firebase.js'

const CreateUserPage = (props) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const HandleChangeText = (name, value) => {
    setState({...state, [name]: value})
  }

  const CreateNewUser = async () => {

    if(state.name === '' || state.email === '' || state.phone === ''){
      alert("Por favor rellena todos los campos");
      return;
    }

    try {
      await firebase.db.collection('users').add({
        name: state.name,
        email: state.email,
        phone: state.phone
      })
      props.navigation.navigate('UsersList');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder='Nombre del usuario' 
          onChangeText={(value) => HandleChangeText('name', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput 
          placeholder='Correo del usuario'
          onChangeText={(value) => HandleChangeText('email', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput 
          placeholder='Telefono del usuario'
          onChangeText={(value) => HandleChangeText('phone', value)}
        />
      </View>

      <View>
        <Button title='Guardar Usuario' onPress={() => CreateNewUser()}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreateUserPage