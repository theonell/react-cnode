import React, { Component } from 'react'
import 
{
  HashRouter as Router, 
  Route,
  Switch
} 
from 'react-router-dom'
import Home from '../Home/Home'
import ShowTopic from '../ShowTopic/ShowTopic'
import UserInfo from '../UserInfo/UserInfo'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import CreateTopic from '../CreateTopic/CreateTopic'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path = '/topic/create' component = {CreateTopic}></Route>
            <Route path = '/' exact component = {Home}></Route>
            <Route path = '/topic/:id' component = {ShowTopic}></Route>
            <Route path = '/user/:loginname' component = {UserInfo}></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App