import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Main from './Pages/Main'
import Login from './Pages/Login'
import Result from './Pages/Result'
import './App.css'



function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/result" component={Result} />
          <div className="app-wraper">
            <Route exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
          </div>
      </Switch>
    </Router>
  )
}

export default App;

      

