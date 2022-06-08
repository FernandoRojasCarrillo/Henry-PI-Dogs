import { Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import LandingPage from './components/Landing-page/LandingPage';

function App() {

  return (
    <div className="App">
      <Route exact path={'/'} >
        <LandingPage/>
      </Route>

      <Route path={'/home'}>
        <Home/>
      </Route>
    </div>
  );
}

export default App;
