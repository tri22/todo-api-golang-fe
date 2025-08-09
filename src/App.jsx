import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Thêm vào đầu file App.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/index.jsx';
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />

        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </>
    </Router>
  );
}


export default App;
