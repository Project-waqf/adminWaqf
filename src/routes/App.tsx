import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import Layout from '../layouts';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import NewPassword from '../pages/NewPassword';
import Archive from '../pages/Archive';
import Draft from '../pages/Draft';

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Layout>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/new-password' element={<NewPassword/>}/>
            <Route path='/archive' element={<Archive/>}/>
            <Route path='/draft' element={<Draft/>}/>
          </Routes>
        </Layout>
      </QueryParamProvider>
    </BrowserRouter>
  )
}

export default App
