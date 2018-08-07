import React from 'react'
import PropTypes from 'prop-types'

import './pagesList.css'

const PagesList = ({ pages }) => {
  return (
    <div className='pages-list'>
      <div className='pages-list-title'>
        Pages
      </div>
      <div>
        {
          pages.map((page, i) => {
            return (
              <div className='pages-list-item' key={i}>
                <div className='pages-list-item-icon'>•</div>
                <div className='pages-list-item-name'>{page.name}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

PagesList.propTypes = {
  pages: PropTypes.array
}

PagesList.defaultProps = {
  pages: []
}

export default PagesList
