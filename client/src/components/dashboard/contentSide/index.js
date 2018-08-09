import React, { Component } from 'react'
import Button from '../button'
import './contentSide.css'
import welcome from './welcome.png'
import PropTypes from 'prop-types'
import CreateSpaceModal from 'src/components/modals/createSpaceModal'

class ContentSide extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showSpaceModal: false
    }
  }

  toggleModal = () => {
    this.setState({
      showSpaceModal: !this.state.showSpaceModal
    })
  }

  render () {
    return (
      <div className={'dashboard__content__side'} >
        <div className={'header'}>
          <Button
            content={this.props.buttonName}
            onClick={this.toggleModal}
          />
        </div>
        <div className={'welcome'}>
          <h2>Welcome to Docspace</h2>
          <img src={welcome} alt='' />
          <span>Docspace is where your team collaborates and shares knowledge — create, share and discuss your files, ideas, minutes, specs, mockups, diagrams, and projects.

Делитесь полезными ссылками, объявлениями и информацией здесь</span>
        </div>
        {
          this.state.showSpaceModal &&
          <CreateSpaceModal
            toggleModal={this.toggleModal}
          /> }
      </div>
    )
  }
}
ContentSide.propTypes = {
  buttonName: PropTypes.string
}

export default ContentSide
