import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // 1. Guardamos el token manualmente (sin usar Context)
      localStorage.setItem('token', token);

      // 2. Redirigimos INMEDIATAMENTE a la zona protegida
      // Aquí es donde el AuthProvider se despertará y validará el token
      navigate('/myNotes', { replace: true });
    } else {
      // Si no hay token, algo salió mal, volver al login
      navigate('/');
    }
  }, [searchParams, navigate]);

  // Puedes mostrar un texto simple o un spinner básico mientras redirige
  // No uses el componente LoadingSpinner si este depende de lógica compleja
  return <p className='text-gray-500 animate-pulse'>Autenticando...</p>;
}
