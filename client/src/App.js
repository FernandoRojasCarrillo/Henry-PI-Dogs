import { Route } from 'react-router-dom';
import './App.css';
import CreateDog from './components/CreateDog/CreateDog';
import Detail from './components/Detail/Detail';
import Favorites from './components/Favorites/Favorites';
import Home from './components/Home/Home';
import LandingPage from './components/Landing-page/LandingPage';

function App() {

  return (
    <div className="App">
      <Route exact path={'/'} >
        <LandingPage/>
      </Route>

      <Route exact path={'/home'}>
        <Home/>
      </Route>

      <Route path={'/detail/:dogId'} >
        <Detail/>
      </Route>

      <Route path={'/formulario'} >
        <CreateDog/>
      </Route>

      <Route path={'/favorites'} >
        <Favorites/>
      </Route>
    </div>
  );
}

export default App;
