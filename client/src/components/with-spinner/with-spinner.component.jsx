import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles'

const withSpinner = Component => ({ loading, ...rest }) => {
  return loading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <Component {...rest} />
  )
}

export default withSpinner
