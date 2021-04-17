import './App.css';
import { Route, Switch } from 'react-router'
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import img from './assets/img/oval-bg.png'


function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${img})`}}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
