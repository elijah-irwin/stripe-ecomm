const INITIAL_STATE = {
  collections: null,
  isLoading: false,
  error: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_COLLECTIONS_START':
      return {
        ...state,
        isLoading: true
      }

    case 'FETCH_COLLECTIONS_SUCCESS':
      return {
        ...state,
        collections: action.payload,
        isLoading: false
      }

    case 'FETCH_COLLECTIONS_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export default shopReducer
