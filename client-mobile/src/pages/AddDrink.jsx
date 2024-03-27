import { Text, View, TextInput, Pressable } from 'react-native'
import { useState } from 'react'

const AddDrink = () => {
  const [formData, setFormData] = useState({
    size: '',
    alcVol: '',
  })

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
    console.log(formData)

    setFormData({
      size: '',
      alcVol: ''
    })
  }

  return (
    <View>
      <Text>AddDrink</Text>

      <Text>Drink size (cl)</Text>
      <TextInput
        value={formData.size}
        onChangeText={(value) => handleInputChange('size', value)}
        placeholder='e.g. 33'
        placeholderTextColor='silver'
      />
      <Text>Alc vol %</Text>
      <TextInput
        value={formData.alcVol}
        onChangeText={(value) => handleInputChange('alcVol', value)}
        placeholder='e.g. 4,5'
        placeholderTextColor='silver'
      />
      <Pressable onPress={submit}>
        <Text>Add</Text>
      </Pressable>
    </View>
  )
}

export default AddDrink
