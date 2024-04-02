import { View, Text, TextInput, StyleSheet } from 'react-native'

const Credentials = props => {
  const { formData, setFormData } = props

  // TODO: validate username to be unique in client side as well
  return (
    <View style={styles.container}>
      <Text>Credentials</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={formData.username}
          placeholder='Username'
          onChangeText={text => setFormData({ ...formData, username: text })}
        />
        <TextInput
          style={styles.input}
          value={formData.password}
          placeholder='Password'
          onChangeText={text => setFormData({ ...formData, password: text })}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          placeholder='Confirm password'
          onChangeText={text =>
            setFormData({ ...formData, confirmPassword: text })
          }
          secureTextEntry={true}
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
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 15,
  },
})

export default Credentials
