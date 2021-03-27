import React from 'react'

import Spinner from '../spinner/spinner.component'

const withSpinner = Component => ({ loading, ...rest }) => {
  return loading ? <Spinner /> : <Component {...rest} />
}

export default withSpinner
