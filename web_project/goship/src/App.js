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
import DetailMahasiswa from './pages/DetailMahasiswa';
import CardFailed from './pages/notif_failed';
import CardFailedLogin from './components/handle_notif/notif_failed_login';
import { CardForm } from './components/profile/magang';
import CardFormHome from './pages/form_post';
import CardFailedEdit from './components/handle_notif/notif_failed_edit';
import CardSuccessLogin from './components/handle_notif/notif_succes_login';

const App = () => {
      return (
            <Router>
                  <Routes>
                        {/* <Switch> */}
                        <Route path="/" element={<Home />} />
                        <Route path="/detail-company/:id" element={<Detailperusahaan />} />
                        <Route path="/detail-student/:id" element={<DetailMahasiswa />} />
                        <Route path="/Profilemagang" element={<Profilemagang />} />
                        <Route path="/student-profile" element={<Profilemaba />} />
                        
                        {/* <Route path="/notif-failed-login" element={<CardFailedLogin />} />
                        <Route path="/notif-failed-edit" element={<CardFailedEdit />} /> */}
                         <Route path="/notif-login" element={<CardSuccessLogin />}/>

                        <Route path="/login" element={<Login />} />
                        <Route
                              path="/reset-password-user"
                              element={<ForgotPasswordUserPage />}
                        />
                        <Route
                              path="/reset-password-admin"
                              element={<ForgotPasswordAdminPage />}
                        />
                        {/* Tambahkan rute lain jika diperlukan */}
                        {/* </Switch> */}
                  </Routes>
            </Router>
      );
};

export default App;
