import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar, Footer, Sidebar } from './components';
import { Users, Home } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import './App.css';

const App = () => {
  const { activeMenu } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(prevState => !prevState);
  };

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative bg-main-dark-bg">
          <div className={showSidebar ? "w-72 fixed sidebar bg-main-dark-bg text-white p-3" : "w-0 dark:bg-secondary-dark-bg"}>
            <Sidebar />
          </div>
          <div className={activeMenu ? 'bg-main-dark-bg min-h-screen md:ml-72 w-full' : 'bg-main-dark-bg w-full min-h-screen flex-2'}>
            {activeMenu && showNavbar && (
              <div className="fixed md:static bg-main-dark-bg navbar w-full text-white p-3 ">
                <Navbar toggleSidebar={toggleSidebar} />
              </div>
            )}
            <div>
              <Routes>
                <Route path="/" element={<Home setShowSidebar={setShowSidebar} setShowNavbar={setShowNavbar} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/users" element={isLoggedIn ? <Users toggleSidebar={toggleSidebar} /> : <Navigate to="/" replace />} />
                <Route path="/Logout" element={<Home setShowSidebar={setShowSidebar} setShowNavbar={setShowNavbar} />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
