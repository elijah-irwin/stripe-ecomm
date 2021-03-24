import React, { useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'

// pages
import CollectionPage from '../collection/collection.component'

// components
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import withSpinner from '../../components/with-spinner/with-spinner.component'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { getCollections } from '../../redux/shop/shop.actions'

// styles
import './shop.styles.scss'

const ColOverviewWithSpinner = withSpinner(CollectionOverview)
const ColPageWithSpinner = withSpinner(CollectionPage)

/**
 * Shop Page Component
 * @returns React Component
 */
const ShopPage = () => {
  const match = useRouteMatch()
  const dispatch = useDispatch()

  const { collections } = useSelector(state => state.shop)

  useEffect(() => {
    dispatch(getCollections())
  }, [dispatch])

  return (
    <div className='shop-page'>
      <Route exact path={match.path}>
        <ColOverviewWithSpinner loading={!collections} />
      </Route>

      <Route path={`${match.path}/:categoryId`}>
        <ColPageWithSpinner loading={!collections} />
      </Route>
    </div>
  )
}

export default ShopPage
