import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminPortalPage from './pages/AdminPortalPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: 'Get a Free Solar Quote',
    subtitle: 'Share your details and monthly bill. Our engineers will prepare a customized zero-cost feasibility study and subsidy estimate.'
  });

  const openQuoteModal = (title, subtitle) => {
    setModalState({
      isOpen: true,
      title: title || 'Get a Free Solar Quote',
      subtitle: subtitle || 'Share your details and monthly bill. Our engineers will prepare a customized zero-cost feasibility study and subsidy estimate.'
    });
  };

  const closeQuoteModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const isAdminRoute = location.pathname.startsWith('/admprtl') || location.pathname.startsWith('/admin');

  return (
    <div className="app-root">
      <ScrollToTop />
      
      {!isAdminRoute && <Navbar onOpenQuoteModal={() => openQuoteModal()} />}

      <Routes>
        <Route path="/" element={<HomePage onOpenQuoteModal={() => openQuoteModal()} />} />
        <Route path="/home" element={<HomePage onOpenQuoteModal={() => openQuoteModal()} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage onOpenQuoteModal={() => openQuoteModal()} />} />
        <Route path="/about" element={<AboutPage onOpenQuoteModal={() => openQuoteModal()} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admprtl" element={<AdminPortalPage />} />
        <Route path="/admin" element={<Navigate to="/admprtl" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      {!isAdminRoute && <Footer />}

      <QuoteModal 
        isOpen={modalState.isOpen}
        onClose={closeQuoteModal}
        title={modalState.title}
        subtitle={modalState.subtitle}
      />
    </div>
  );
}
