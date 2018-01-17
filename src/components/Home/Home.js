import React, { Component } from 'react'
import axios from 'axios'
import ShowTopics from '../ShowTopics/ShowTopics'
import './home.css'

class Home extends Component {
  
  state = {
    data : [],
    tab : 'all'
  }

  getData = tab => {
    axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab === 'all'?'':tab}`)
    .then(
      res =>{
        this.setState({
          data : res.data.data
        })
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }

  componentDidMount(){
    this.getData('all')
   }

   handleClick = tab => {
    this.getData(tab)
    this.setState({
      tab : tab
    })
   }

  render() {
    const tabsArr = [
      {
        id:1,
        tab:'all',
        text:'全部'
      },
      {
        id:2,
        tab:'good',
        text:'精华'
      },
      {
        id:3,
        tab:'share',
        text:'分享'
      },
      {
        id:4,
        tab:'ask',
        text:'问答'
      },
      {
        id:5,
        tab:'job',
        text:'招聘'
      }
    ]
    //将导航那条tab栏map出来 (映射)
    const { data, tab } = this.state
    let tabs = tabsArr.map(
      item=>{
        return (
          <span key = {item.id} onClick = {()=>{this.handleClick(item.tab)}} className = {`${tab===item.tab&&'active'}`}>{item.text}</span>
        )
      }
    )
    
    return (
      <div className = 'wrap'>
        <div className = 'tabs'>
          { tabs }
        </div>
          <ShowTopics data = { data }/>
      </div>
    )
  }
}

export default Home