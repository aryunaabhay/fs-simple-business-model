import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BusinessModelCreateForm from './app/business_model/BusinessModelCreateForm';
import BusinessModelList from './app/business_model/BusinessModelList';
import BusinessModelCreateFormWrapper from './app/business_model/BusinessModelCreateForm';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<BusinessModelList/>} />
        <Route path="/business_model/new" element={<BusinessModelCreateForm/>} />
        <Route path="/business_model/:id" element={<BusinessModelCreateFormWrapper/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
