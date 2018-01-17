import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './userinfo.css'

class UserInfo extends Component {

  state = {
    userinfo: null
  }
  getData = loginname => {
    axios.get(`https://cnodejs.org/api/v1/user/${loginname}`)
      .then(res => {
        this.setState({
          userinfo: res.data.data
        })
      })
      .catch(err => {
        alert(err)
      })
  }
  componentDidMount() {
    const { loginname } = this.props.match.params
    this.getData(loginname)
  }
  componentWillReceiveProps(nextProps) {
    const { loginname } = nextProps.match.params
    this.getData(loginname)
  }
  render() {

    const { userinfo } = this.state
    // console.log(userinfo)
    const intro = userinfo ? (
      <div>
        <div>
          <img src={userinfo.avatar_url} alt="11" />
          <span>{userinfo.loginname}</span>
        </div>
        <h4>最近创建的话题</h4>
        {
          (userinfo.recent_topics.length > 5 ? userinfo.recent_topics.slice(0, 5) : userinfo.recent_topics).map(
            item => {
              /* console.log(item) */
              return (
                <div key={item.id} className='info'>
                  <img src={item.author.avatar_url} alt="11" />
                  <Link to={`/topic/${item.id}`}><p>{item.title}</p></Link>
                </div>
              )
            }
          )
        }
        <h4>最近参与的话题</h4>
        {
          (userinfo.recent_replies.length > 5 ? userinfo.recent_replies.slice(0, 5) : userinfo.recent_replies).map(
            item => {
              return (
                <div key={item.id} className="info">
                  <Link to={`/user/${item.author.loginname}`}><img src={item.author.avatar_url} alt="11" /></Link>
                  <Link to={`/topic/${item.id}`}><p>{item.title}</p></Link>
                </div>
              )
            }
          )
        }
      </div>
    ) : '请稍等'
    return (
      <div className='userinfo'>
        {intro}
      </div>
    )
  }
}

export default UserInfo
