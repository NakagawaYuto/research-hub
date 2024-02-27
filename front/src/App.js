import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import TodoPage from './Pages/Todopage';
import LogPage from './Pages/Logpage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoPage/>} />
        <Route path="/log/" element={<LogPage/>} />
      </Routes>
    </div>
  );
}

export default App;
