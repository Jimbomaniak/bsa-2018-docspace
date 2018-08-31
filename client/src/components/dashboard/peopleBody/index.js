import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getAlUsersRequest} from './logic/allUsersActions'
import PropTypes from 'prop-types'
import './peopleBody.css'

class PeopleBody extends Component {
  componentDidMount () {
    this.props.actions.getAlUsersRequest()
  }

  render () {
    console.log(this.props.allUsers)
    const usersList = this.props.allUsers.map(user =>
      <tr>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{user.email}</td>
        <td>{user.login}</td>
      </tr>
    )
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr>
              <th>Full name</th>
              <th>Email</th>
              <th>Login</th>
            </tr>
            {usersList}
          </tbody>
        </table>
      </React.Fragment>

    )
  }
}
const mapStateToProps = state => ({
  allUsers: state.allUsers
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAlUsersRequest }, dispatch)
})

PeopleBody.propTypes = {
  actions: PropTypes.object,
  allUsers: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleBody)
