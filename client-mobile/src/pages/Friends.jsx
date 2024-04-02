import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userService from '../services/users'

const Friends = () => {
  const [input, setInput] = useState('')
  const [usersToShow, setUsersToShow] = useState([])
  const [loggedUser, setLoggedUser] = useState({})
  const [addedFriends, setAddedFriends] = useState([])

  useEffect(() => {
    const getUser = async () => {
      userJSON = await AsyncStorage.getItem('loggedUser')
      setLoggedUser(JSON.parse(userJSON))
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
  }

  const addFriend = async friendId => {
    try {
      await userService.addFriend(friendId)
      setAddedFriends([...addedFriends.concat(friendId)])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Friends</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search by username'
          onChangeText={text => setInput(text)}
        />
        <Pressable style={styles.searchButton} onPress={search}>
          <Icon name='search' size={20} />
        </Pressable>
      </View>
      <View style={styles.userListContainer}>
        {usersToShow.length > 0 ? (
          usersToShow.map(user => {
            let addButton = (
              <Pressable
                style={styles.addField}
                onPress={() => addFriend(user.id)}
              >
                <Text>Add friend</Text>
              </Pressable>
            )
            if (
              user.friendRequestsReceived.includes(loggedUser.id) ||
              addedFriends.includes(user.id) ||
              user.friends.includes(loggedUser.id)
            ) {
              addButton = <Text style={styles.addField}>Added</Text>
            } else if (user.friendRequestsSent.includes(loggedUser.id)) {
              addButton = (
                <Pressable
                  style={styles.addField}
                  onPress={() => addFriend(user.id)}
                >
                  <Text>Add back</Text>
                </Pressable>
              )
            }
            return (
              <View key={user.id} style={styles.user}>
                <Text style={styles.userText}>{user.username}</Text>
                {addButton}
              </View>
            )
          })
        ) : (
          <Text>No users found</Text>
        )}
      </View>
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
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    margin: 20,
  },
  input: {
    width: '70%',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  searchButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    backgroundColor: 'lightgray',
  },
  userListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: 200,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  userText: {
    padding: 5,
  },
  addField: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    backgroundColor: 'lightgreen',
  },
})

export default Friends
