import React, { Component } from 'react'
import {getUser} from '../api2'
export default class User extends Component {
  state = {
    user:{}
  }
  componentDidMount () {
    getUser().then(res => {
      if (res.code == 0) {
        let user = res.data.user;
        this.setState({
          user
        })
      } else {
        this.props.history.push('/')
      }
    }).catch(error => {
      this.props.history.push('/')
    })
  }
  render() {
    return (
      <div>
        <div>欢迎{ this.state.user.username}</div>
      </div>
    )
  }
}
