import { Navigate } from 'react-router-dom';

export default function GoogleLogin() {
  const backendUrl = `${import.meta.env.VITE_API_URL}/auth/google`;
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to='/myNotes' replace />;
  }

  return (
    <div className='max-w-[90%] lg:max-w-3/5 m-auto flex items-center  justify-center h-screen'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <img src='/notes.svg' alt='Notes Icon' width={100} />
          <h1 className='text-6xl font-bold'> Notes App</h1>
        </div>

        <p className='font-bold mt-6 text-center'>
          Login to start organizing your ideas and creating notes!
        </p>
        <a
          href={backendUrl}
          className='border border-gray-300 px-3 py-2 bg-[#F7F8FA] text-black font-bold rounded-3xl md:max-w-3/5 mt-6 flex gap-3'
        >
          <img src='/google.svg' alt='Notes Icon' width={20} />
          Continue with Google
        </a>
      </div>
    </div>
  );
}
