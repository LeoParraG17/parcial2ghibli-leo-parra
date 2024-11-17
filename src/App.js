import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Character from './components/Character';
import CharacterDetails from './components/CharacterDetails';
import CharacterDetail from './components/CharacterDetail';
import VehicleDetail from './components/VehicleDetail';
import SpeciesDetail from './components/SpeciesDetail';
import LocationDetail from './components/LocationDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Character />} />
          <Route path='/films/:id' element={<CharacterDetails />} />
          <Route path='/character/:id' element={<CharacterDetail />} />
          <Route path='/vehicle/:id' element={<VehicleDetail />} />
          <Route path='/species/:id' element={<SpeciesDetail />} />
          <Route path='/location/:id' element={<LocationDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;