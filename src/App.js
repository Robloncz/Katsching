import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Authenticator } from "@aws-amplify/ui-react";
import AppContent from './AppContent';

function App() {
  // Set dark mode as default theme when app loads
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <Router>
      <Authenticator.Provider>
        <AppContent />
      </Authenticator.Provider>
    </Router>
  );
}

export default App;
