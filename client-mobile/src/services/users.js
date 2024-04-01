import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

const baseUrl = `${Constants.expoConfig.urls.API_URL}/users`

const getUser = async userId => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

const create = async userData => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const addDrink = async drink => {
  const authToken = await AsyncStorage.getItem('authToken')
  const userJSON = await AsyncStorage.getItem('loggedUser')
  const user = JSON.parse(userJSON)
  console.log(user.id, authToken)
  const auth = {
    headers: { authorization: authToken },
  }
  const response = await axios.put(`${baseUrl}/${user.id}/drinks`, drink, auth)
  return response
}

const update = async user => {
  const authToken = await AsyncStorage.getItem('authToken')
  const auth = {
    headers: { authorization: authToken },
  }
  await axios.put(`${baseUrl}/${user.id}`, user, auth)
}

const remove = async userId => {
  const authToken = await AsyncStorage.getItem('authToken')
  const auth = {
    headers: { authorization: authToken },
  }
  await axios.delete(`${baseUrl}/${userId}`, auth)
}

const exports = { getUser, create, addDrink, update, remove }
export default exports
