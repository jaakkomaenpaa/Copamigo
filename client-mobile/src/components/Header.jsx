import { Text, View, StyleSheet } from 'react-native'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Promille counter</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    paddingTop: '12%',
    backgroundColor: 'grey',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  text: {
    fontSize: 26,
    fontWeight: '700'
  }
})

export default Header