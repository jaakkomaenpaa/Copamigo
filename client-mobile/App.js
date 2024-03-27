import { NativeRouter } from 'react-router-native'
import { StyleSheet, Text, View } from 'react-native'

import Main from './src/Main'

const App = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Main />
      </View>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
