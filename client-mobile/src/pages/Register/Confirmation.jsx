import { View, Text, StyleSheet } from 'react-native'

const Confirmation = () => {
  return (
    <View style={styles.container}>
      <Text>Confirmation</Text>
      <Text>
        Your data will be stored in a database and used for alcohol level
        calculations
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    gap: 20,
  },
})

export default Confirmation
