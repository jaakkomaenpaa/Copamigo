import { Text, View, Pressable, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from 'react-router-native'
import { reloadAsync } from 'expo-updates'
import { useEffect, useState } from 'react'

const Account = () => {
  const [loggedUser, setLoggedUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      userJSON = await AsyncStorage.getItem('loggedUser')
      setLoggedUser(JSON.parse(userJSON))
    }
    getUser()
  }, [])

  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser')
    navigate('/')
    reloadAsync() // Using this to reload app for now
  }

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Logged in as {loggedUser.username}</Text>
      <Pressable style={styles.submitButton} onPress={logout}>
        <Text style={styles.submitButtonText}>Log out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  infoText: {
    margin: 20
  },  
  submitButton: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    width: 80,
    backgroundColor: 'lightgray',
  },
  submitButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
})

export default Account
