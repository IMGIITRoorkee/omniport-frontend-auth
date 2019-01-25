import React, { Component } from 'react'
import { connect } from 'react-redux'

import { userLogout } from '../actions'
import { getLoginUrl } from '../urls'
@connect(
  null,
  { userLogout }
)
export class Logout extends Component {
  componentDidMount() {
    const { userLogout, history } = this.props

    userLogout(_, () => {
      history.push(getLoginUrl())
    })
  }
  render() {
    return <></>
  }
}
