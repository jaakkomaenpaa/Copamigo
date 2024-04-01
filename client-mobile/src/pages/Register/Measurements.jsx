import { View, Text, StyleSheet, TextInput } from 'react-native'

const Measurements = props => {
  const { formData, setFormData } = props

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
    // Ensure that value can be converted to float
    if (pattern.test(value) && !isNaN(parseFloat(value))) {
      setFormData({ ...formData, [field]: value })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Measurements</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={formData.height}
          placeholder='Height (cm)'
          onChangeText={text => handleInputChange('height', text)}
        />
        <TextInput
          style={styles.input}
          value={formData.weight}
          placeholder='Weight (kg)'
          onChangeText={text => handleInputChange('weight', text)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '40%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
  },
})

export default Measurements
