import React, { useContext, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const { user, loading, logout, checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/user/logout');
      logout(); // AuthContext'ten gelen logout fonksiyonu
      toast.success('Başarıyla çıkış yapıldı');
      navigate('/login', { replace: true }); // Login sayfasına yönlendir

    } catch (error) {
      toast.error('Çıkış yapılırken hata oluştu');
      console.error('Logout error:', error);
    }
  };

  // Auth durumunu düzenli olarak kontrol et
  useEffect(() => {
    const interval = setInterval(() => {
      checkAuth();
    }, 200001); // Her 30 saniyede bir kontrol

    return () => clearInterval(interval);
  }, [checkAuth]);

  if (loading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <div className="navbar-brand">Yükleniyor...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">Kanjo</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/home" end>Ana Sayfa</NavLink>
                  {/*   <NavLink className="nav-link" to="/dashboard">Panel</NavLink> */}
                  {/* </li> */}
                  {/* <li className="nav-item dropdown"> */}
                  {/*   <a */}
                  {/*     className="nav-link dropdown-toggle" */}
                  {/*     href="#" */}
                  {/*     role="button" */}
                  {/*     data-bs-toggle="dropdown" */}
                  {/*     aria-expanded="false" */}
                  {/*   > */}
                  {/*     Hesaplar */}
                  {/*   </a> */}
                  {/*   <ul className="dropdown-menu"> */}
                  {/*     <li><Link className="dropdown-item" to="/accounts">Hesaplarım</Link></li> */}
                  {/*     <li><Link className="dropdown-item" to="/transactions">İşlemler</Link></li> */}
                  {/*   </ul> */}
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profil"
                      width="32"
                      height="32"
                      className="rounded-circle me-2"
                    />
                  ) : (
                    <i className="bi bi-person-circle me-2"></i>
                  )}
                  {user.name.split(' ')[0]} {/* Sadece ilk ismi göster */}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/user/profile">
                      <i className="bi bi-person me-2"></i>Profil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/user/settings">
                      <i className="bi bi-gear me-2"></i>Ayarlar
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Çıkış Yap
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
                  <i className="bi bi-box-arrow-in-right me-1"></i> Giriş Yap
                </Link>
                <Link to="/register" className="btn btn-light">
                  <i className="bi bi-person-plus me-1"></i> Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
