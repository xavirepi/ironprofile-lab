import './App.css';
import { Route, Switch } from 'react-router'
import Home from './components/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';


function App() {
  return (
    <div className="App">
      <Home/>

      <Switch>
        <Route exact path='/' />
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
