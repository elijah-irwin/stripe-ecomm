// firebase
import {
  firestore,
  convertCollectionsSnapshot,
} from '../../firebase/firebase.utils'

export const getCollections = () => async dispatch => {
  // start async fetch
  dispatch({ type: 'FETCH_COLLECTIONS_START' })

  // create firestore ref and query for data
  try {
    const collectionRef = firestore.collection('collections')
    const data = await collectionRef.get()
    const mappedData = convertCollectionsSnapshot(data)
    dispatch({ type: 'FETCH_COLLECTIONS_SUCCESS', payload: mappedData })
  }

  // failed to query data
  catch (err) {
    dispatch({ type: 'FETCH_COLLECTIONS_ERROR', payload: err.message })
  }
}