import React, { Component } from 'react'
import Modal from 'src/components/common/modal'
import WizardModalBody from './wizardModalBody'
// import SpaceFatcory from '../logic/spaceFactory'
import PropTypes from 'prop-types'

// import { createSpace } from 'src/components/space/spaceContainer/logic/spaceActions'
// TODO : implement form validation, createSpace request

export default class WizardSpaceModal extends Component {
  constructor (props) {
    super(props)
    // required filds for all kind of space templates
    this.state = {
      name: '',
      key: ''
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextState.isPrivate !== this.state.isPrivate
    )
  }

  handleCreateSpace = () => {
    // const spaseObj = SpaceFatcory.createByFieldsAndTemplateName(this.state, this.props.selectedTemplate.name)

    console.log(this.state)
  }

  handleFieldChange = (field) => {
    // TODO : service, that create a space by template type and then call createSpaceRequest
    // console.log(this.state)
    this.setState({
      [field.name]: field.value
    })
  }

  handleCheckboxChange = (checkbox) => {
    this.setState({
      [checkbox.name]: checkbox.checked
    })
  }

  renderModalHeader = () => {
    return (
      <h2 className='modal-header' >
        {`Create an ${this.props.selectedTemplate.name}`}
      </h2>
    )
  }

  renderModalFooter = () => {
    console.log('render')
    return (
      <div className='modal-footer'>
        <button onClick={this.props.handleBackClick}>
           Back
        </button>
        <button
          className='accept-button'
          onClick={this.handleCreateSpace}
        >
           Create
        </button>
        <button onClick={this.props.closeModal}>
           Close
        </button>
      </div>
    )
  }

  renderModalContent = () => (
    <WizardModalBody
      selectedTemplate={this.props.selectedTemplate}
      handleFieldChange={this.handleFieldChange}
      handleCheckboxChange={this.handleCheckboxChange}
      isPrivateCheckboxChecked={this.state.isPrivate}
    />
  )

  render () {
    return (
      <Modal
        renderHeader={this.renderModalHeader}
        renderFooter={this.renderModalFooter}
        renderContent={this.renderModalContent}
      />
    )
  }
}

WizardSpaceModal.propTypes = {
  selectedTemplate: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired
}
