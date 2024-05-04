// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detailperusahaan from './pages/Detail_perusahaan';
import Login from "./pages/Login";
import ForgotPasswordUserPage from "./pages/Forgot_Password_User";
import ForgotPasswordAdminPage from "./pages/Forgot_Password_Admin";
import Profilemagang from './pages/Profile_magang';
import Profilemaba from './pages/Profile_maba';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Switch> */}
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detailperusahaan />} />
        <Route path="/Profilemagang" element={<Profilemagang />} />
        <Route path="/Profilemaba" element={<Profilemaba />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/forgot-password-user"
          element={<ForgotPasswordUserPage />}
        />
        <Route
          path="/forgot-password-admin"
          element={<ForgotPasswordAdminPage />}
        />
        {/* Tambahkan rute lain jika diperlukan */}
        {/* </Switch> */}
      </Routes>
    </Router>
  );
};

export default App;
