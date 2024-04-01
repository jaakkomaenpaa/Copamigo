import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'

const UnalteredProps = props => {
  const { formData, setFormData } = props

  const genders = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ]

  const handleDateInputChange = (value, field) => {
    if (value === '') {
      setFormData({
        ...formData,
        dateOfBirth: { ...formData.dateOfBirth, [field]: value },
      })
      return
    }
    // Only numbers allowed
    const pattern = /^[0-9]+$/
    if (pattern.test(value)) {
      setFormData({
        ...formData,
        dateOfBirth: { ...formData.dateOfBirth, [field]: value },
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Gender and date of birth</Text>
      <View style={styles.inputContainer}>
        <View style={styles.pickerContainer}>
          {genders.map(gender => (
            <Pressable
              onPress={() => setFormData({ ...formData, gender: gender.value })}
              key={gender.value}
              style={
                gender.value === formData.gender
                  ? styles.pickerItemChosen
                  : styles.pickerItemDefault
              }
            >
              <Text
                style={
                  gender.value === formData.gender
                    ? styles.pickerTextChosen
                    : styles.pickerTextDefault
                }
              >
                {gender.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.dateContainer}>
          <TextInput
            style={styles.input}
            value={formData.dateOfBirth.day}
            placeholder='Day'
            onChangeText={value => handleDateInputChange(value, 'day')}
          />
          <TextInput
            style={styles.input}
            value={formData.dateOfBirth.month}
            placeholder='Month'
            onChangeText={value => handleDateInputChange(value, 'month')}
          />
          <TextInput
            style={styles.input}
            value={formData.dateOfBirth.year}
            placeholder='Year'
            onChangeText={value => handleDateInputChange(value, 'year')}
          />
        </View>
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
    width: 60,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
  },
  pickerItemChosen: {
    padding: 10,
    margin: 1,
    borderWidth: 3,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
  pickerItemDefault: {
    padding: 10,
    margin: 3,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
  pickerTextChosen: {
    fontWeight: '700',
    textAlign: 'center',
  },
  pickerTextDefault: {
    fontWeight: '500',
    textAlign: 'center',
  },
})

export default UnalteredProps
