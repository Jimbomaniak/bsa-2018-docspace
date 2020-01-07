import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './app.css'

import DashboardSidebar from 'components/dashboard/sidebar'
import DashboardMain from 'components/dashboard/main'
import Activity from 'components/dashboard/main/activity'
import People from 'components/dashboard/main/people'
import Spaces from 'components/dashboard/main/spaces'
import Work from 'components/dashboard/main/work'
import User from 'components/containers/user'
import SpaceContainer from 'components/space/spaceContainer'
import SpaceSidebar from 'components/space/spaceSidebar'
import BlogSidebar from 'components/blog/blogSidebar'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import SplitPane from 'react-split-pane'
import FullSidebar from 'components/dashboard/sidebar/fullSidebar'
import Administration from 'components/administration'
import GroupPage from 'components/group/groupPage'
import Page404 from 'components/common/page404'
import { AutoSizer } from 'react-virtualized'

import SearchPage from 'components/searchPage'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpened: true,
      showLabels: true,
      showIcons: true,
      showSpaceIcons: true,
      showSpaceLabels: true
    }
  }
  changeSize (size) {
    this.setState({
      isOpened: size > 70,
      showIcons: size > 70,
      showLabels: size > 145,
      showSpaceIcons: size > 110,
      showSpaceLabels: size > 155
    })
  }

  renderSidebarDependOnLocation = () => {
    const pathname = this.props.location.pathname

    if (pathname.includes('/blog')) {
      return <BlogSidebar
        isOpened={this.state.isOpened}
        showLabels={this.state.showSpaceLabels}
        showContent={this.state.showSpaceIcons}
      />
    }

    if (pathname.includes('/spaces/')) {
      return <SpaceSidebar
        isOpened={this.state.isOpened}
        showLabels={this.state.showSpaceLabels}
        showContent={this.state.showSpaceIcons}
      />
    }

    return <DashboardSidebar
      isOpened={this.state.isOpened}
      showLabels={this.state.showLabels}
      showIcons={this.state.showIcons}
      tabs={<FullSidebar showIcons />}
    />
  }

  render () {
    const { error } = this.props
    // const showIconsInMinimizeDashboard = true

    return (

      <React.Fragment>
        { error.status && error.status === 404
          ? <Page404 />
          : <div className='app__root' >
            <SplitPane
              split='vertical'
              minSize={70}
              defaultSize={350}
              maxSize={700}
              onChange={size => { this.changeSize(size) }}
            >
              {
                this.renderSidebarDependOnLocation()
              }
              <AutoSizer disableHeight>
                {(({ width }) => {
                  return <DashboardMain width={width}>
                    <Switch>
                      <Route path='/' exact render={() => <Redirect to='/activity/allupdates' />} />
                      <Route path='/works' component={Work} />
                      <Route path='/activity' component={Activity} />
                      <Route path='/people' component={People} />
                      <Route path='/spacedirectory' component={Spaces} />
                      <Route path='/users/:login' component={User} />
                      <Route path='/spaces/:id' component={SpaceContainer} />
                      <Route path='/group/:id' exact component={GroupPage} />
                      <Route path='/admin' component={Administration} />
                      <Route path='/advanced_search_page' component={SearchPage} />
                      <Redirect to={'/'} />
                    </Switch>
                  </DashboardMain>
                })}
              </AutoSizer>
            </SplitPane>
          </div>
        }
      </React.Fragment>
    )
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  error: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}
export default withRouter(connect(mapStateToProps, null)(App))
