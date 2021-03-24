import React from 'react'
import { useHistory } from 'react-router-dom'

// styles
import './menu-item.styles.scss'

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  let history = useHistory()

  return (
    <div className={`${size} menu-item`} onClick={() => history.push(linkUrl)}>
      <div
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className='content'>
        <div className='title'>{title.toUpperCase()}</div>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  )
}

export default MenuItem
