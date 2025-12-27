import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { EyeIconeeee, EyeOffIcon, GoogleIconeeee } from '../ui/Icons';
import styles from './rigister.module.css';
import { authService } from '@/services/authService';
import { RegisterData } from '@/types/user'

const SignUpForm: React.FC = () => {
  const router = useRouter()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    acceptTerms: false
  })

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password || !formData.name) {
      toast.error('Please fill all fields');
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (!formData.acceptTerms) {
      toast.error('You must accept the terms and conditions');
      return;
    }
    setLoading(true);

    try {
      const { passwordConfirm: _, acceptTerms: __, ...registerData } = formData;
      const result = await authService.register(registerData);
      console.log('Giriş başarılı!', result)
      toast.success('Kayıt başarılı!')
      router.push('/auth/login');
    } catch (err: any) {
      // setError(err.response?.data?.message || 'Giriş başarısız')
      console.error('Kayıt başarısız', err);
      toast.error(err.response?.data?.message || 'Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className={styles.signupContainer}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.leftPanelContent}>
          <h2>Join Our Community</h2>
          <p>Create an account to start your journey with us. We are happy to have you!</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <h1 className={styles.formTitle}>Hesap Oluştur</h1>
        <p className={styles.formSubtitle}>Topluluğumuza katılın ve yolculuğunuza başlayın.</p>

        <button className={styles.googleBtn}>
          <GoogleIconeeee />
          <span>Google ile Kayıt Ol</span>
        </button>

        <div className={styles.separator}>
          <hr />
          <span>veya e-posta ile</span>
          <hr />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="name">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="kullanici adiniz"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">
              E-posta
            </label>
            <input
              type="email"
              autoComplete="off"
              required
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@eposta.com"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="password">
              Şifre
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                required
                value={formData.password}
                placeholder="••••••••"
                className={styles.formInput}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.togglePasswordBtn}
                aria-label={passwordVisible ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {passwordVisible ? <EyeOffIcon /> : <EyeIconeeee />}
              </button>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="confirm-password">
              Şifreyi Onayla
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="passwordConfirm"
                required
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="••••••••"
                className={styles.formInput}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className={styles.togglePasswordBtn}
                aria-label={confirmPasswordVisible ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {confirmPasswordVisible ? <EyeOffIcon /> : <EyeIconeeee />}
              </button>
            </div>
          </div>

          <div className={styles.termsGroup}>
            <input
              id="acceptTerms"
              required
              checked={formData.acceptTerms}
              onChange={handleChange}
              name="acceptTerms"
              type="checkbox"
            />
            <div className={styles.termsLabelGroup}>
              <label htmlFor="terms">
                <a href="#">Kullanım Koşulları ve Gizlilik Politikası</a>nı okudum ve kabul ediyorum.
              </label>
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? (
              <>
                <div className={styles.spinner}></div>
                Hesap Oluşturuluyor...
              </>
            ) : (
              'Hesap Oluştur'
            )}
          </button>
        </form>

        <p className={styles.loginPrompt}>
          Zaten bir hesabın var mı?{' '}
          <Link href="/auth/login" className={styles.loginLink}>
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
