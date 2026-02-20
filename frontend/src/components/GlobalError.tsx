import { useRouteError } from 'react-router-dom';

export default function GlobalError() {
  // useRouteError catches the exact error thrown in your app
  // (like the 'throw new Error' we added in the note service)
  const error = useRouteError() as Error;

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center'>
      <h1 className='text-4xl font-bold text-red-600 mb-4'>¡Oops!</h1>
      <p className='text-lg text-gray-700 mb-2'>Something went wrong.</p>
      {/* Optional: Render the specific error message for debugging */}
      <pre className='text-sm text-gray-500 bg-gray-200 p-2 rounded-md'>
        {error?.message || 'Unknown error occurred'}
      </pre>
      <button
        onClick={() => (window.location.href = '/')}
        className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
      >
        Go back to Home
      </button>
    </div>
  );
}
