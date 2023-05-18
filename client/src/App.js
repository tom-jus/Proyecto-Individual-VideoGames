//Esta es la app es sí misma
import LandingPage from './components/Landing Page/LandingPage';
import Home from './components/Home/Home';
import Details from './components/Details/Details.jsx';
import CreateGame from './components/Create Game/CreateGame';
import EditVideoGame from './components/Edit Video Game/EditVideoGame';
import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
      <div style={{ textAlign: 'center' }}>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/videogame/:id" element={<Details />} />
        <Route path="/createGame" element={<CreateGame />} />
        <Route path="/editVideoGame/:id" element={<EditVideoGame />} />
    </Routes>
      </div>
  );
}

export default App;
