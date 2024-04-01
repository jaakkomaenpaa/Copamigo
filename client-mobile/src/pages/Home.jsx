import { Text, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userService from '../services/users'

const Home = () => {
  const [loggedUser, setLoggedUser] = useState({})
  const [promilles, setPromilles] = useState(0)

  useEffect(() => {
    const getUser = async () => {
      const userJSON = await AsyncStorage.getItem('loggedUser')
      const user = JSON.parse(userJSON)
      setLoggedUser(user)
      if (user) {
        try {
          const userData = await userService.getPromilles(user.id)
          setPromilles(userData.promilles)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getUser()
  }, [])

  if (!loggedUser) {
    return (
      <View style={styles.container}>
        <Text>
          Log in or register to add drinks, count promilles, and add friends.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Home</Text>
      <Text>Your promille count at the moment is {promilles}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  headerText: {
    fontSize: 17,
    margin: 20
  },
})

export default Home
