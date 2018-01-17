import React, { Component } from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import './header.css'

class Header extends Component {
  state = {
    token : '',
    login : false,
    userInfo: null
  }

  componentDidMount(){
    if(sessionStorage.token === 'c2a3daea-acab-4b35-b719-8cf0ae44a877'){
      axios.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:sessionStorage.token})
      .then(
        res => {
          this.setState({
            userInfo:res.data,
            login:true
          })
        }
      )
      .catch( err => {
        alert(err)
      })
    }
  }
  handleChange = e => {
    this.setState({
      token : e.target.value
    })
  }

  handleLogin = () => {
    const {token} = this.state
    sessionStorage.token = token
    axios.post('https://cnodejs.org/api/v1/accesstoken',{accesstoken:token})
    .then(
      res => {
        this.setState({
          userInfo:res.data,
          login:true
        })
      }
    )
    .catch( err => {
      alert(err)
    })
  }

  handleLogout = () => {
    sessionStorage.clear('token')
    this.setState({
      userInfo:null,
      token:'',
      login:false
    })
    this.props.history.push('/')
  }
  render() {
    const { token, login, userInfo } = this.state
    // console.log(userInfo)
    return (
      <div className = 'head-content'>
        <Link to = '/'><img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="11"/></Link>
        {
          login ? 
          (
            <div>
              <Link to = '/topic/create'><button>发布话题</button></Link>
              <Link to = {`/user/${userInfo.loginname}`}><img src={userInfo.avatar_url} alt="111"/></Link>
              <button onClick = {this.handleLogout}>退出</button>
            </div>
          ) 
          :
          (
            <div>
              <input type="text" value = {token} onChange = { this.handleChange }/>
              <button onClick = {this.handleLogin}>登录</button>
            </div>
          )
        }
      </div>
    )
  }
}

export default withRouter(Header)