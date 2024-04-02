import { Text, View, StyleSheet } from 'react-native'

import { getPromilleColor, getPromilleEmoji } from '../../utils'

const FriendList = props => {
  const { friends } = props

  const sortedFriends = friends.sort((a, b) => b.promilles - a.promilles)

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Your friends</Text>
      {friends.length > 0 ? (
        <View style={styles.friendList}>
          {sortedFriends.map(friend => (
            <View
              style={{
                ...styles.friendItem,
                ...getPromilleColor(friend.promilles),
              }}
              key={friend.id}
            >
              <Text>{friend.username}</Text>
              <Text>{friend.promilles} ‰ {getPromilleEmoji(friend.promilles)}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>No friends yet</Text>
      )}
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
    marginTop: 30,
  },
  subHeader: {
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  friendList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  friendItem: {
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
    width: 100,
    alignItems: 'center'
  },
})

export default FriendList
