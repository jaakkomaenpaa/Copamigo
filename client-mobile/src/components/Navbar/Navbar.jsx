import { View, StyleSheet } from 'react-native'

import NavbarTab from './NavbarTab'
import { tabs } from '../../tabs'

const Navbar = () => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => 
        <NavbarTab key={tab.label} label={tab.label} to={tab.to} icon={tab.icon} />  
      )}
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
    right: 0
  }
})


export default Navbar