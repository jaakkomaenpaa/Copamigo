import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useNavigate } from 'react-router-native'
import { reloadAsync } from 'expo-updates'

import loginService from '../services/login'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const submit = async () => {
    try {
      await loginService.login(formData)
      setError('')
    } catch (error) {
      setError(`Error: ${error.response.data.error}`)
      console.log(error)
    }
    setFormData({ username: '', password: '' })
    navigate('/')
    reloadAsync() // Using this to reload app for now
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Log in to account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={text => setFormData({ ...formData, username: text })}
          placeholder='Username'
        ></TextInput>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
          placeholder='Password'
          secureTextEntry={true}
        ></TextInput>
      </View>
      <Text style={styles.errorText}>{error}</Text>
      <Pressable style={styles.submitButton} onPress={submit}>
        <Text style={styles.submitButtonText}>Login</Text>
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
  headerText: {
    fontSize: 17,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
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
  errorText: {
    color: 'red',
  },
})

export default Login
