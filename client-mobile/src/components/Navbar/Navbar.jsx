import { View, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import NavbarTab from './NavbarTab'
import { tabs } from '../../tabs'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const getLoggedUser = async () => {
      const loggedUser = await AsyncStorage.getItem('loggedUser')
      setIsLoggedIn(loggedUser !== null)
    }
    getLoggedUser()
  }, [])

  const tabsToShow = tabs.filter(tab =>
    isLoggedIn ? tab.showWhenLoggedIn : tab.showWhenLoggedOut
  )

  return (
    <View style={styles.container}>
      {tabsToShow.map(tab => (
        <NavbarTab
          key={tab.label}
          label={tab.label}
          to={tab.to}
          icon={tab.icon}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default Navbar
