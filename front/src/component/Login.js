import React, { Component } from 'react'
import {signin} from '../api2'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.$USER = React.createRef();
    this.$PASS = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let username = this.username.value;
    let password = this.password.value;
    signin({ username, password }).then(response => {
      if (response.code == 0) {
        this.props.history.push('/user')
      } else {
        alert(response.error)
      }
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名 <input ref={username=>this.username=username} name="username"/>
        密码 <input ref={password=>this.password=password} />
        <input type="submit" />
      </form>
    )
  }
}
