import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from 'src/components/space/spaceContainer/logic/spaceActions'
import SpaceOverviewTab from './overview'
import SpaceSettingsTab from './settings'
import NavBar from './navBar'
import { spaceById } from 'src/components/space/spaceContainer/logic/spaceReducer'
import './spaceSettings.css'
import CategoriesAddTab from './categories'

// will be connected to store. Fetch for space with this name in didMount
class SpaceSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'overview',
      renderByActiveTab: {
        'overview': this.renderOverviewTab,
        'settings': this.renderSettingsTab,
        'categories': this.renderCategoriesTab
      }
    }
  }

  renderOverviewTab = () => {
    return <SpaceOverviewTab updateSpace={this.props.updateSpace} space={this.props.space} />
  }

  renderSettingsTab = () => {
    return <SpaceSettingsTab />
  }

  renderCategoriesTab = () => {
    return <CategoriesAddTab createCategory={this.props.categoryCreate} deleteCategory={this.props.categoryDelete} space={this.props.space} />
  }

  handleNavLinkCLick = (tabName) => {
    this.setState({
      activeTab: tabName
    })
  }

  render () {
    const {renderByActiveTab, activeTab} = this.state
    return (
      <div className='space-settings-page'>
        <h2 className='space-settings-page-header'>Space settings</h2>
        <NavBar
          handleNavLinkCLick={this.handleNavLinkCLick}
          allTabsName={Object.keys(renderByActiveTab)}
          activeTabName={activeTab}
        />
        { renderByActiveTab[activeTab]() }
      </div>
    )
  }
}

SpaceSettings.propTypes = {
  updateSpace: PropTypes.func.isRequired,
  categoryCreate: PropTypes.func.isRequired,
  categoryDelete: PropTypes.func.isRequired,
  space: PropTypes.object
}

SpaceSettings.defaultProps = {
  space: {
    owner: {},
    categories: []
  }
}

const mapStateToprops = (state) => {
  return {
    space: spaceById(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSpace: bindActionCreators(actions.updateSpaceRequest, dispatch),
    categoryCreate: bindActionCreators(actions.createCategoryRequest, dispatch),
    categoryDelete: bindActionCreators(actions.deleteCategoryRequest, dispatch)

  }
}

export default connect(mapStateToprops, mapDispatchToProps)(SpaceSettings)
