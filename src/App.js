import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Authenticator } from "@aws-amplify/ui-react";
import AppContent from './AppContent';

function App() {
  return (
    <Router>
      <Authenticator.Provider>
        <AppContent />
      </Authenticator.Provider>
    </Router>
  );
}

export default App;
