import { Text, View, Pressable, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import Icon from 'react-native-vector-icons/Ionicons'

const NavbarTab = ({ label, to, icon }) => {
  return (
    <Pressable style={styles.container}>
      <Link to={to}>
        <View style={styles.label}>
          <Icon name={icon.name} size={30}/>
          <Text style={styles.text}>{label}</Text>
        </View>
      </Link>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  text: {
    fontWeight: '700',
    fontSize: 12,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: 'grey',
  },
})

export default NavbarTab
