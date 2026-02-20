import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import GlobalError from '../components/GlobalError';
import GoogleLogin from '../components/Login';
import AuthCallback from '../pages/AuthCallBack';
import ProtectedRoute from '../components/ProtectedRoutes';
import DashboarLayout from '../components/DashboardLayout';
import MyNotes from '../pages/MyNotesPage';
import EditNote from '../pages/EditNotePage';
import ArchiveNotes from '../pages/ArchivedNotesPage';
import CreateNote from '../pages/CreateNotePage';
import { AuthProvider } from '../context/AuthProvider.tsx';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import GridNoteSkeleton from '../components/NotesGridSkeleton.tsx';
import NoteSkeleton from '../components/NoteSkeleton.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GoogleLogin />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },

  //Protected routes
  {
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <AuthProvider>
          <ProtectedRoute />
        </AuthProvider>
      </Suspense>
    ),
    errorElement: <GlobalError />,
    children: [
      {
        element: <DashboarLayout />,
        children: [
          {
            path: '/myNotes',
            element: (
              <Suspense fallback={<GridNoteSkeleton />}>
                <MyNotes />
              </Suspense>
            ),
          },
          {
            path: '/archivedNotes',
            element: (
              <Suspense fallback={<GridNoteSkeleton />}>
                <ArchiveNotes />
              </Suspense>
            ),
          },
          {
            path: '/createNote',
            element: <CreateNote />,
          },
          {
            path: '/myNotes/:id',
            element: (
              <Suspense fallback={<NoteSkeleton edit={true} />}>
                <EditNote />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/*',
    element: <Navigate to='/' replace />,
  },
]);
