import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { FloatingNotificationContainer } from './components/FloatingNotification';
import { Home } from './pages/Home';
import { DatingSwipe } from './pages/DatingSwipe';
import { MarriageSwipe } from './pages/MarriageSwipe';
import { Chat } from './pages/Chat';
import { Profile } from './pages/Profile';
import { Subscription } from './pages/Subscription';
import { MarriageRegistration } from './pages/MarriageRegistration';
import { SignIn } from './pages/SignIn';
import { Register } from './pages/Register';
import { BottomNavBar } from './components/BottomNavBar';
import { Provider } from 'react-redux';
import { store } from './store';
import { RequireAuth } from './components/RequireAuth.tsx';
import { UserProfile } from './pages/UserProfile';

const ProfileCompletion = lazy(() => import('./pages/ProfileCompletion'));
const CallPage = lazy(() => import('./pages/CallPage'));


import { useSelector } from 'react-redux';
import { RootState } from './store';

const AppLayout: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans">
      {isAuthenticated && <NavBar />}
      <main className="flex-grow flex flex-col pb-24 md:pb-0">
          <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading...</div>}>
              <Outlet />
          </Suspense>
      </main>
      {isAuthenticated && (
        <div className="hidden md:block">
          <Footer />
        </div>
      )}
      {isAuthenticated && <BottomNavBar />}
      <FloatingNotificationContainer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Provider store={store}>
          <HashRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="dating" element={<DatingSwipe />} />
                <Route path="marriage" element={<RequireAuth><MarriageSwipe /></RequireAuth>} />
                <Route path="chat" element={<RequireAuth><Chat /></RequireAuth>} />
                <Route path="chat/:otherUserId" element={<RequireAuth><Chat /></RequireAuth>} />
                <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
                <Route path="subscription" element={<Subscription />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="register" element={<Register />} />
                <Route path="marriage-registration" element={<MarriageRegistration />} />
                <Route path="user/:id" element={<RequireAuth><UserProfile /></RequireAuth>} />
                <Route path="profile-completion" element={<Suspense fallback={<div>Loading...</div>}><ProfileCompletion /></Suspense>} />
                <Route path="*" element={<Home />} />
              </Route>
              <Route path="/call/:userId" element={<Suspense fallback={<div>Loading...</div>}><CallPage /></Suspense>} />
            </Routes>
          </HashRouter>
        </Provider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;