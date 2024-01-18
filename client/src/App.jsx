import "./App.css";
import Main from "./components/main";
import login from "./components/login";
import noapi_loop from "./components/noapi_loop";

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { pageNotFound } from "./components/pageNotFound";
import logo from './assets/react.svg';
import { useState } from "react";


function App() {

  return (
    <Router >
     <div className="App"> 


            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title"> React + NoAPI</h1>
            </header>

          <div className="information">

              <Switch>
              
                      <Route exact path= "/" render={() => (
                        <Redirect to="/home"/>
                          )}/>
                      

                      <Route exact  path='/home'  component= {  Main  }   />

                      <Route exact  path='/noapi_loop'  component= {  noapi_loop  }   />
                      <Route exact  path='/login'  component={login}  />
                      <Route exact  path='/*' component={pageNotFound} /> 

              </Switch>

          </div> 


    </div>
     </Router>
  );
}

export default App;
