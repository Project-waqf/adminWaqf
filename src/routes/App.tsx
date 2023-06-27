import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { useCookies } from 'react-cookie';

import Layout from '../layouts';
import Loading from "../assets/svg/Loading";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const checkToken = cookie.token;
  
  const Login = lazy(()=> import('../pages/Login'))
  const ForgotPassword = lazy(()=> import('../pages/ForgotPassword'))
  const NewPassword = lazy(()=> import('../pages/NewPassword'))
  const Dashboard = lazy(()=> import('../pages/Dashboard'))
  const Archive = lazy(()=> import('../pages/Archive'))
  const Draft = lazy(()=> import('../pages/Draft'))
  const Profile = lazy(()=> import('../pages/Profile'))
  const Asset = lazy(()=> import('../pages/Asset'))
  const News = lazy(()=> import('../pages/News'))
  const Mitra = lazy(()=> import('../pages/Mitra'))
  const Wakaf = lazy(()=> import('../pages/Wakaf'))
  const Search = lazy(()=> import('../pages/Search'))
  
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Layout>
          <Suspense fallback={ <div className="ml-[50%] mt-[250px]"> <Loading/> </div> }>
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
          </Suspense>
        </Layout>
      </QueryParamProvider>
    </BrowserRouter>
  )
}

export default App
