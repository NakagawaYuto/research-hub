import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import TroublePage from './Pages/TroublePage';
import AddPage from './Pages/AddPage';
import TroubleDetailPage from './Pages/TroubleDetailPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TroublePage/>} />
        <Route path="/add/" element={<AddPage />} />
        <Route path="/trouble/:id" element={<TroubleDetailPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
