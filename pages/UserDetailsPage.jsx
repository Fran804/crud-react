import React, {useEffect, useState} from 'react'
import { View, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import firebase from '../database/firebase'
import { Button } from 'react-native-elements'

const UserDetailsPage = (props) => {
  
  const initialState = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }

  const [user, setUser] = useState(initialState);
  const [loading, setloading] = useState(true);
  
  const GetUserById = async (id) => {
    const dbRef = firebase.db.collection('users').doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id
    })
    setloading(false)
  }
    
  useEffect(() => {
    GetUserById(props.route.params.userId)
  }, [])

  const HandleChangeText = (name, value) => {
    setUser({...user, [name]: value})
  }

  const DeleteUser = async () => {
    const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("UsersList");
  }

  const UpdateUser = async () => {
    const dbRef = firebase.db.collection('users').doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  }

  const ConfirmationAlert = () => {
    Alert.alert('Borrar Usuario', '¿Estas seguro de seguir con esta acción?', [
      {text: 'Si', onPress: () => DeleteUser()},
      {text: 'No', onPress: () => alert('Cancelación exitosa')}
    ])
  }

  if(loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="9e9e9e"></ActivityIndicator>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder='Nombre del usuario' 
          value={user.name}
          onChangeText={(value) => HandleChangeText('name', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput 
          placeholder='Correo del usuario'
          value={user.email}
          onChangeText={(value) => HandleChangeText('email', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput 
          placeholder='Telefono del usuario'
          value={user.phone}
          onChangeText={(value) => HandleChangeText('phone', value)}
        />
      </View>

      <View>
        <Button style={{marginBottom: 15}} title='Editar Usuario' onPress={() => UpdateUser()}/>
      </View>

      <View>
        <Button color="error" title='Borrar Usuario' onPress={() => ConfirmationAlert()}/>
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
  }
});

export default UserDetailsPage