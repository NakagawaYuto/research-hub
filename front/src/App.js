import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import TroublePage from './Pages/TroublePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TroublePage/>} />
      </Routes>
    </div>
  );
}

export default App;
