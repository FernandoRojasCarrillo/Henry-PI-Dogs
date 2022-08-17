import { Route } from 'react-router-dom';
import './App.css';
import CreateDog from './components/CreateDog/CreateDog.jsx';
import Detail from './components/Detail/Detail.jsx';
import DogsCreated from './components/DogsCreated/DogsCreated.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/Landing-page/LandingPage.jsx';
import { ChatBot } from './components/ChatBot/ChatBot';


function App() {

  return (
    <div className="App">
      <Route exact path={'/'} >
        <LandingPage/>
      </Route>

      <Route path={'/'} >
        <ChatBot/>
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

      <Route path={'/created'} >
        <DogsCreated/>
      </Route>
    </div>
  );
}

export default App;
