import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useState } from 'react'

import userService from '../services/users'

const AddDrink = () => {
  const [formData, setFormData] = useState({
    size: '',
    alcVol: '',
  })
  const [infoText, setInfoText] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = (field, value) => {
    if (value === '') {
      setFormData({ ...formData, [field]: value })
      return
    }
    if (value.includes(',')) {
      value = value.replace(',', '.')
    }
    // Only numbers and decimal point allowed
    const pattern = /^[0-9.]+$/
    // Ensure that value can be converted to double later
    if (pattern.test(value) && !isNaN(parseFloat(value))) {
      setFormData({ ...formData, [field]: value })
    }
  }

  const submit = async () => {
    try {
      await userService.addDrink({
        size: parseFloat(formData.size),
        alcVol: parseFloat(formData.alcVol),
      })
      setInfoText('Drink added!')
      setError('')
    } catch (error) {
      console.log(error)
      setError(`Error:${error.response.data.error}`)
      setInfoText('')
    }
    setFormData({
      size: '',
      alcVol: '',
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Drink</Text>
      <Text>Size (cl)</Text>
      <TextInput
        style={styles.input}
        value={formData.size}
        onChangeText={value => handleInputChange('size', value)}
        placeholder='e.g. 33'
        placeholderTextColor='silver'
      />
      <Text>Alc vol %</Text>
      <TextInput
        style={styles.input}
        value={formData.alcVol}
        onChangeText={value => handleInputChange('alcVol', value)}
        placeholder='e.g. 4,5'
        placeholderTextColor='silver'
      />
      <Pressable style={styles.submitButton} onPress={submit}>
        <Text style={styles.submitButtonText}>Add</Text>
      </Pressable>
      <Text style={styles.infoText}>{infoText}</Text>
      <Text style={styles.errorText}>{error}</Text>
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
    margin: 20,
  },
  input: {
    width: '30%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
  },
  submitButton: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    width: 60,
    backgroundColor: 'lightgray',
  },
  submitButtonText: {
    textAlign: 'center',
    fontWeight: '600',
  },
  infoText: {
    margin: 5,
  },
  errorText: {
    color: 'red',
    margin: 5,
  },
})

export default AddDrink
