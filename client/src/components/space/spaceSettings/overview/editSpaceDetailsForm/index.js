import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './editSpaceDetailsForm.css'

import img from 'src/resources/logo.svg'

export default class EditSpaceDetailsForm extends Component {
  constructor (props) {
    super(props)
    const {space} = this.props
    this.state = {
      name: space.name,
      description: space.description,
      categories: space.categories.join(' '),
      logo: space.logo,
      homePage: space.homePage
    }
  }

  handleFieldChange = (field) => {
    this.setState({
      [field.name]: field.value
    })
  }

  handleHomePageInput = (input) => {
    const pattern = new RegExp(input.value, 'i')
    const pages = this.props.space.pages
    const filtered = pages.filter((page) => pattern.test(page.name))
    console.log(filtered)
    // TODO : dropdown list with matched pages or warning, choosing page and set page.id to state
    // OR   : we can use select with all pages instead of input, it's gonna be better maybe
  }

  handleSave = () => {
    const space = {
      _id: this.props.space._id,
      name: this.state.name,
      description: this.state.description
    }

    this.props.updateSpace(space)
    this.props.goBackToDetails()
  }

  render () {
    const {name, description, categories, logo, homePage} = this.state

    return (
      <form className='edit-space-details-form'>
        <div className='field-group avatar-field'>
          <label>Space logo</label>
          <img id='space-logo' className='field-value space-avatar' src={logo} />
           [<span className='link'>change</span>]
        </div>

        <div className='field-group'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            defaultValue={name}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>

        <div className='field-group'>
          <label>Description</label>
          <textarea
            type='text'
            name='description'
            defaultValue={description}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>

        <div className='field-group'>
          <label>Categories</label>
          <input
            type='text'
            name='categories'
            defaultValue={categories}
            onChange={({target}) => this.handleFieldChange(target)}
          />
        </div>

        <div className='field-group'>
          <label>Home page</label>
          <input
            type='text'
            name='homePage'
            defaultValue={homePage}
            onChange={({target}) => this.handleHomePageInput(target)}
          />
        </div>

        <div className='btn-group'>
          <label />
          <button type='submit' onClick={this.handleSave}> Save </button>
          <button onClick={this.props.goBackToDetails}> Cancel </button>
        </div>
      </form>

    )
  }
}

EditSpaceDetailsForm.propTypes = {
  goBackToDetails: PropTypes.func.isRequired,
  updateSpace: PropTypes.func.isRequired,
  space: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    categories: ['one', 'two', 'label'],
    logo: img,
    homePage: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.object)
  })
}

EditSpaceDetailsForm.defaultProps = {
  space: {
    name: 'name',
    description: 'lore ipsum',
    categories: ['one', 'two', 'label'],
    logo: img,
    homePage: 'my home page',
    pages: [{name: 'first page'}, {name: 'my home page'}]
  }
}
