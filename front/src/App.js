import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import TodoPage from './Pages/Todopage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoPage/>} />
      </Routes>
    </div>
  );
}

export default App;
