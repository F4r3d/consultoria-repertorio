import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SelecionarEstilo from './components/SelecionarEstilo';
import MusicasPage from './components/MusicasPage';
import Submeter from './components/Submeter'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/estilos" element={<SelecionarEstilo />} />
        <Route path="/musicas" element={<MusicasPage />} />
        <Route path="/submeter" element={<Submeter />} />
      </Routes>
    </>
  );
}

export default App;