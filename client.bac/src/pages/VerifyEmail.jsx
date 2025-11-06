import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePageTitle from '../hooks/usePageTitle';

function VerifyEmail() {
  usePageTitle('Verify Your Email');
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [countdown, setCountdown] = useState(0); // 3 saniye geri sayım için

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    setIsLoading(true);
    setCountdown(3); // 3 saniye geri sayım başlat

    // 3 saniye yapay bekleme
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const response = await axios.get(`/user/verify-email/${token}`);
      // setVerificationStatus(response.data.message.includes('already') ? 'already_verified' : 'success');
      setVerificationStatus('success');
      console.log('Verification response:', response);
    } catch (err) {
      console.error('Verification error:', err);
      setVerificationStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Başarılı durum ekranı
  if (verificationStatus === 'success') {
    return (
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-5 rounded text-center">
          <h2 className="text-success">✓ Verification Successful!</h2>
          <p className="mb-4">Your email has been successfully verified.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/login')}
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  // Diğer durumlar (already_verified, failed, pending) aynı şekilde kalacak...
  // ... (Önceki örnekteki diğer durum ekranlarını buraya ekleyin)



  // // Zaten doğrulanmış durum ekranı
  // if (verificationStatus === 'already_verified') {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
  //       <div className="bg-white p-5 rounded text-center">
  //         <h2 className="text-success">Already Verified</h2>
  //         <p className="mb-4">This email address was already verified.</p>
  //         <button
  //           className="btn btn-primary"
  //           onClick={() => navigate('/login')}
  //         >
  //           Continue to Login
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // Başarısız durum ekranı
  if (verificationStatus === 'failed') {
    return (
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-5 rounded text-center">
          <h2 className="text-danger">Verification Failed</h2>
          <p className="mb-4">Invalid or expired verification link.</p>
          <div className="d-flex gap-3 justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
            <button
              onClick={() => {
                setVerificationStatus('pending');
                handleVerify();
              }}
              disabled={isLoading}
              className="btn btn-secondary"
            >
              {isLoading ? 'Retrying...' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-5 rounded text-center">
        <h2>Verify Your Email</h2>
        <p className="mb-4">Click the button below to verify your email address</p>

        <button
          onClick={handleVerify}
          disabled={isLoading || countdown > 0}
          className="btn btn-primary btn-lg mb-3"
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              {countdown > 0 ? `Processing (${countdown}s)` : 'Verifying...'}
            </>
          ) : (
            'Verify Email Now'
          )}
        </button>

        {countdown > 0 && (
          <div className="progress mt-3" style={{ height: '5px' }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              style={{ width: `${(3 - countdown) / 3 * 100}%` }}
            ></div>
          </div>
        )}

        <div>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-link mt-3"
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
