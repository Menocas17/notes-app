import GoogleLogin from './components/Login';
import AuthCallback from './pages/AuthCallBack';
import ProtectedRoute from './components/ProtectedRoutes';
import DashboarLayout from './components/DashboardLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MyNotes from './pages/MyNotesPage';
import EditNote from './pages/EditNotePage';
import ArchiveNotes from './pages/ArchivedNotesPage';
import CreateNote from './pages/CreateNotePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path='/' element={<GoogleLogin />} />
        <Route path='/auth/callback' element={<AuthCallback />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboarLayout />}>
            <Route path='/myNotes' element={<MyNotes />} />
            <Route path='/archivedNotes' element={<ArchiveNotes />} />
            <Route path='/createNote' element={<CreateNote />} />
            <Route path='/myNotes/:id' element={<EditNote />} />
          </Route>
        </Route>

        {/* Default Redirection */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
