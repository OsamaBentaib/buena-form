import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FullscreenForm from './Components/FullscreenForm/FullscreenForm';
import SubmittedData from './Components/SubmittedData/SubmittedData';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FullscreenForm />} />
        <Route path="/submitted" element={<SubmittedData />} />
      </Routes>
    </Router>
  );
};

export default App;

