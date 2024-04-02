import { Text, View, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const FriendRequests = props => {
  const { addFriend, addedFriends, friendRequests, declineRequest } = props

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Pending friend requests</Text>
      <View style={styles.requestContainer}>
        {friendRequests.length > 0 ? (
          friendRequests.map(user => {
            let acceptButton = (
              <Pressable
                style={styles.acceptField}
                onPress={() => addFriend(user.id)}
              >
                <Icon name='checkmark' size={20} />
              </Pressable>
            )
            let declineButton = (
              <Pressable
                style={styles.declineField}
                onPress={() => declineRequest(user.id)}
              >
                <Icon name='close' size={20} />
              </Pressable>
            )
            if (addedFriends.includes(user.id)) {
              acceptButton = <Text style={styles.acceptField}>Added</Text>
              declineButton = null
            }
            return (
              <View key={user.id} style={styles.user}>
                <Text style={styles.userText}>{user.username}</Text>
                <View style={styles.buttonContainer}>
                  {acceptButton}
                  {declineButton}
                </View>
              </View>
            )
          })
        ) : (
          <Text>No requests received</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  acceptField: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    backgroundColor: 'lightgreen',
  },
  declineField: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
    backgroundColor: 'pink',
  },
  requestContainer: {
    marginTop: 10,
    marginBottom: 50,
    gap: 8,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  userText: {
    padding: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
  },
  subHeader: {  
    textDecorationLine: 'underline',
    fontSize: 15
  }
})

export default FriendRequests
