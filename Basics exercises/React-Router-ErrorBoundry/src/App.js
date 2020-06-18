import React from 'react';
import './App.css';
import Menu from './components/menu';
import ErrorBoundry from './components/errorBoundry';

function App() {
  return (
    <ErrorBoundry>
    <Menu />
    </ErrorBoundry>
  );
}

export default App;
