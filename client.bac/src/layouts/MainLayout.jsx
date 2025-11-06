// src/layouts/MainLayout.jsx
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Outlet /> {/* Burada sayfa içeriği render edilecek */}
      </div>
    </>
  );
}
