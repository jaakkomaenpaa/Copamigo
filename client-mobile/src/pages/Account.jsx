import { Text, View, Pressable, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigate } from 'react-router-native'
import { reloadAsync } from 'expo-updates'

const Account = () => {

  const navigate = useNavigate()

  const logout = async () => {
    await AsyncStorage.removeItem('loggedUser')
    navigate('/')
    reloadAsync() // Using this to reload app for now
  }

  return (
    <View>
      <Pressable style={styles.submitButton} onPress={logout}>
        <Text style={styles.submitButtonText}>Log out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
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
