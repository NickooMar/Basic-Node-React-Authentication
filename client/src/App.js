import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/Login";
import SignUp from "./components/Signup";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <Router>
      <div className='app'>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetail" element={<UserDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
