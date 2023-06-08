import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { useCookies } from 'react-cookie';

import Layout from '../layouts';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import NewPassword from '../pages/NewPassword';
import Archive from '../pages/Archive';
import Draft from '../pages/Draft';
import Profile from '../pages/Profile';
import Asset from '../pages/Asset';
import News from '../pages/News';
import Mitra from '../pages/Mitra';
import Wakaf from '../pages/Wakaf';
import Search from "../pages/Search";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const checkToken = cookie.token;
  
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Layout>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/new-password' element={<NewPassword/>}/>
            <Route path='/dashboard' element={checkToken ? <Dashboard/> : <Login/>}/>
            <Route path='/wakaf' element={checkToken ? <Wakaf/> : <Login/>}/>
            <Route path='/archive' element={checkToken ? <Archive/> : <Login/>}/>
            <Route path='/draft' element={checkToken ? <Draft/> : <Login/>}/>
            <Route path='/asset' element={checkToken ? <Asset/> : <Login/>}/>
            <Route path='/berita' element={checkToken ? <News/> : <Login/>}/>
            <Route path='/mitra' element={checkToken ? <Mitra/> : <Login/>}/>
            <Route path='/profile' element={checkToken ? <Profile/> : <Login/>}/>
            <Route path='/search/:query' element={checkToken ? <Search/> : <Login/>}/>
          </Routes>
        </Layout>
      </QueryParamProvider>
    </BrowserRouter>
  )
}

export default App
