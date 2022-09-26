import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TodoForm from "./pages/TodoForm"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/TodoForm' element={<TodoForm/>} />
      <Route path='/TodoForm/:id' element={<TodoForm/>} />
      <Route path="*" element={<h1>Page 404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
