import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const baseUrl = `${Constants.expoConfig.urls.API_URL}/login`

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    const user = response.data
    await AsyncStorage.setItem('loggedUser', JSON.stringify(user))
    await AsyncStorage.setItem('authToken', `Bearer ${user.token}`)
}

const exports = { login }

export default exports
