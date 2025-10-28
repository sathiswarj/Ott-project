import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Component/Auth/Signup";
import Login from "./Component/Auth/Login";
import Table from './Component/Table'
function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
             <Route path="/home" element={<Table />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
