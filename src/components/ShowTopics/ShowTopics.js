import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './showtopics.css'

class ShowTopics extends Component {
  
  render() {
    const {data} = this.props
    // console.log(data)
    let cnt = data.length !== 0 ? data.map(
      item=>{
        return (
          <div key = { item.id } className = 'showtopics'>
            <Link to = {`/user/${item.author.loginname}`}><img src={item.author.avatar_url} alt="11"/></Link>
            <span className = 'show-num'>{item.reply_count}/{item.visit_count}</span>
            <span className = {`top-good ${(item.top||item.good) && 'active'}`}>{item.top ? '置顶' : item.good ? '精华' : item.tab === 'share' ? '分享' : '问答'}</span>
            <span className = 'topic-title'><Link to = {`/topic/${item.id}`}>{item.title}</Link></span>
          </div>
        )
      }
    ) : '请稍等'
    return (
      <div className = 'topics-contain'>
        { cnt }
      </div>
    )
  }
}

export default ShowTopics