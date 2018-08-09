import React, {Component} from 'react'
import Dashboard from './sidebar'
import FullSidebar from './sidebar/fullSidebar'
import PropTypes from 'prop-types'
import DashboardWork from './dashboardWork/index'

class DashboardWrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLabels: true,
      showIcons: true
    }
    this.changeLabels = this.changeLabels.bind(this)
  }
  changeLabels (size) {
    this.setState({
      showLabels: size > 240
    })
    this.setState({
      showIcons: size > 130
    })
  }
  render () {
    const showIconForTabs = true
    return (
      <div>
        <Dashboard
          changeLable={this.changeLabels}
          colorSchema={'sidebar-blue-schema'}
          rightSidebar={<FullSidebar showLabels={this.state.showLabels} showIcons={this.state.showIcons} />}
          tabs={<FullSidebar showLabels={this.state.showLabels} showIcons={showIconForTabs} />}
          content={<DashboardWork />}
        />
      </div>
    )
  }
}

export default DashboardWrapper

Dashboard.propTypes = {
  changeLabels: PropTypes.func,
  showIcons: PropTypes.func
}
