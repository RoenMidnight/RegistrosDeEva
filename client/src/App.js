import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardMembre from './components/BoardMembre';
import BoardCoruja from './components/BoardCoruja';
import BoardAdmin from './components/BoardAdmin';
import { logout } from './actions/auth';
import { className } from './actions/message';
import { history } from './helpers/history';

function App() {
  const [showCorujaBoard, setShowCorujaBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser){
      setShowCorujaBoard(currentUser.roles.includes("ROLE_CORUJA"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  }

  return (
    <Router history={history}>
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={"/"} className="navbar-brand">
            Registros de Eva
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/home'} className='nav-link'>
                Home
              </Link>
            </li>
            {showCorujaBoard && (
              <li className='nav-item'>
                <Link to={"/coruja"} className="nav-link">
                  Coruja Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className='nav-item'>
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className='nav-item'>
                <Link to={"/membre"} className="nav-link">
                  Membre
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/profile'} className='nav-link'>
                  {currentUser.username}
                </Link>
              </li>
              <li className='nav-item'>
                <a href="/login" className='nav-link' onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link to={'/login'} className='nav-link'>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/home']} component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={Profile} />
            <Route path='/membre' component={BoardMembre} />
            <Route path='/coruja' component={BoardCoruja} />
            <Route path='/admin' component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
