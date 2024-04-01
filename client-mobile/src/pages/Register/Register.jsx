import { Text, View, Pressable, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useState } from 'react'
import { reloadAsync } from 'expo-updates'

import Confirmation from './Confirmation'
import Credentials from './Credentials'
import UnalteredProps from './UnalteredProps'
import Measurements from './Measurements'
import { isValidAge, isValidDate, getDateFromObject } from '../../utils'
import userService from '../../services/users'
import loginService from '../../services/login'

const emptyForm = {
  username: '',
  password: '',
  confirmPassword: '',
  gender: '',
  dateOfBirth: {
    day: '',
    month: '',
    year: '',
  },
  height: '',
  weight: '',
}

const Register = () => {
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()

  const props = {
    formData,
    setFormData,
    setError,
  }

  const pages = {
    1: <Credentials {...props} />,
    2: <UnalteredProps {...props} />,
    3: <Measurements {...props} />,
    4: <Confirmation />,
  }

  // Checks errors related to each page
  const hasError = () => {
    switch (currentPage) {
      case 1:
        if (
          !formData.username ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError('All fields required')
          return true
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords must match')
          return true
        }
        break
      case 2:
        if (
          !formData.gender ||
          !formData.dateOfBirth.day ||
          !formData.dateOfBirth.month ||
          !formData.dateOfBirth.year
        ) {
          setError('All fields required')
          return true
        }
        if (!isValidDate(formData.dateOfBirth)) {
          setError('Please enter a valid date')
          return true
        }
        if (!isValidAge(formData.dateOfBirth)) {
          setError('User must be between 18 and 100 years old')
          return true
        }
        break
      case 3:
        if (!formData.height || !formData.weight) {
          setError('All fields required')
          return true
        }
        break
    }
    return false
  }

  const getNextPage = () => {
    if (hasError()) {
      return
    }
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1)
      setError('')
    }
  }

  const getPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const register = async () => {
    try {
      await userService.create({
        ...formData,
        dateOfBirth: getDateFromObject(formData.dateOfBirth),
        height: parseFloat(formData.height),
        wight: parseFloat(formData.weight),
      })
      const credentials = {
        username: formData.username,
        password: formData.password,
      }
      await loginService.login(credentials)
      setFormData(emptyForm)
      setError('')
      navigate('/')
      reloadAsync()
    } catch (error) {
      setError(`Error: ${error.response.data.error}`)
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {pages[currentPage]}
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.buttonContainer}>
        {currentPage !== 1 && (
          <Pressable style={styles.navButton} onPress={getPreviousPage}>
            <Text style={styles.navButtonText}>Back</Text>
          </Pressable>
        )}
        {currentPage !== 4 && (
          <Pressable style={styles.navButton} onPress={getNextPage}>
            <Text style={styles.navButtonText}>Continue</Text>
          </Pressable>
        )}
        {currentPage === 4 && (
          <Pressable style={styles.registerButton} onPress={register}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>
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
    width: '80%',
  },
  headerText: {
    fontSize: 17,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    width: 70,
    backgroundColor: 'lightgray',
  },
  navButtonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
  },
  registerButton: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 2,
    width: 70,
    backgroundColor: 'lightgray',
  },
  registerButtonText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
})

export default Register
