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
import { BottomNavBar } from './components/BottomNavBar';

const ProfileCompletion = lazy(() => import('./pages/ProfileCompletion'));
const CallPage = lazy(() => import('./pages/CallPage'));


const AppLayout: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans">
    <NavBar />
    <main className="flex-grow flex flex-col pb-24 md:pb-0">
        <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading...</div>}>
            <Outlet />
        </Suspense>
    </main>
    <div className="hidden md:block">
      <Footer />
    </div>
    <BottomNavBar />
    <FloatingNotificationContainer />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="dating" element={<DatingSwipe />} />
              <Route path="marriage" element={<MarriageSwipe />} />
              <Route path="chat" element={<Chat />} />
              <Route path="profile" element={<Profile />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="marriage-registration" element={<MarriageRegistration />} />
              <Route path="profile-completion" element={<Suspense fallback={<div>Loading...</div>}><ProfileCompletion /></Suspense>} />
              <Route path="*" element={<Home />} />
            </Route>
            <Route path="/call/:userId" element={<Suspense fallback={<div>Loading...</div>}><CallPage /></Suspense>} />
          </Routes>
        </HashRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;