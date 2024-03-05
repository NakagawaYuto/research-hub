import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import TroublePage from './Pages/TroublePage';
import AddPage from './Pages/AddPage';
import TroubleDetailPage from './Pages/TroubleDetailPage';
import EditPage from './Pages/EditPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TroublePage/>} />
        <Route path="/add/" element={<AddPage />} />
        <Route path="/trouble/:id" element={<TroubleDetailPage/>}/>
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
