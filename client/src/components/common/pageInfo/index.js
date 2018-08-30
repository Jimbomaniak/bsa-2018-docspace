import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './pageInfo.css'

const PageInfo = ({ avatar, firstName, lastName, date, login }) => {
  return (
    <div className='page-info-container'>
      <Link className='page-info-image' to={`users/${login}`}>
        <img src={avatar} alt='UserAvatar' />
      </Link>
      <div className='page-info'>
        <Link className='page-info-author' to={`users/${login}`}>{firstName + ' ' + lastName}</Link>
        <div className='page-info-time'>{date}</div>
      </div>
    </div>
  )
}

PageInfo.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  date: PropTypes.string,
  login: PropTypes.login
}

PageInfo.defaultProps = {
  avatar: '',
  firstName: '',
  lastName: '',
  date: '',
  login: ''
}

export default PageInfo
