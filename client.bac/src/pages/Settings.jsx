import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

function Settings() {
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('tr');
  const navigate = useNavigate();

  // Tema ve dil ayarlarını localStorage'dan yükle
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    const savedLang = localStorage.getItem('language') || 'tr';
    setDarkMode(savedTheme);
    setLanguage(savedLang);
  }, []);

  // Tema değiştirme
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Dil değiştirme
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    toast.success('Dil ayarı kaydedildi!');
  };

  // Profil silme (örnek fonksiyon)
  const deleteAccount = async () => {
    if (!window.confirm('Hesabınızı silmek istediğinize emin misiniz?')) return;

    setLoading(true);
    try {
      await axios.delete('/user/delete-account');
      logout();
      toast.success('Hesabınız silindi.');
      navigate('/');
    } catch (error) {
      toast.error('Hesap silinirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Ayarlar</h3>
            </div>
            <div className="card-body">
              {/* Tema Ayarları */}
              <div className="mb-4">
                <h5 className="mb-3">Tema Ayarları</h5>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleTheme}
                  />
                  <label className="form-check-label">
                    Koyu Tema {darkMode ? '(Açık)' : '(Kapalı)'}
                  </label>
                </div>
              </div>

              {/* Dil Ayarları */}
              <div className="mb-4">
                <h5 className="mb-3">Dil Seçimi</h5>
                <div className="btn-group w-100" role="group">
                  <button
                    type="button"
                    className={`btn ${language === 'tr' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => changeLanguage('tr')}
                  >
                    Türkçe
                  </button>
                  <button
                    type="button"
                    className={`btn ${language === 'en' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => changeLanguage('en')}
                  >
                    İngilizce
                  </button>
                </div>
              </div>

              {/* Hesap İşlemleri */}
              <div className="mb-4">
                <h5 className="mb-3">Hesap İşlemleri</h5>
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={deleteAccount}
                >
                  Hesabı Sil
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/user/profile/edit')}
                >
                  Profili Düzenle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
