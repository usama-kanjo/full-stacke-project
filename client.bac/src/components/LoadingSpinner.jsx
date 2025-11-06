import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ fullPage = false, size = 'md', text = 'Yükleniyor...' }) => {
  // Spinner boyutlarını belirle
  const spinnerSize = {
    sm: 'sm',
    md: '',
    lg: 'lg'
  };

  return (
    <div className={`d-flex flex-column justify-content-center align-items-center ${fullPage ? 'vh-100' : 'my-5'}`}>
      <Spinner
        animation="border"
        role="status"
        size={spinnerSize[size]}
        className={size === 'lg' ? 'mb-3' : ''}
      >
        <span className="visually-hidden">Yükleniyor...</span>
      </Spinner>
      {text && <span className={`mt-2 ${size === 'lg' ? 'fs-4' : ''}`}>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
