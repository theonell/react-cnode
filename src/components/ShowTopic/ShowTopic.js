import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './showtopic.css'
class ShowTopic extends Component {

  state = {
    data : null
  }

  componentDidMount(){
    const {id} = this.props.match.params
    axios.get(`https://cnodejs.org/api/v1/topic/${id}`)
    .then( res =>{
      // console.log(res)
      this.setState({
        data : res.data.data
      })
    })
    .catch( err => {
      alert(err)
    })
  }

  render() {
    // console.log(this.props)
    const { data } = this.state
    // console.log(data)
    const article = data ? (
      <div>
        <h2>{data.title}</h2>
        <span>作者：{data.author.loginname}</span>
        <span>浏览次数：{data.visit_count}</span>
        <span>发布于：{data.create_at}</span>
        <div>
          <div dangerouslySetInnerHTML = { {__html : data.content} }/>
        </div>
        <h2>全部回复</h2>
          {
            data.replies.map(
              item => {
                  /* console.log(item) */
                return (
                  <div key = { item.id } className = 'replies'>
                    <Link to = {`/user/${item.author.loginname}`}><img src={item.author.avatar_url} alt="waiter"/></Link>
                    <div>
                      <span>{item.author.loginname}</span>
                      <div dangerouslySetInnerHTML = { {__html : item.content} }/>
                    </div>
                  </div>
                )
              }
            )
          }
      </div>
    ) : '请稍等'
    return (
      <div className = 'art-content'>
        {article}
      </div>
    )
  }
}

export default ShowTopic