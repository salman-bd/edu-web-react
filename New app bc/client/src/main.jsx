import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/Signup/Signup.jsx'
import Logout from './components/Logout/Logout.jsx';

import Registration from './components/Registration/Registration.jsx';
import RegistraitonForm from './components/Registration/RegistrationForm.jsx';

import AdmitCard from './components/AdmitCard/AdmitCard.jsx';
import DownloadAdmitCard from './components/AdmitCard/DownloadAdmitCard/DownloadAdmitCard.jsx';
import SearchAdmitCard from './components/AdmitCard/SearchAdmitCard.jsx';

import AdmitCardSearchResult from './components/AdmitCard/AdmitCardSerchResult.jsx';
import FindRegistration from './components/Registration/FindRegistration.jsx'

import Dashboard from './components/Dashboard/Dashboard.jsx'
import DashboardDetails from './components/Dashboard/DashboardDetails.jsx'
import DashboardChitrangkan from './components/Dashboard/DashboardChitrangkan.jsx'

import DashboardMedha from './components/Dashboard/DashboardMedha.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>} />
      <Route path='about' element={<About/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path='signup' element={<SignUp/>} />
      <Route path='login' element={<Login/>} />
      <Route path='logout' element={<Logout/>} />
      <Route path='registration' element={<Registration/>} />
      <Route path='registration-form' element={<RegistraitonForm/>} />
      <Route path='registration/registration-form' element={<RegistraitonForm/>} />

      
      <Route path='admitcard' element={<AdmitCard/>} />
      <Route path='download-admitcard' element={<DownloadAdmitCard/>} />
      <Route path='search-admitcard' element={<SearchAdmitCard/>} />
      <Route path='search-admitcard/admitcard-searchresult' element={<AdmitCardSearchResult/>} />
      <Route path='search-admitcard/admitcard-searchresult/download-admitcard' element={<DownloadAdmitCard/>} />
      
      <Route path='Find_You' element={<FindRegistration/>} />
      <Route path='Find_You/admitcard-searchresult' element={<AdmitCardSearchResult/>} />
      <Route path='Find_You/admitcard-searchresult/download-admitcard' element={<DownloadAdmitCard/>} />
      
      <Route path='dashboard' element={<Dashboard/>} />
      <Route path='dashboard-details' element={<DashboardDetails/>} />
      <Route path='dashboard-details/dashboard-chitrangkan' element={<DashboardChitrangkan/>} />

      <Route path='dashboard-details/dashboard-medha' element={<DashboardMedha/>} />
      
      

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
