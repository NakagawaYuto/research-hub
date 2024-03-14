import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";

import HomePage from './pages/Homepage';
import UserPage from './pages/UserPage';
import AddUserPage from './pages/AddUserPage';
import ThemePage from './pages/ThemePage';
import MemoPage from './pages/MemoPage';
import NoveltyPage from './pages/NoveltyPage';
import TodoPage from './pages/Todopage';
import LogPage from './pages/Logpage';
import TroublePage from './pages/TroublePage';
import AddPage from './pages/AddPage';
import TroubleDetailPage from './pages/TroubleDetailPage';
import EditPage from './pages/EditPage';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/add" element={<AddUserPage />} />
        <Route path="/user/:user_id" element={<UserPage />} />
        <Route path="/user/:user_id/theme" element={<ThemePage />} />
        <Route path="/user/:user_id/memo" element={<MemoPage />} />
        <Route path="/user/:user_id/novelty" element={<NoveltyPage />} />
      
        <Route path="/user/:user_id/todo/" element={<TodoPage/>} />
        <Route path="/user/:user_id/log/" element={<LogPage/>} />

        <Route path="/user/:user_id/trouble/" element={<TroublePage/>} />
        <Route path="/user/:user_id/add/" element={<AddPage/>} />
        <Route path="/user/:user_id/trouble/:trouble_id" element={<TroubleDetailPage/>}/>
        <Route path="/user/:user_id/edit/:trouble_id" element={<EditPage/>} />
      </Routes>
    </div>
  );
}

export default App;
