import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './Pages/Homepage';
import UserPage from './Pages/UserPage';
import AddUserPage from './Pages/AddUserPage';
import ThemePage from './Pages/ThemePage';
import MemoPage from './Pages/MemoPage';
import NoveltyPage from './Pages/NoveltyPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/add" element={<AddUserPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/user/:id/theme" element={<ThemePage />} />
        <Route path="/user/:id/memo" element={<MemoPage />} />
        <Route path="/user/:id/novelty" element={<NoveltyPage />} />
      </Routes>
    </div>
  );
}

export default App;
