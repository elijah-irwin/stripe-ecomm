import React from 'react'

// redux
import { useSelector } from 'react-redux'

// components
import CollectionPreview from '../collection-preview/collection-preview.component'

// styles
import './collection-overview.styles.scss'

const CollectionOverview = () => {
  const { collections } = useSelector(state => state.shop)

  return (
    <div className='collection-overview'>
      {Object.keys(collections).map(col => (
        <CollectionPreview
          key={collections[col].id}
          title={collections[col].title}
          items={collections[col].items}
        />
      ))}
    </div>
  )
}

export default CollectionOverview
