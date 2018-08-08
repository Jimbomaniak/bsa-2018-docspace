import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'

import SpaceHeaderButtons from 'src/components/space/spaceHeaderButtons'

import './spaceHeader.css'

class SpaceHeader extends Component {
  getType () {
    switch (this.props.location.pathname) {
      case '/spaces/TS/overview':
        return 'space'
      case '/spaces/TS/pages/666':
        return 'page'
      default:
        return 'clear'
    }
  }

  render () {
    const type = this.getType()

    return (
      <div className='header'>
        {
          type === 'clear' || type === 'space'
            ? <div className='header-name'>{this.props.space.name}</div>
            : (
              <div className='header-page'>
                <NavLink className='header-name page' to={`/spaces/${'TS'}/overview`}>{this.props.space.name}</NavLink>
                <NavLink className='buttons-item restrictions' title='Unrestricted' to={''}>
                  <i className='fas fa-lock-open' />
                </NavLink>
              </div>
            )
        }
        {
          type === 'clear'
            ? null
            : (
              <SpaceHeaderButtons type={type}>
                {
                  type === 'space'
                    ? <div className='space-button'>Remove From My Spaces</div>
                    : null
                }
              </SpaceHeaderButtons>
            )
        }
      </div>
    )
  }
}

SpaceHeader.propTypes = {
  space: PropTypes.object,
  location: PropTypes.object
}

SpaceHeader.defaultProps = {
  space: {},
  location: {}
}

const mapStateToProps = (state) => {
  return {
    space: state.spaces.byId.TS
  }
}

export default withRouter(connect(mapStateToProps)(SpaceHeader))
