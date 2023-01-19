import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './components/HomeScreen';
import SignUp from './components/SignUp';
import LoggedIn from './components/LoggedIn';
import NavBar from './components/NavBar';
import ItemList from './components/ItemList';
import AccountList from './components/AccountList';
import ListList from './components/ListList';
import EditList from './components/EditList';
import NewItem from './components/NewItem';
import Settings from './components/Settings';
import SettingsUpdate from './components/SettingsUpdate';
import './App.css';
import Emailverification from './components/Emailverification';
  
class App extends Component {
  render() {
    return (
      <Router>
         <NavBar />
           <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/signup' element={< SignUp />}></Route>
                <Route exact path='/loggedin' element={< LoggedIn />}></Route>
                <Route exact path='/items' element={< ItemList />}></Route>
                <Route exact path='/accounts' element={< AccountList />}></Route>
                <Route exact path='/lists' element={< ListList />}></Route>
				        <Route exact path='/EditList/:id' element={< EditList />}></Route>
                <Route exact path='/emailverification' element={< Emailverification />}></Route>
                <Route exact path='/settings' element={< Settings />}></Route>
                <Route exact path='/settingsUpdate' element={< SettingsUpdate />}></Route>
                <Route exact path='/NewItem' element={< NewItem />}></Route>
          </Routes>
       </Router>
   );
  }
}
  
export default App;