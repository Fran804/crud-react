import React, {useEffect, useState} from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const UsersList = (props) => {
  const [users, setusers] = useState([])

  useEffect(() => {
    firebase.db.collection('users').onSnapshot(querySnapshop => {
      const users = []
      querySnapshop.docs.forEach(doc => {
        const {name, email, phone} = doc.data()
        users.push({
          id: doc.id,
          name,
          email,
          phone
        })
      })

      setusers(users)
    })
  }, [])
  

  return (
    <ScrollView>
      <Button title='Crear Usuario' onPress={() => props.navigation.navigate('CreateUserPage')}/>

      {
        users.map(user => {
          return (
            <ListItem
              
              key={user.id}
              bottomDivider
              onPress={() => props.navigation.navigate('UserDetailsPage', {
                userId: user.id
              })}
            >
              <Avatar source={{uri: 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'}}/>

              <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
              </ListItem.Content>

              <ListItem.Chevron/>

            </ListItem>
          )
        })
      }
    </ScrollView>
  )
}

export default UsersList