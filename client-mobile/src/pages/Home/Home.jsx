import { Text, View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userService from '../../services/users'
import FriendList from './FriendList'
import { getPromilleColor, getPromilleEmoji } from '../../utils'

const Home = () => {
  const [loggedUser, setLoggedUser] = useState({})
  const [promilles, setPromilles] = useState(0)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const userJSON = await AsyncStorage.getItem('loggedUser')
      const user = JSON.parse(userJSON)
      setLoggedUser(user)
      if (user) {
        try {
          const userData = await userService.getPromilles(user.id)
          const friendData = await userService.getFriendsPromilles(user.id)
          setPromilles(userData.promilles)
          setFriends(friendData)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getUser()
  }, [])

  const friendProps = { friends }

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
      <View style={styles.userContainer}>
        <Text>Your alcohol level at the moment is:</Text>
        <Text
          style={{ ...styles.promilleText, ...getPromilleColor(promilles) }}
        >
          {promilles} ‰ {getPromilleEmoji(promilles)}
        </Text>
      </View>
      <FriendList {...friendProps} />
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
    margin: 20,
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promilleText: {
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    padding: 8,
  },
})

export default Home
