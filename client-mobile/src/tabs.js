// Using Ionicons icon library
export const tabs = [
  {
    label: 'Home',
    to: '/',
    icon: {
      name: 'home-outline',
    },
    showWhenLoggedIn: true,
    showWhenLoggedOut: true
  },
  {
    label: 'Add Drink',
    to: '/add-drink',
    icon: {
      name: 'beer-outline',
    },
    showWhenLoggedIn: true,
    showWhenLoggedOut: false
  },
  {
    label: 'Friends',
    to: '/friends',
    icon: {
      name: 'happy-outline',
    },
    showWhenLoggedIn: true,
    showWhenLoggedOut: false
  },
  {
    label: 'Login',
    to: '/login',
    icon: {
      name: 'log-in-outline',
    },
    showWhenLoggedIn: false,
    showWhenLoggedOut: true
  },
  {
    label: 'Register',
    to: '/register',
    icon: {
      name: 'shield-outline',
    },
    showWhenLoggedIn: false,
    showWhenLoggedOut: true
  },
  {
    label: 'Account',
    to: '/account',
    icon: {
      name: 'person-outline'
    },
    showWhenLoggedIn: true,
    showWhenLoggedOut: false
  }
]