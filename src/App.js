import './App.css';
import { Route, Switch } from 'react-router';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import img from './assets/img/oval-bg.png'
import { useEffect, useState } from 'react';
import { getAccessToken } from './store/AccessTokenStore';
import { getUserInfo } from './services/UserService'
import Profile from './components/Profile/Profile';

function App() {
  const [user, setUser] = useState(null);

  const getUser = () => {
    return getUserInfo().then((response) => setUser(response));
  };

  useEffect(() => {
    if (getAccessToken()) {
      getUser();
    }
  }, []);

  return (
    <div className="App" style={{ backgroundImage: `url(${img})`}}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' render={() => <Login doLogin={getUser} />} />
        <Route exact path='/loggedin' component={Profile}/>
      </Switch>
    </div>
  );
}

export default App;
