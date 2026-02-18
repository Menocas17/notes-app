import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('token', token);

      navigate('/myNotes', { replace: true });
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return <p className='text-gray-500 animate-pulse'>Autenticando...</p>;
}
