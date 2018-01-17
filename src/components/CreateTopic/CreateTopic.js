import React, { Component } from 'react'
import axios from 'axios'
import './createtopic.css'

class CreateTopic extends Component {
  
  state = {
    title : '',
    content : ''
  }

  handleTitle = e => {
    this.setState({
      title : e.target.value
    })
  }

  handleContent = e => {
    this.setState({
      content : e.target.value
    })
  }

  handleSubmit = () => {
    const data = {
      content : this.state.content,
      title : this.state.title,
      accesstoken : sessionStorage.token,
      tab : 'dev'
    }
    axios.post('https://cnodejs.org/api/v1/topics',data)
    .then( res => {
      this.setState({
        content: '',
        title : ''
      })
      this.props.history.push(`/topic/${res.data.topic_id}`)
    })
    .catch( err => {
      alert(err)
    })
  }
  render() {
    return (
      <div className = 'create-topic'>
        <input type="text" value = {this.state.title} onChange = {this.handleTitle} />
        <textarea value = {this.state.content} onChange = {this.handleContent}></textarea>
        <button onClick = {this.handleSubmit}>提交</button>
      </div>
    )
  }
}

export default CreateTopic