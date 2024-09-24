import React from 'react';
import ReactDOM from 'react-dom/client';
import UserData from './Extras/UserData';

const App = () => {
  return (
    <div className="app-container">
      <UserData />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
