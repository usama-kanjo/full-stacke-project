import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { MailIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, LogoIcon, GoogleIcon } from '../ui/Icons';
import styles from './LoginForm.module.css';
import { LoginData } from '@/types/user'
import { authService } from '@/services/authService';
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  const router = useRouter();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  })


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);

    try {
      const result = await authService.login(formData);
      console.log('Giriş başarılı!', result)
      toast.success('Giriş başarılı!')
      router.push('/dashboard');
    } catch (err: any) {
      // setError(err.response?.data?.message || 'Giriş başarısız')
      console.error('Giriş başarısız', err);
      toast.error(err.response?.data?.message || 'Giriş başarısız');
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
    <div className={styles.loginFormContainer}>
      <div className={styles.loginFormHeader}>
        <div className={styles.logoWrapper}>
          <LogoIcon className={styles.logoIcon} />
        </div>
        <h1 className={styles.loginFormTitle}>Hesabınıza giriş yapın</h1>
        <p className={styles.loginFormSubtitle}>Tekrar hoş geldiniz! Lütfen bilgilerinizi girin.</p>
      </div>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            E-posta
          </label>
          <div className={styles.inputWrapper}>
            <div className={styles['input-icon-container--prefix']}>
              <MailIcon className={styles.inputIcon} />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`${styles.formInput} ${styles.withPrefix}`}
              placeholder="E-posta adresinizi girin"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formGroupHeader}>
            <label htmlFor="password" className={styles.formLabel}>
              Şifre
            </label>
            <Link href="/auth/forgot-password" className={styles.link}>
              Şifremi Unuttum?
            </Link>
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles['input-icon-container--prefix']}>
              <LockClosedIcon className={styles.inputIcon} />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`${styles.formInput} ${styles.withPrefix} ${styles.withSuffix}`}
              placeholder="Şifrenizi girin"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.passwordToggleBtn}
              aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
            >
              {showPassword ? (
                <EyeSlashIcon className={styles.inputIcon} />
              ) : (
                <EyeIcon className={styles.inputIcon} />
              )}
            </button>
          </div>
        </div>

        <div>
          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? (
              <>
                <div className={styles.spinner}></div>
                Giriş yapilyor...
              </>
            ) : (
              'Giriş Yap'
            )}
          </button>
        </div>
      </form>

      <div className={styles.divider}>
        <span className={styles.dividerLine}></span>
        <span className={styles.dividerText}>VEYA</span>
        <span className={styles.dividerLine}></span>
      </div>

      <div>
        <button
          type="button"
          className={styles.googleBtn}
        >
          <GoogleIcon className={styles.googleIcon} />
          Google ile Giriş Yap
        </button>
      </div>


      <p className={styles.signupPrompt}>
        Hesabınız yok mu?{' '}
        <Link href="/auth/rigister" className={`${styles.link} ${styles.signupLink}`}>
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
