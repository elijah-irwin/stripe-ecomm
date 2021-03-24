// Imports
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Firebase App Config
const firebaseConfig = {
  apiKey: "AIzaSyD5DP_hjY0YW1-WoDzZVcjJ2LeD4WsEhlo",
  authDomain: "stripe-ecomm.firebaseapp.com",
  projectId: "stripe-ecomm",
  storageBucket: "stripe-ecomm.appspot.com",
  messagingSenderId: "1062035548855",
  appId: "1:1062035548855:web:c44970f322f18625cffb32",
  measurementId: "G-8YX782C3KS"
}

// Init the firebase instance
firebase.initializeApp(firebaseConfig)

// Init the firebase services we want
export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Sign In With Google Functionality
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

// Add new collection to firebase
export const addCollection = async (key, objects) => {
  const collectionRef = firestore.collection(key)
  const batch = firestore.batch()

  objects.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

// convert collection db data to useable frontend format
export const convertCollectionsSnapshot = collections => {
  const x = collections.docs.map(doc => {
    const { title, items } = doc.data()
    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items
    }
  })

  return x.reduce((acc, col) => {
    acc[col.title.toLowerCase()] = col
    return acc
  }, {})
}

/**
 * USER API
 */
export const createUser = async (user, otherData) => {
  if (!user) return

  const userRef = firestore.doc(`users/${user.uid}`)
  const { exists } = await userRef.get()

  if (!exists) {
    const { displayName, email } = user
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...otherData
      })
    } catch (error) {
      console.error('Error creating user:', error.message)
    }
  }

  return userRef
}

// Default Export
export default firebase