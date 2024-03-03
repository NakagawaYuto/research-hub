import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import TroublePage from './Pages/TroublePage';
import AddPage from './Pages/AddPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TroublePage/>} />
        <Route path="/add/" element={<AddPage />} />
      </Routes>
    </div>
  );
}

export default App;
