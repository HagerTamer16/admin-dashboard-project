import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import ChangePassword from './pages/changepassword';
import AddAdmin from './pages/AddAdmin';
import ForgotPassword from './pages/forgotpassword';
import VerifyOtp from './pages/Verifyotp';
import NewPassword from './pages/Newpassword';
import Request from './pages/Request';
import Booking from './pages/Booking';
import ReviewRequest from './pages/ReviewRequest';
import './App.css';

const DashboardLayout = ({ children }) => (
  <div className="app-layout">
    <Sidebar active="Dashboard" />
    <div className="main-wrapper">
      <Navbar username="Hager" />
      <main className="main-content">
        {children}
      </main>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/change-password" element={
          <DashboardLayout>
            <ChangePassword />
          </DashboardLayout>
        } />
        <Route path="/add-admin" element={
          <DashboardLayout>
            <AddAdmin />
          </DashboardLayout>
        } />
        <Route path="/request" element={
          <DashboardLayout>
            <Request />
          </DashboardLayout>
        } />
        <Route path="/request/:id" element={
          <DashboardLayout>
            <ReviewRequest />
          </DashboardLayout>
        } />
        <Route path="/booking" element={
          <DashboardLayout>
            <Booking />
          </DashboardLayout>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;