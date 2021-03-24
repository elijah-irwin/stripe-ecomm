import React from 'react'

// redux
import { useSelector } from 'react-redux'

// components
import MenuItem from '../menu-item/menu-item.component'

// styles
import './directory.styles.scss'

const Directory = () => {
  const { sections } = useSelector(state => state.directory)

  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...rest }) => (
        <MenuItem key={id} {...rest} />
      ))}
    </div>
  )
}

export default Directory
