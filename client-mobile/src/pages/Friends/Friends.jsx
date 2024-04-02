import { View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userService from '../../services/users'
import FriendSearch from './FriendSearch'
import FriendRequests from './FriendRequests'

const Friends = () => {
  const [input, setInput] = useState('')
  const [usersToShow, setUsersToShow] = useState([])
  const [loggedUser, setLoggedUser] = useState({})
  const [addedFriends, setAddedFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const [isSearchActive, setIsSearchActive] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      userJSON = await AsyncStorage.getItem('loggedUser')
      const user = JSON.parse(userJSON)
      setLoggedUser(user)
      if (user && user.id) {
        const userData = await userService.getFriendRequests(user.id)
        setFriendRequests(userData.friendRequestsReceived)
      }
    }
    getUser()
  }, [])

  const search = async () => {
    const users = await userService.getAll()
    const foundUsers = users.filter(
      user =>
        user.username.toLowerCase().includes(input.toLowerCase()) &&
        user.id !== loggedUser.id
    )
    setUsersToShow(foundUsers)
    setIsSearchActive(true)
  }

  const addFriend = async friendId => {
    try {
      await userService.addFriend(friendId)
      setAddedFriends([...addedFriends.concat(friendId)])
    } catch (error) {
      console.log(error)
    }
  }

  const declineRequest = async friendId => {
    try {
      await userService.declineRequest(friendId)
      setFriendRequests(friendRequests.filter(request => request.id !== friendId))
    } catch (error) {
      console.log(error)
    }
  }

  const searchProps = {
    setInput,
    search,
    usersToShow,
    loggedUser,
    addFriend,
    addedFriends,
    isSearchActive
  }

  const reqProps = {
    addFriend,
    addedFriends,
    friendRequests,
    declineRequest
  }

  return (
    <View style={styles.container}>
      <FriendRequests {...reqProps} />
      <FriendSearch {...searchProps} />
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
})

export default Friends
