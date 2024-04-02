import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import Header from './components/Header'
import Navbar from './components/Navbar/Navbar'
import Friends from './pages/Friends/Friends'
import AddDrink from './pages/AddDrink'
import Login from './pages/Login'
import Register from './pages/Register/Register'
import Account from './pages/Account'
import Home from './pages/Home/Home'

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add-drink' element={<AddDrink />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
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
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '82%', // For ios, check for android
  },
})

export default Main
