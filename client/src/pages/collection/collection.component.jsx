import React from 'react'
import { useParams } from 'react-router-dom'

// components
import CollectionItem from '../../components/collection-item/collection-item.component'

// redux
import { useSelector } from 'react-redux'

// styles
import './collection.styles.scss'

const CollectionPage = () => {
  const { categoryId } = useParams()
  const { collections } = useSelector(state => state.shop)
  const { title, items } = collections[categoryId]

  return (
    <div className='collection-page'>
      <h2 className='title'>{title.toUpperCase()}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default CollectionPage
