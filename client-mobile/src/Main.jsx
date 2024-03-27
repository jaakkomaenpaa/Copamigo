import { Text, SafeAreaView, StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import Header from './components/Header'
import Navbar from './components/Navbar/Navbar'
import Friends from './pages/Friends'
import AddDrink from './pages/AddDrink'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-drink' element={<AddDrink />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </View>
      <Navbar />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1
  }
})

export default Main
