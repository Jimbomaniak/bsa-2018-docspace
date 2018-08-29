import React from 'react'
import PropTypes from 'prop-types'
import getRightProps from '../chooseContentHelper'
import ContentCard from '../contentCard'
import './myUpdatesTab.css'
import { Link } from 'react-router-dom'

const MyUpdatesTab = (props) => {
  if (props.currentUserUpdates.length) {
    return (
      <div className='update-items-list'>
        <div className='current-user-info'>
          <Link to={`/users/${props.userLogin}`}>
            {props.userAvatar
              ? <img src={props.userAvatar} alt='avatar' className='current-user-img' />
              : <i id='user-avatar' className='fas fa-user-circle' />
            }
            <h3>{props.userName}</h3>
          </Link>
        </div>
        <div className='update-items'>
          {props.currentUserUpdates.map((item, index) => {
            let content = getRightProps(item)
            if (content) {
              return <ContentCard key={index} content={content} />
            }
            return null
          }
          )}
        </div>
      </div>
    )
  }
  return null
}

MyUpdatesTab.propTypes = {
  userAvatar: PropTypes.string,
  userName: PropTypes.string.isRequired,
  currentUserUpdates: PropTypes.array.isRequired,
  userLogin: PropTypes.string.isRequired
}

export default MyUpdatesTab
